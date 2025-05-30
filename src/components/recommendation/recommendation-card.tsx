import { Recommendation } from '@/lib/recommendation-engine';
import { Card } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import Link from 'next/link';
import { RecommendationBadge } from './badge';
import { SpiritTypeBadge } from './spirit-type-badge';
import { MetricBadge } from './metric-badge';
import { ActionButton } from './action-button';
import { ReasonPoints } from './reason-points';
import { parseReasonIntoPoints } from '@/lib/recommendation-utils';

interface RecommendationCardProps {
  recommendation: Recommendation;
  type: 'similar' | 'diverse';
  badge?: string;
}

export function RecommendationCard({
  recommendation,
  type = 'similar',
  badge,
}: RecommendationCardProps) {
  if (!recommendation || !recommendation.bottle) {
    return null;
  }

  const bottle = recommendation.bottle;
  const reasonPoints = recommendation.reason
    ? parseReasonIntoPoints(recommendation.reason)
    : [];

  const variant = type === 'diverse' ? 'diverse' : 'default';

  // Add UTM parameters to external links
  const getUrlWithUtm = (url: string) => {
    if (!url) return url;
    const utmParams =
      '?utm_source=baxus-bob.maikers.com&utm_medium=recommendation&utm_campaign=superteam-earn-chainsona';
    return url.includes('?')
      ? `${url}&${utmParams.substring(1)}`
      : `${url}${utmParams}`;
  };

  const listingUrlWithUtm = bottle.listing_url
    ? getUrlWithUtm(bottle.listing_url)
    : '';

  return (
    <Card className="overflow-hidden bg-white border-[#1D6D72]/10 rounded-lg shadow-sm hover:shadow">
      <div className="flex flex-col sm:flex-row h-full">
        {/* Left side - Bottle image */}
        <div className="relative sm:w-1/5 overflow-hidden bg-white">
          <div className="absolute top-2 left-2 z-10">
            <RecommendationBadge type={type}>
              {badge || (type === 'diverse' ? 'Discover' : 'Similar')}
            </RecommendationBadge>
          </div>
          {bottle.listing_url ? (
            <Link
              href={listingUrlWithUtm}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative h-64 sm:h-48 w-full"
              aria-label={`View details for ${bottle.name}`}
            >
              {bottle.image_url ? (
                <img
                  src={bottle.image_url}
                  alt={bottle.name}
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-[#F8F6F1]/30 p-4 text-center">
                  <div
                    className={`text-2xl font-bold ${type === 'diverse' ? 'text-[#7E3192]' : 'text-[#1D6D72]'}`}
                  >
                    {bottle.name.substring(0, 2)}
                  </div>
                </div>
              )}
              {/* Price overlay */}
              {bottle.avg_msrp && (
                <div className="absolute bottom-2 left-2">
                  <div className="bg-white/90 px-2.5 py-1.5 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-base font-bold text-[#222222]">
                        {bottle.avg_msrp.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          ) : (
            <>
              {bottle.image_url ? (
                <img
                  src={bottle.image_url}
                  alt={bottle.name}
                  className="h-64 sm:h-48 w-full object-contain p-2"
                />
              ) : (
                <div className="flex h-64 sm:h-48 w-full flex-col items-center justify-center bg-[#F8F6F1]/30 p-4 text-center">
                  <div
                    className={`text-2xl font-bold ${type === 'diverse' ? 'text-[#7E3192]' : 'text-[#1D6D72]'}`}
                  >
                    {bottle.name.substring(0, 2)}
                  </div>
                </div>
              )}
              {/* Price overlay for non-clickable version */}
              {bottle.avg_msrp && (
                <div className="absolute bottom-2 left-2">
                  <div className="bg-white/90 px-2.5 py-1.5 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-base font-bold text-[#222222]">
                        {bottle.avg_msrp.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right section - Bottle details */}
        <div className="sm:w-4/5 p-4 flex flex-col bg-[#F8F6F1]">
          {/* Bottle name and details */}
          <div className="mb-2">
            <h4 className="text-base font-medium text-[#222222]">
              {bottle.name}
            </h4>
            <div className="text-sm text-neutral-600 flex items-center space-x-2 mt-1">
              <SpiritTypeBadge type={bottle.spirit_type} variant={variant} />
            </div>
          </div>

          {/* Metrics displayed horizontally */}
          <div className="flex flex-wrap gap-3 mb-3">
            {bottle.age && (
              <MetricBadge
                type="age"
                label="Age"
                value={bottle.age}
                variant={variant}
              />
            )}

            {bottle.proof ? (
              <MetricBadge
                type="proof"
                label="Proof"
                value={bottle.proof}
                variant={variant}
              />
            ) : bottle.abv ? (
              <MetricBadge
                type="abv"
                label="ABV"
                value={bottle.abv}
                variant={variant}
              />
            ) : null}

            {bottle.size && (
              <MetricBadge
                type="size"
                label="Size"
                value={bottle.size}
                variant={variant}
              />
            )}
          </div>

          {/* Reason Points */}
          {reasonPoints.length > 0 && (
            <ReasonPoints points={reasonPoints} variant={variant} />
          )}

          {/* View asset button if available */}
          {bottle.listing_url && (
            <div className="mt-auto pt-3 flex justify-end">
              <ActionButton
                url={listingUrlWithUtm}
                variant={variant}
                hasPrice={!!bottle.avg_msrp}
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
