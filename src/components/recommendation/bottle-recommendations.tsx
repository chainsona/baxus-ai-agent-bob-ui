import { Recommendation } from '@/lib/recommendation-engine';
import { Shuffle, Crosshair } from 'lucide-react';
import { RecommendationCard } from './recommendation-card';

interface BottleRecommendationsProps {
  recommendations: Recommendation[];
  type: 'diverse' | 'similar';
  title?: string;
}

export function BottleRecommendations({
  recommendations,
  type,
  title,
}: BottleRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  // Configuration based on recommendation type
  const config = {
    similar: {
      icon: Crosshair,
      color: 'text-[#1D6D72]',
      title: 'Similar Recommendations',
    },
    diverse: {
      icon: Shuffle,
      color: 'text-[#7E3192]',
      title: 'Diverse Recommendations',
    },
  }[type];

  const Icon = config.icon;
  const displayTitle = title || config.title;

  return (
    <div className="pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#222222] flex items-center gap-2">
          <Icon className={`h-5 w-5 ${config.color}`} />
          {displayTitle}
        </h3>
      </div>

      {/* Vertical stack of recommendation cards */}
      <div className="flex flex-col space-y-4">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.bottle?.id || Math.random().toString()}
            recommendation={recommendation}
            type={type}
          />
        ))}
      </div>
    </div>
  );
}
