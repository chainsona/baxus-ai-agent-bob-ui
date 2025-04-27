'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  fetchUserProfile,
  UserProfile,
  fetchRecommendations,
  enhanceRecommendations,
  BottleData,
  Bottle,
} from '@/lib/api';
import { Recommendation } from '@/lib/recommendation-engine';
import { ProfileSummary } from '@/components/profile-summary';
import { RecommendationsSection } from '@/components/recommendations-section';
import { CollectionWithStats } from '@/components/collection-with-stats';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Share } from 'lucide-react';
import { LoadingWhisky } from '@/components/loading-whisky';

interface UserPageClientProps {
  username: string;
}

// Define the enhanced recommendations structure that our API actually returns
interface EnhancedRecommendations {
  similar: Recommendation[];
  diverse: Recommendation[];
  analysis?: {
    similar: {
      bottle: Bottle;
      score: number;
      reason: string;
    }[];
  };
}

// Define the recommendation item type for type safety
interface RecommendationItem {
  id: number;
  name: string;
  description: string | null;
  type: string;
  image_url: string;
  producer: string;
  region: string;
  country: string;
  spirit_type: string;
  nft_address: string;
  similarity?: number;
  reason: string;
  flavor_profile: Record<string, number>;
  [key: string]: unknown;
}

/**
 * Share content to X (Twitter)
 */
function shareToX(username: string, bottleCount: number, pathname: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000');

  const text = `Check out my whisky collection with personalized recommendations by @BAXUSco BOB, whisky expert.\n\nPowered by @TheMaikers AI Plaform ${baseUrl}${pathname}`;
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function UserPageClient({ username }: UserPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] =
    useState<EnhancedRecommendations | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserData() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch user profile data
        const profileData = await fetchUserProfile(username);

        // Validate user data
        if (
          !profileData ||
          !profileData.collection ||
          !profileData.collection.stats ||
          profileData.collection.stats.bottle_count === 0
        ) {
          setError('This user has no bottles in their collection.');
          setIsLoading(false);
          return;
        }

        // Set user profile data immediately so we can show it
        setUserProfile(profileData);
        setIsLoading(false);

        // Now start loading recommendation data in the background
        setIsLoadingAssets(true);

        // Fetch recommendations with enhancement enabled
        const recommendationsData = await fetchRecommendations(
          username,
          3, // similarCount
          3, // diverseCount
          0.5, // diversityRatio
          false // useFallback - set to false to fetch actual data
        );

        console.log('Raw recommendations fetched:', recommendationsData);

        // Check if we have the expected data structure from the API
        if (!recommendationsData.similar || !recommendationsData.diverse) {
          console.error('Unexpected API response format:', recommendationsData);
          setError('Recommendation data format is invalid');
          setIsLoadingAssets(false);
          return;
        }

        // Enhance the recommendations data with Baxus asset information
        console.log('Enhancing recommendations with Baxus asset data...');
        const enhancedData = await enhanceRecommendations(recommendationsData);

        // Format recommendations for compatibility with our component
        const formattedData: EnhancedRecommendations = {
          similar: enhancedData.similar.map((item: RecommendationItem) => ({
            bottle: item as unknown as Bottle, // Type assertion here for compatibility
            score: item.similarity || 0,
            reason: item.reason || 'Similar to bottles in your collection',
          })),
          diverse: enhancedData.diverse.map((item: RecommendationItem) => ({
            bottle: item as unknown as Bottle, // Type assertion here for compatibility
            score: 0, // Diverse items may not have a similarity score
            reason: item.reason || 'To diversify your collection',
          })),
          analysis: enhancedData.analysis,
        };

        // Add detailed debug logging to inspect the enhanced data
        console.log(
          'Formatted recommendations data:',
          JSON.stringify(
            {
              similar: formattedData.similar.length,
              diverse: formattedData.diverse.length,
              firstSimilar: formattedData.similar[0]
                ? {
                    name: formattedData.similar[0].bottle.name,
                    reason: formattedData.similar[0].reason,
                  }
                : null,
              firstDiverse: formattedData.diverse[0]
                ? {
                    name: formattedData.diverse[0].bottle.name,
                    reason: formattedData.diverse[0].reason,
                  }
                : null,
            },
            null,
            2
          )
        );

        setRecommendations(formattedData);
      } catch (err) {
        console.error('Error:', err);

        // Set error message
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to connect to profile API. Please try again later.';

        setError(errorMessage);
      } finally {
        setIsLoading(false);
        setIsLoadingAssets(false);
      }
    }

    loadUserData();
  }, [username]);

  // Extract the recommendations directly from the enhanced data
  const similarRecommendations = recommendations?.similar || [];
  const diverseRecommendations = recommendations?.diverse || [];

  // Add a useEffect for debugging recommendations data
  useEffect(() => {
    if (recommendations) {
      console.log(
        'Recommendations data structure:',
        Object.keys(recommendations)
      );
      console.log('Similar recommendations:', similarRecommendations);
      console.log('Diverse recommendations:', diverseRecommendations);
      console.log(
        'Recommendation format check - similar has bottles:',
        similarRecommendations?.length > 0
          ? Boolean(similarRecommendations[0]?.bottle)
          : 'No similar recommendations'
      );
      console.log(
        'Recommendation format check - diverse has bottles:',
        diverseRecommendations?.length > 0
          ? Boolean(diverseRecommendations[0]?.bottle)
          : 'No diverse recommendations'
      );
    }
  }, [recommendations, similarRecommendations, diverseRecommendations]);

  return (
    <section className="py-8 md:py-12 bg-[#F8F6F1]">
      <div className="container px-4 sm:px-6">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6 -ml-2 text-sm flex items-center text-[#1D6D72] hover:bg-[#1D6D72]/10"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Search
        </Button>

        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#222222]">
              {username}
            </h1>
            <Badge
              className="ml-2 sm:ml-3 border-[#1D6D72]/30 text-[#1D6D72]"
              variant="outline"
            >
              {userProfile?.collection.stats.bottle_count || 0} Bottles
            </Badge>
          </div>

          {userProfile && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-[#1D6D72]/20 text-[#1D6D72] hover:bg-[#1D6D72]/5"
              onClick={() =>
                shareToX(
                  username,
                  userProfile.collection.stats.bottle_count,
                  pathname
                )
              }
            >
              <Share className="h-4 w-4" />
              <span className="hidden sm:inline">Share Profile</span>
            </Button>
          )}
        </div>

        {isLoading && <LoadingWhisky message="Fetching whisky collection..." />}

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-center">
            <h3 className="text-lg font-medium text-red-700 mb-2">
              Error Loading Data
            </h3>
            <p className="text-sm text-neutral-700">{error}</p>
            <Button
              variant="outline"
              className="mt-4 border-[#1D6D72]/30 text-[#1D6D72] hover:bg-[#1D6D72]/10"
              onClick={() => router.push('/')}
            >
              Try Another User
            </Button>
          </div>
        )}

        {userProfile && (
          <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-12">
            <div className="w-full lg:col-span-4">
              <div className="space-y-6">
                <ProfileSummary
                  userProfile={userProfile}
                  similarRecommendations={similarRecommendations}
                />
                {userProfile.collection?.bottles && (
                  <CollectionWithStats
                    bottles={userProfile.collection.bottles as BottleData[]}
                    bottleCount={userProfile.collection.stats.bottle_count}
                    diversityScore={
                      userProfile.collection.stats.diversity_score
                    }
                  />
                )}
              </div>
            </div>
            <div className="w-full lg:col-span-8">
              {isLoadingAssets ? (
                <div className="rounded-lg border border-[#1D6D72]/10 bg-white p-6">
                  <LoadingWhisky
                    message="Curating your perfect recommendations..."
                    className="py-6"
                  />
                </div>
              ) : recommendations ? (
                <RecommendationsSection
                  recommendations={[]}
                  similarRecommendations={similarRecommendations}
                  diverseRecommendations={diverseRecommendations}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
