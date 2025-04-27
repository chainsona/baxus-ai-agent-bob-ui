'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Recommendation } from '@/lib/recommendation-engine';

// Define the standardized flavor set for consistent display
const STANDARD_FLAVORS = [
  'sweet',
  'woody',
  'spicy',
  'smoky',
  'fruity',
  'smooth',
  'floral',
];

interface TasteProfileChartProps {
  flavorProfiles: Record<string, number>;
  similarRecommendations?: Recommendation[];
  className?: string;
}

export function TasteProfileChart({
  flavorProfiles,
  similarRecommendations = [],
  className,
}: TasteProfileChartProps) {
  // Helper function to normalize values to a 0-1 range
  const normalizeValues = (
    values: Record<string, number>
  ): Record<string, number> => {
    // Find the maximum value to use for normalization
    const maxValue = Math.max(...Object.values(values), 1); // Use at least 1 to avoid division by zero

    // Create normalized copy
    const normalized: Record<string, number> = {};

    // Normalize each value by dividing by the max (ensures 0-1 range)
    Object.entries(values).forEach(([key, value]) => {
      normalized[key] = value / maxValue;
    });

    return normalized;
  };

  // Helper function to extract flavor profiles from recommendations
  const extractRecommendationFlavors = () => {
    // If no recommendations, return empty object
    if (!similarRecommendations || similarRecommendations.length === 0) {
      console.log('No similar recommendations available for flavor profile');
      return {};
    }

    // Aggregate flavor profiles from recommendations
    const recommendedBottles = similarRecommendations.slice(0, 3);
    const flavorCounts: Record<string, number> = {};
    let totalBottles = 0;

    // For each bottle in recommendations, use their flavor profiles
    // (which should now be populated during the API fetch)
    recommendedBottles.forEach((recommendation) => {
      const bottle = recommendation.bottle;
      if (!bottle || !bottle.flavor_profiles) return;

      totalBottles++;
      // Add each flavor value to our aggregation
      Object.entries(bottle.flavor_profiles).forEach(([flavor, value]) => {
        flavorCounts[flavor] = (flavorCounts[flavor] || 0) + (value as number);
      });
    });

    console.log(
      `Extracted recommendation flavors. Total bottles: ${totalBottles}`
    );

    // Normalize by dividing by number of bottles
    if (totalBottles > 0) {
      Object.keys(flavorCounts).forEach((flavor) => {
        flavorCounts[flavor] = flavorCounts[flavor] / totalBottles;
      });
      return flavorCounts;
    }

    return {};
  };

  // Get and normalize flavor profiles
  const userFlavorProfiles = normalizeValues(flavorProfiles);
  const recommendationFlavors = normalizeValues(extractRecommendationFlavors());
  const hasRecommendationData = Object.keys(recommendationFlavors).length > 0;

  // Log what we're working with for debugging
  console.log('Original user flavor profiles:', flavorProfiles);
  console.log('Normalized user flavor profiles:', userFlavorProfiles);
  console.log(
    'Normalized recommendation flavor profiles:',
    recommendationFlavors
  );

  // Transform data into format for Recharts, using our standard flavor set for consistency
  const data = STANDARD_FLAVORS.map((flavor) => {
    // Scale to percentage (0-100) for display
    const userValue = (userFlavorProfiles[flavor] || 0) * 100;
    const recommendationValue = (recommendationFlavors[flavor] || 0) * 100;

    return {
      flavor,
      'Your Profile': userValue,
      Recommendations: recommendationValue,
    };
  });

  // Helper function to capitalize first letter for display
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={`w-full h-72 ${className || ''}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid strokeOpacity={0.5} />
          <PolarAngleAxis
            dataKey="flavor"
            tick={{ fontSize: 10, fill: '#555', fontWeight: 500 }}
            tickFormatter={capitalizeFirstLetter}
          />

          {/* User's actual flavor profile */}
          <Radar
            name="Your Profile"
            dataKey="Your Profile"
            stroke="#1D6D72"
            fill="#1D6D72"
            fillOpacity={0.3}
          />

          {/* Recommendation flavor profile - only show if data exists */}
          {hasRecommendationData && (
            <Radar
              name="Recommendations"
              dataKey="Recommendations"
              stroke="#D97706"
              fill="#D97706"
              fillOpacity={0.3}
            />
          )}

          <Tooltip
            formatter={(value: number) => [`${Math.round(value)}%`, '']}
            labelFormatter={(label: string) => capitalizeFirstLetter(label)}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
