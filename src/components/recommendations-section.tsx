import { Recommendation } from '@/lib/recommendation-engine';
import { Card } from '@/components/ui/card';
import {
  Award,
  ChevronRight,
  Share,
  Percent,
  DollarSign,
  ArrowRight,
  Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

/**
 * Share content to X (Twitter)
 */
function shareToX(bottleName: string, bottleType: string, pathname: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';

  const text = `Check out my top spirits recommendations by @BAXUSco Bob, whisky AI expert. Powered by @TheMaikers ${baseUrl}${pathname}`;
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  const pathname = usePathname();

  if (!recommendations.length) {
    return null;
  }

  // Display the first recommendation in a featured layout, similar to the Glenmorangie Astar screenshot
  const featuredRecommendation = recommendations[0];
  const bottle = featuredRecommendation.bottle;

  // Other recommendations to show in a grid below
  const otherRecommendations = recommendations.slice(1);

  return (
    <section className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-[#222222] flex items-center gap-2">
          <Award className="h-6 w-6 text-[#1D6D72]" />
          Bob&apos;s Top Recommendations
        </h2>
      </div>

      {/* Featured Recommendation - Similar to Glenmorangie Astar layout */}
      <Card className="overflow-hidden bg-white border-[#1D6D72]/10 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Bottle image */}
          <div className="relative p-6 flex items-center justify-center bg-white">
            <div className="absolute top-2 right-2 z-10">
              <Badge className="bg-gradient-to-r from-[#1D6D72]/90 via-[#1D6D72] to-[#1D6D72]/90 text-white shadow-sm text-xs px-3 py-1 border border-[#1D6D72]/20 font-medium">
                <span className="relative z-10 mix-blend-overlay mr-1">✦</span>
                Top Pick
              </Badge>
            </div>
            {bottle.image_url ? (
              <img
                src={bottle.image_url}
                alt={bottle.name}
                className="max-h-[400px] object-contain transition-all duration-300 hover:scale-105"
              />
            ) : (
              <div className="h-[400px] w-full flex flex-col items-center justify-center bg-[#F8F6F1]/30 p-4 text-center">
                <div className="text-6xl font-bold text-[#1D6D72]">
                  {bottle.name.substring(0, 2)}
                </div>
                <p className="mt-4 text-base text-neutral-600">
                  No image available
                </p>
              </div>
            )}
            <div className="absolute bottom-4 left-4">
              <div className="flex flex-col">
                <span className="text-sm text-neutral-600">Listed Price</span>
                <span className="text-3xl font-bold text-[#222222]">
                  ${bottle.avg_msrp?.toFixed(0) || '--'}
                </span>
              </div>
            </div>
          </div>

          {/* Right column - Bottle details */}
          <div className="p-6 flex flex-col bg-[#F8F6F1]">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#222222] mb-2">
                {bottle.name}
              </h1>
              <div className="flex space-x-4 mb-4">
                <Badge
                  variant="outline"
                  className="text-neutral-600 bg-white hover:bg-white/90 border-[#1D6D72]/10"
                >
                  {bottle.spirit_type}
                </Badge>
                {bottle.abv && (
                  <Badge
                    variant="outline"
                    className="text-neutral-600 bg-white hover:bg-white/90 border-[#1D6D72]/10"
                  >
                    {bottle.abv}% Alc/Vol
                  </Badge>
                )}
              </div>

              <div className="mb-6">
                <p className="text-[#222222] line-clamp-4">
                  {featuredRecommendation.reason ||
                    `${
                      bottle.name
                    } is a premium ${bottle.spirit_type.toLowerCase()} recommendation from Bob. This selection complements your collection and matches your taste preferences.`}
                </p>
              </div>
            </div>

            {/* Details grid similar to the Glenmorangie display */}
            <div className="mt-auto border-t border-[#1D6D72]/10 pt-4">
              <dl className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">Producer</dt>
                  <dd className="text-[#222222] font-medium">
                    {bottle.brand_id ? `Brand #${bottle.brand_id}` : 'Unknown'}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">Type</dt>
                  <dd className="text-[#222222] font-medium">
                    {bottle.spirit_type}
                  </dd>
                </div>

                {bottle.abv && (
                  <div className="space-y-1">
                    <dt className="text-sm text-neutral-600">ABV</dt>
                    <dd className="text-[#222222] font-medium">
                      {bottle.abv}%
                    </dd>
                  </div>
                )}

                {bottle.avg_msrp && (
                  <div className="space-y-1">
                    <dt className="text-sm text-neutral-600">MSRP</dt>
                    <dd className="text-[#222222] font-medium">
                      ${bottle.avg_msrp.toFixed(0)}
                    </dd>
                  </div>
                )}

                {bottle.ranking && (
                  <div className="space-y-1">
                    <dt className="text-sm text-neutral-600">Rank</dt>
                    <dd className="text-[#222222] font-medium">
                      #{bottle.ranking}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-[#1D6D72]/20 text-[#1D6D72] hover:bg-[#1D6D72]/5"
                  onClick={() =>
                    shareToX(bottle.name, bottle.spirit_type, pathname)
                  }
                >
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Additional recommendations */}
      {otherRecommendations.length > 0 && (
        <div className="pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#222222]">
              More Recommendations
            </h3>
            <Button
              variant="link"
              className="flex items-center gap-1 text-[#1D6D72] font-medium p-0"
            >
              <span>View all</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Vertical stack of recommendation cards - one per row */}
          <div className="flex flex-col space-y-4">
            {otherRecommendations.map((recommendation) => {
              const bottle = recommendation.bottle;
              const reasonPoints = recommendation.reason
                ? parseReasonIntoPoints(recommendation.reason)
                : [];

              return (
                <Card
                  key={bottle.id}
                  className="overflow-hidden bg-white border-[#1D6D72]/10 rounded-lg shadow-sm hover:shadow"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Left side - Bottle image */}
                    <div className="relative sm:w-1/5 overflow-hidden bg-white">
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className="bg-[#1D6D72] text-white text-xs px-2 py-0.5">
                          Recommended
                        </Badge>
                      </div>
                      {bottle.image_url ? (
                        <img
                          src={bottle.image_url}
                          alt={bottle.name}
                          className="h-64 sm:h-48 w-full object-contain p-2"
                        />
                      ) : (
                        <div className="flex h-64 sm:h-48 w-full flex-col items-center justify-center bg-[#F8F6F1]/30 p-4 text-center">
                          <div className="text-2xl font-bold text-[#1D6D72]">
                            {bottle.name.substring(0, 2)}
                          </div>
                        </div>
                      )}
                      {/* Bottle name overlay - only visible on mobile */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:hidden">
                        <h4 className="text-sm font-medium text-white">
                          {bottle.name}
                        </h4>
                        <p className="text-xs text-white/80">
                          {bottle.spirit_type}
                        </p>
                      </div>
                    </div>

                    {/* Middle section - Bottle details */}
                    <div className="sm:w-1/2 p-4 flex flex-col bg-[#F8F6F1]">
                      {/* Bottle name - only visible on desktop */}
                      <div className="hidden sm:block mb-2">
                        <h4 className="text-base font-medium text-[#222222]">
                          {bottle.name}
                        </h4>
                        <p className="text-sm text-neutral-600">
                          {bottle.spirit_type}
                        </p>
                      </div>

                      {reasonPoints.length > 0 && (
                        <div className="border border-[#1D6D72]/20 rounded bg-white p-3 mt-2">
                          <h5 className="text-sm font-medium text-[#1D6D72] mb-2">
                            Why Bob Recommends This
                          </h5>
                          <ul className="space-y-1.5">
                            {reasonPoints.slice(0, 3).map((point, index) => (
                              <li
                                key={index}
                                className="flex items-start text-xs text-[#222222]"
                              >
                                <ArrowRight className="h-3 w-3 text-[#1D6D72] mr-1 mt-0.5 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right side - Metrics */}
                    <div className="sm:w-3/10 p-4 grid grid-cols-3 sm:grid-cols-1 gap-2 bg-[#F8F6F1]">
                      {bottle.abv && (
                        <div className="flex items-center bg-white p-2 rounded-md border border-[#1D6D72]/10 hover:border-[#1D6D72]/30 transition-colors group">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1D6D72]/10 mr-2 group-hover:bg-[#1D6D72]/20 transition-colors">
                            <Percent className="h-4 w-4 text-[#1D6D72]" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-[#1D6D72]">
                              ABV
                            </span>
                            <span className="text-sm font-bold text-[#222222]">
                              {bottle.abv}%
                            </span>
                          </div>
                        </div>
                      )}

                      {bottle.avg_msrp && (
                        <div className="flex items-center bg-white p-2 rounded-md border border-[#1D6D72]/10 hover:border-[#1D6D72]/30 transition-colors group">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1D6D72]/10 mr-2 group-hover:bg-[#1D6D72]/20 transition-colors">
                            <DollarSign className="h-4 w-4 text-[#1D6D72]" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-[#1D6D72]">
                              MSRP
                            </span>
                            <span className="text-sm font-bold text-[#222222]">
                              ${bottle.avg_msrp.toFixed(0)}
                            </span>
                          </div>
                        </div>
                      )}

                      {bottle.ranking && (
                        <div className="flex items-center bg-white p-2 rounded-md border border-[#1D6D72]/10 hover:border-[#1D6D72]/30 transition-colors group">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1D6D72]/10 mr-2 group-hover:bg-[#1D6D72]/20 transition-colors">
                            <Trophy className="h-4 w-4 text-[#1D6D72]" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-[#1D6D72]">
                              Rank
                            </span>
                            <span className="text-sm font-bold text-[#222222]">
                              #{bottle.ranking}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Parse a recommendation reason string into separate points
 */
function parseReasonIntoPoints(reason: string): string[] {
  // Split complex reason sentences into separate points
  const points: string[] = [];

  // Check for typical phrases in the recommendation text
  if (reason.includes('matches your preference')) {
    points.push('Matches your taste preferences');
  }

  if (reason.includes('would add variety')) {
    points.push('Adds variety to your collection');
  }

  if (reason.includes('good value')) {
    points.push('Offers excellent value for money');
  }

  if (reason.includes('premium selection')) {
    points.push('Premium selection worth the investment');
  }

  if (reason.includes('typical price range')) {
    points.push('Within your typical price range');
  }

  if (reason.includes('highly rated') || reason.includes('ranked #')) {
    points.push('Highly rated among whisky enthusiasts');
  }

  if (reason.includes('popular among')) {
    points.push('Popular among BAXUS users');
  }

  // If we couldn't extract specific points, use the whole reason as one point
  if (points.length === 0) {
    return [reason];
  }

  return points;
}
