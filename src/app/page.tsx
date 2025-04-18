'use client';

import { useState } from 'react';
import { fetchUserBar, loadBottleDataset, UserBar } from '@/lib/api';
import { generateRecommendations, RecommendationResponse } from '@/lib/recommendation-engine';
import { UserSearch } from '@/components/user-search';
import { ProfileSummary } from '@/components/profile-summary';
import { RecommendationsSection } from '@/components/recommendations-section';
import { toast } from 'sonner';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [userBar, setUserBar] = useState<UserBar | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setUserBar(null);
    setRecommendations(null);
    
    try {
      // Fetch user bar data
      const userData = await fetchUserBar(username);
      
      // Validate user data
      if (!userData || !userData.bottles || !Array.isArray(userData.bottles) || userData.bottles.length === 0) {
        toast.error('No Bottles Found', {
          description: 'This user has no bottles in their collection.',
          duration: 5000,
        });
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
      console.error('Error:', err);
      
      // Show toast notification for the error
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to connect to BAXUS API. Please try again later.';
      
      toast.error('Connection Error', {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-8 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <div className="w-full">
          <h1 className="mb-4 text-4xl font-bold">
            Meet Bob: Your Whisky Recommendation Expert
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Bob analyzes your BAXUS bar to provide personalized whisky recommendations based on your collection, 
            preferences, and taste profile.
          </p>
          
          <div className="mb-8">
            <UserSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
          
          {userBar && recommendations && (
            <div className="space-y-8">
              <ProfileSummary userBar={userBar} analysis={recommendations.analysis} />
              <RecommendationsSection recommendations={recommendations.recommendations} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
