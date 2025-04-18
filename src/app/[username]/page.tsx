"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchUserBar, loadBottleDataset, UserBar } from "@/lib/api";
import {
  generateRecommendations,
  RecommendationResponse,
} from "@/lib/recommendation-engine";
import { ProfileSummary } from "@/components/profile-summary";
import { RecommendationsSection } from "@/components/recommendations-section";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function UserPage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;

  const [isLoading, setIsLoading] = useState(true);
  const [userBar, setUserBar] = useState<UserBar | null>(null);
  const [recommendations, setRecommendations] =
    useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserData() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch user bar data
        const userData = await fetchUserBar(username);

        // Validate user data
        if (
          !userData ||
          !userData.bottles ||
          !Array.isArray(userData.bottles) ||
          userData.bottles.length === 0
        ) {
          setError("This user has no bottles in their collection.");
          setIsLoading(false);
          return;
        }

        setUserBar(userData);

        // Load bottle dataset
        const bottles = await loadBottleDataset();

        // Generate recommendations
        const result = await generateRecommendations(userData, bottles);
        setRecommendations(result);
      } catch (err) {
        console.error("Error:", err);

        // Set error message
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to connect to BAXUS API. Please try again later.";

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserData();
  }, [username]);

  return (
    <section className="py-8 md:py-12 bg-[#F8F6F1]">
      <div className="container px-4 sm:px-6">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6 -ml-2 text-sm flex items-center text-[#1D6D72] hover:bg-[#1D6D72]/10"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Search
        </Button>

        <div className="flex items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#222222]">{username}</h1>
          <Badge className="ml-2 sm:ml-3 border-[#1D6D72]/30 text-[#1D6D72]" variant="outline">
            {userBar?.bottles?.length || 0} Bottles
          </Badge>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse text-center">
              <div className="h-8 w-48 bg-[#1D6D72]/10 rounded-md mx-auto mb-4"></div>
              <div className="h-6 w-64 bg-[#1D6D72]/10 rounded-md mx-auto"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-center">
            <h3 className="text-lg font-medium text-red-700 mb-2">
              Error Loading Data
            </h3>
            <p className="text-sm text-neutral-700">{error}</p>
            <Button
              variant="outline"
              className="mt-4 border-[#1D6D72]/30 text-[#1D6D72] hover:bg-[#1D6D72]/10"
              onClick={() => router.push("/")}
            >
              Try Another User
            </Button>
          </div>
        )}

        {userBar && recommendations && (
          <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-12">
            <div className="w-full lg:col-span-4">
              <ProfileSummary
                userBar={userBar}
                analysis={recommendations.analysis}
              />
            </div>
            <div className="w-full lg:col-span-8">
              <RecommendationsSection
                recommendations={recommendations.recommendations}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
