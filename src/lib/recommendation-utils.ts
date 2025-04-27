import { Bottle } from './api';

interface RecommendationWithBottle {
  bottle?: Bottle;
  [key: string]: unknown;
}

/**
 * Safe accessor function for bottle properties with fallbacks
 */
export const getBottleProperty = (
  recommendation: RecommendationWithBottle,
  property: string,
  fallback: unknown = null
) => {
  if (!recommendation) return fallback;

  // First try to get from the bottle property (for compatibility with our formatting)
  if (
    recommendation.bottle &&
    recommendation.bottle[property as keyof Bottle] !== undefined
  ) {
    return recommendation.bottle[property as keyof Bottle];
  }

  // If not found in bottle, try to get directly from the recommendation
  return recommendation[property] !== undefined
    ? recommendation[property]
    : fallback;
};

/**
 * Parse a recommendation reason string into separate points
 */
export function parseReasonIntoPoints(reason: string): string[] {
  if (!reason) return [];

  // Split by line breaks first
  const lineBreaks = reason
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  // If there are multiple lines, use those directly
  if (lineBreaks.length > 1) {
    return lineBreaks;
  }

  // For single line reasons, try to intelligently split into points
  const points: string[] = [];

  // Split by periods, semicolons, or other natural separators
  const sentenceSeparators = reason
    .split(/[.;]/)
    .filter((s) => s.trim().length > 0);
  if (sentenceSeparators.length > 1) {
    return sentenceSeparators.map((s) => s.trim());
  }

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
