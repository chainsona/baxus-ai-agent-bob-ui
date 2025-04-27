import { Recommendation } from '@/lib/recommendation-engine';
import { Award } from 'lucide-react';
import { FeaturedRecommendation } from './recommendation/featured-recommendation';
import { BottleRecommendations } from './recommendation/bottle-recommendations';
import {
  EmptyRecommendations,
  InvalidRecommendations,
} from './recommendation/empty-recommendations';

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
  similarRecommendations?: Recommendation[];
  diverseRecommendations?: Recommendation[];
}

export function RecommendationsSection({
  similarRecommendations,
  diverseRecommendations,
}: RecommendationsSectionProps) {
  // Enhanced debugging to help identify what data we're receiving
  console.log('RecommendationsSection props:', {
    similarRecommendations: similarRecommendations?.length || 0,
    diverseRecommendations: diverseRecommendations?.length || 0,
  });

  // For backward compatibility, if we don't have the new format, use the old format
  const similar = similarRecommendations || [];
  const diverse = diverseRecommendations || [];

  // Check if we have any recommendations in any format
  if (!similar.length && !diverse.length) {
    console.log('No recommendations available');
    return <EmptyRecommendations />;
  }

  // Check for valid recommendation data format and log detailed info
  console.log('Using new format with similar/diverse arrays');
  console.log('Similar recommendations check:', {
    length: similar.length,
    first:
      similar.length > 0
        ? {
            hasBottle: !!similar[0]?.bottle,
            bottleDetails: similar[0]?.bottle
              ? {
                  id: similar[0].bottle.id,
                  name: similar[0].bottle.name,
                  hasImageUrl: !!similar[0].bottle.image_url,
                  hasType: !!similar[0].bottle.spirit_type,
                }
              : 'No bottle',
          }
        : 'Empty',
  });

  // Display the first recommendation in a featured layout
  // In new format, prioritize similar recommendations for the featured spot
  const featuredRecommendation = similar.length > 0 ? similar[0] : diverse[0];

  // Ensure bottle exists before accessing its properties
  if (!featuredRecommendation || !featuredRecommendation.bottle) {
    console.log(
      'No featured recommendation with valid bottle object:',
      featuredRecommendation
        ? 'Has recommendation but no bottle'
        : 'No recommendation'
    );

    // Show a fallback UI instead of returning null
    return <InvalidRecommendations />;
  }

  // For new format, get the other similar and diverse recommendations
  const otherSimilar = similar.length > 1 ? similar.slice(1) : [];
  const otherDiverse = diverse;

  // Do a final validation to ensure the bottle objects actually exist
  if (!featuredRecommendation || typeof featuredRecommendation !== 'object') {
    console.error(
      'Invalid bottle structure in featured recommendation:',
      featuredRecommendation
    );

    // Show a fallback UI instead of returning null
    return <InvalidRecommendations />;
  }

  return (
    <section className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-[#222222] flex items-center gap-2">
          <Award className="h-6 w-6 text-[#1D6D72]" />
          BOB&apos;s Top Recommendations
        </h2>
      </div>

      {/* Featured Recommendation */}
      <FeaturedRecommendation recommendation={featuredRecommendation} />

      {/* Similar recommendations section */}
      {otherSimilar.length > 0 && (
        <BottleRecommendations recommendations={otherSimilar} type="similar" />
      )}

      {/* Diverse recommendations section */}
      {otherDiverse.length > 0 && (
        <BottleRecommendations recommendations={otherDiverse} type="diverse" />
      )}
    </section>
  );
}
