import { Recommendation } from '@/lib/recommendation-engine';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { RecommendationBadge } from './badge';
import { SpiritTypeBadge } from './spirit-type-badge';
import { ActionButton } from './action-button';
import { getBottleProperty } from '@/lib/recommendation-utils';

interface FeaturedRecommendationProps {
  recommendation: Recommendation;
}

export function FeaturedRecommendation({
  recommendation,
}: FeaturedRecommendationProps) {
  if (!recommendation || !recommendation.bottle) {
    return null;
  }

  return (
    <Card className="overflow-hidden bg-white border-[#1D6D72]/10 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - Bottle image */}
        <div className="relative p-6 flex items-center justify-center bg-white">
          <div className="absolute top-2 right-2 z-10">
            <RecommendationBadge type="top-pick">Top Pick</RecommendationBadge>
          </div>
          {getBottleProperty(recommendation, 'image_url') ? (
            <img
              src={getBottleProperty(recommendation, 'image_url')}
              alt={getBottleProperty(recommendation, 'name', 'Whisky bottle')}
              className="max-h-[400px] object-contain transition-all duration-300 hover:scale-105"
            />
          ) : (
            <div className="h-[400px] w-full flex flex-col items-center justify-center bg-[#F8F6F1]/30 p-4 text-center">
              <div className="text-6xl font-bold text-[#1D6D72]">
                {getBottleProperty(recommendation, 'name', 'WB').substring(
                  0,
                  2
                )}
              </div>
              <p className="mt-4 text-base text-neutral-600">
                No image available
              </p>
            </div>
          )}
          {getBottleProperty(recommendation, 'avg_msrp') && (
            <div className="absolute bottom-4 left-4">
              <div className="flex flex-col bg-white/90 p-2 rounded-md shadow-sm">
                <span className="text-xs text-[#1D6D72] font-medium">
                  Listed Price
                </span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-[#222222]">
                    ${getBottleProperty(recommendation, 'avg_msrp').toFixed(0)}
                  </span>
                  {getBottleProperty(recommendation, 'listing_url') && (
                    <Link
                      href={getBottleProperty(recommendation, 'listing_url')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="ml-1 flex items-center hover:text-[#1D6D72]">
                        <ExternalLink className="h-3 w-3 text-[#1D6D72]" />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right column - Bottle details */}
        <div className="p-6 flex flex-col bg-[#F8F6F1]">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#222222] mb-2">
              {getBottleProperty(recommendation, 'name', 'Unnamed Bottle')}
            </h1>
            <div className="flex space-x-4 mb-4">
              <SpiritTypeBadge
                type={getBottleProperty(
                  recommendation,
                  'spirit_type',
                  'Whisky'
                )}
              />
              {getBottleProperty(recommendation, 'proof') ? (
                <Badge
                  variant="outline"
                  className="text-neutral-600 bg-white hover:bg-white/90 border-[#1D6D72]/10"
                >
                  {getBottleProperty(recommendation, 'proof')} Proof
                </Badge>
              ) : getBottleProperty(recommendation, 'abv') ? (
                <Badge
                  variant="outline"
                  className="text-neutral-600 bg-white hover:bg-white/90 border-[#1D6D72]/10"
                >
                  {getBottleProperty(recommendation, 'abv')}% Alc/Vol
                </Badge>
              ) : null}
              {getBottleProperty(recommendation, 'age') && (
                <Badge
                  variant="outline"
                  className="text-neutral-600 bg-white hover:bg-white/90 border-[#1D6D72]/10"
                >
                  {getBottleProperty(recommendation, 'age')} Year
                </Badge>
              )}
            </div>

            <div className="mb-6">
              <p className="text-[#222222] line-clamp-4">
                {recommendation.reason ||
                  `${getBottleProperty(
                    recommendation,
                    'name',
                    'Unnamed Bottle'
                  )} is a premium ${getBottleProperty(recommendation, 'spirit_type', 'Whisky').toLowerCase()} recommendation from BOB. This selection complements your collection and matches your taste preferences.`}
              </p>
            </div>
          </div>

          {/* Details grid */}
          <div className="mt-auto border-t border-[#1D6D72]/10 pt-4">
            <dl className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <dt className="text-sm text-neutral-600">Producer</dt>
                <dd className="text-[#222222] font-medium">
                  {getBottleProperty(recommendation, 'brand_id')
                    ? `Brand #${getBottleProperty(recommendation, 'brand_id')}`
                    : 'Unknown'}
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-sm text-neutral-600">Type</dt>
                <dd className="text-[#222222] font-medium">
                  <SpiritTypeBadge
                    type={getBottleProperty(
                      recommendation,
                      'spirit_type',
                      'Whisky'
                    )}
                  />
                </dd>
              </div>

              {getBottleProperty(recommendation, 'region') && (
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">Region</dt>
                  <dd className="text-[#222222] font-medium">
                    {getBottleProperty(recommendation, 'country')
                      ? `${getBottleProperty(recommendation, 'region')}, ${getBottleProperty(recommendation, 'country')}`
                      : getBottleProperty(recommendation, 'region')}
                  </dd>
                </div>
              )}

              {getBottleProperty(recommendation, 'age') && (
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">Age</dt>
                  <dd className="text-[#222222] font-medium">
                    {getBottleProperty(recommendation, 'age')} Year
                    {getBottleProperty(recommendation, 'age') !== 1 ? 's' : ''}
                  </dd>
                </div>
              )}

              {getBottleProperty(recommendation, 'abv') && (
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">ABV</dt>
                  <dd className="text-[#222222] font-medium">
                    {getBottleProperty(recommendation, 'abv')}%
                  </dd>
                </div>
              )}

              {getBottleProperty(recommendation, 'avg_msrp') && (
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">MSRP</dt>
                  <dd className="text-[#222222] font-medium">
                    ${getBottleProperty(recommendation, 'avg_msrp').toFixed(0)}
                  </dd>
                </div>
              )}

              {getBottleProperty(recommendation, 'ranking') && (
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">Rank</dt>
                  <dd className="text-[#222222] font-medium">
                    #{getBottleProperty(recommendation, 'ranking')}
                  </dd>
                </div>
              )}
            </dl>

            {/* Add View Asset button if listing URL is available */}
            {getBottleProperty(recommendation, 'listing_url') && (
              <div className="flex justify-end mt-4">
                <ActionButton
                  url={getBottleProperty(recommendation, 'listing_url')}
                  hasPrice={!!getBottleProperty(recommendation, 'avg_msrp')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
