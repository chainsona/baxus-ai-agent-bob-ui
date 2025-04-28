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

  // Create a compatible object for getBottleProperty
  const recommendationWithBottle = {
    bottle: recommendation.bottle,
    ...recommendation.bottle,
  };

  // Type-safe helper function that returns a string
  const getStringProp = (prop: string, fallback: string = '') => {
    return String(
      getBottleProperty(recommendationWithBottle, prop) || fallback
    );
  };

  // Type-safe helper function that returns a number
  const getNumberProp = (prop: string, fallback: number = 0) => {
    const value = getBottleProperty(recommendationWithBottle, prop);
    return value !== null && value !== undefined ? Number(value) : fallback;
  };

  // Type-safe helper function that checks if a property exists
  const hasProp = (prop: string) => {
    return (
      getBottleProperty(recommendationWithBottle, prop) !== null &&
      getBottleProperty(recommendationWithBottle, prop) !== undefined
    );
  };

  return (
    <Card className="overflow-hidden bg-white border-[#1D6D72]/10 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - Bottle image */}
        <div className="relative p-6 flex items-center justify-center bg-white">
          <div className="absolute top-2 right-2 z-10">
            <RecommendationBadge type="top-pick">Top Pick</RecommendationBadge>
          </div>
          {hasProp('image_url') ? (
            <img
              src={getStringProp('image_url')}
              alt={getStringProp('name', 'Whisky bottle')}
              className="max-h-[400px] object-contain transition-all duration-300 hover:scale-105"
            />
          ) : (
            <div className="h-[400px] w-full flex flex-col items-center justify-center bg-[#F8F6F1]/30 p-4 text-center">
              <div className="text-6xl font-bold text-[#1D6D72]">
                {getStringProp('name', 'WB').substring(0, 2)}
              </div>
              <p className="mt-4 text-base text-neutral-600">
                No image available
              </p>
            </div>
          )}
          {hasProp('avg_msrp') && (
            <div className="absolute bottom-4 left-4">
              <div className="flex flex-col bg-white/90 p-2 rounded-md shadow-sm">
                <span className="text-xs text-[#1D6D72] font-medium">
                  Listed Price
                </span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-[#222222]">
                    ${getNumberProp('avg_msrp').toFixed(0)}
                  </span>
                  {hasProp('listing_url') && (
                    <Link
                      href={getStringProp('listing_url')}
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
              {getStringProp('name', 'Unnamed Bottle')}
            </h1>
            <div className="flex space-x-4 mb-4">
              <SpiritTypeBadge type={getStringProp('spirit_type', 'Whisky')} />
              {hasProp('proof') ? (
                <Badge
                  variant="outline"
                  className="text-neutral-600 bg-white hover:bg-white/90 border-[#1D6D72]/10"
                >
                  {getStringProp('proof')} Proof
                </Badge>
              ) : hasProp('abv') ? (
                <Badge
                  variant="outline"
                  className="text-neutral-600 bg-white hover:bg-white/90 border-[#1D6D72]/10"
                >
                  {getNumberProp('abv')}% Alc/Vol
                </Badge>
              ) : null}
              {hasProp('age') && (
                <Badge
                  variant="outline"
                  className="text-neutral-600 bg-white hover:bg-white/90 border-[#1D6D72]/10"
                >
                  {getNumberProp('age')} Year
                </Badge>
              )}
            </div>

            <div className="mb-6">
              <p className="text-[#222222] line-clamp-4">
                {recommendation.reason ||
                  `${getStringProp('name', 'Unnamed Bottle')} is a premium ${getStringProp('spirit_type', 'Whisky').toLowerCase()} recommendation from BOB. This selection complements your collection and matches your taste preferences.`}
              </p>
            </div>
          </div>

          {/* Details grid */}
          <div className="mt-auto border-t border-[#1D6D72]/10 pt-4">
            <dl className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <dt className="text-sm text-neutral-600">Producer</dt>
                <dd className="text-[#222222] font-medium">
                  {hasProp('brand_id')
                    ? `Brand #${getStringProp('brand_id')}`
                    : 'Unknown'}
                </dd>
              </div>

              <div className="space-y-1">
                <dt className="text-sm text-neutral-600">Type</dt>
                <dd className="text-[#222222] font-medium">
                  <SpiritTypeBadge
                    type={getStringProp('spirit_type', 'Whisky')}
                  />
                </dd>
              </div>

              {hasProp('region') && (
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">Region</dt>
                  <dd className="text-[#222222] font-medium">
                    {hasProp('country')
                      ? `${getStringProp('region')}, ${getStringProp('country')}`
                      : getStringProp('region')}
                  </dd>
                </div>
              )}

              {hasProp('age') && (
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">Age</dt>
                  <dd className="text-[#222222] font-medium">
                    {getNumberProp('age')} Year
                    {getNumberProp('age') !== 1 ? 's' : ''}
                  </dd>
                </div>
              )}

              {hasProp('abv') && (
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">ABV</dt>
                  <dd className="text-[#222222] font-medium">
                    {getNumberProp('abv')}%
                  </dd>
                </div>
              )}

              {hasProp('avg_msrp') && (
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">MSRP</dt>
                  <dd className="text-[#222222] font-medium">
                    ${getNumberProp('avg_msrp').toFixed(0)}
                  </dd>
                </div>
              )}

              {hasProp('ranking') && (
                <div className="space-y-1">
                  <dt className="text-sm text-neutral-600">Rank</dt>
                  <dd className="text-[#222222] font-medium">
                    #{getNumberProp('ranking')}
                  </dd>
                </div>
              )}
            </dl>

            {/* Add View Asset button if listing URL is available */}
            {hasProp('listing_url') && (
              <div className="flex justify-end mt-4">
                <ActionButton
                  url={getStringProp('listing_url')}
                  hasPrice={hasProp('avg_msrp')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
