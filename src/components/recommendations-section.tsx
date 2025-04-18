import { Recommendation } from '@/lib/recommendation-engine';
import { BottleCard } from '@/components/bottle-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  if (!recommendations.length) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <span className="text-xl">Bob's Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((recommendation) => (
            <BottleCard
              key={recommendation.bottle.id}
              bottle={recommendation.bottle}
              reason={recommendation.reason}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 