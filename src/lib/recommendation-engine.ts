import { Bottle, UserBar, TasteProfile } from './api';

// Define recommendation types
export interface Recommendation {
  bottle: Bottle;
  reason: string;
  score: number;
}

// Extend UserBar interface to include optional taste_profile for the scoring function
export interface UserBarWithTasteProfile extends UserBar {
  taste_profile?: TasteProfile;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  analysis: {
    preferredRegions: string[];
    preferredStyles: string[];
    priceRanges: {
      min: number;
      max: number;
      average: number;
    };
    profileSummary: string;
  };
}

/**
 * Analyzes a user's bar to identify patterns and preferences
 */
export function analyzeUserBar(userBar: UserBar) {
  // Ensure we have bottles data
  const bottles = userBar?.bottles || [];

  // Extract spirit types, create a frequency map
  const spiritTypes = new Map<string, number>();
  bottles.forEach((bottle) => {
    const type = bottle.spirit_type;
    if (type) {
      spiritTypes.set(type, (spiritTypes.get(type) || 0) + 1);
    }
  });

  // Sort spirit types by frequency
  const preferredStyles = Array.from(spiritTypes.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([type]) => type);

  // Calculate price ranges
  const prices = bottles
    .map((bottle) => bottle.avg_msrp || bottle.fair_price || bottle.shelf_price)
    .filter(Boolean) as number[];

  const priceRanges = {
    min: prices.length ? Math.min(...prices) : 0,
    max: prices.length ? Math.max(...prices) : 0,
    average: prices.length
      ? prices.reduce((sum, price) => sum + price, 0) / prices.length
      : 0,
  };

  // Create profile summary
  const profileSummary = generateProfileSummary(
    bottles,
    preferredStyles,
    priceRanges
  );

  return {
    preferredStyles,
    preferredRegions: [], // Would need more data to determine regions
    priceRanges,
    profileSummary,
  };
}

/**
 * Generates a summary of the user's taste profile
 */
function generateProfileSummary(
  bottles: Bottle[],
  preferredStyles: string[],
  priceRanges: { min: number; max: number; average: number }
): string {
  const bottleCount = bottles.length;

  if (bottleCount === 0) {
    return 'No bottles found in this collection.';
  }

  const topStyle = preferredStyles[0] || 'whiskey';

  // Get average ABV/proof if available
  const abvValues = bottles
    .map((bottle) => bottle.abv)
    .filter(Boolean) as number[];
  const avgAbv = abvValues.length
    ? Math.round(
        abvValues.reduce((sum, abv) => sum + abv, 0) / abvValues.length
      )
    : null;

  let summary = `This collection consists of ${bottleCount} bottles`;

  if (preferredStyles.length > 0) {
    summary += `, with a clear preference for ${topStyle}`;

    if (preferredStyles.length > 1) {
      summary += ` and ${preferredStyles[1]}`;
    }
  }

  summary += `. The collection spans a price range from $${Math.round(priceRanges.min)} to $${Math.round(priceRanges.max)}, with an average bottle value of $${Math.round(priceRanges.average)}.`;

  if (avgAbv) {
    summary += ` The average ABV is ${avgAbv}%.`;
  }

  return summary;
}

/**
 * Generates bottle recommendations based on user preferences
 */
export async function generateRecommendations(
  userBar: UserBar,
  availableBottles: Bottle[]
): Promise<RecommendationResponse> {
  // Make sure userBar and userBar.bottles exist
  if (!userBar || !userBar.bottles || !Array.isArray(userBar.bottles)) {
    throw new Error('Invalid user bar data');
  }

  // Analyze user's current collection
  const analysis = analyzeUserBar(userBar);

  // Filter out bottles that are already in user's collection or wishlist
  const userBottleIds = new Set([
    ...userBar.bottles.map((bottle) => bottle.id),
    ...(userBar.wishlist || []).map((bottle) => bottle.id),
  ]);

  const candidateBottles = availableBottles.filter(
    (bottle) => !userBottleIds.has(bottle.id)
  );

  // Score each candidate bottle
  const scoredBottles = candidateBottles.map((bottle) => {
    const score = calculateBottleScore(bottle, userBar, analysis);

    return {
      bottle,
      score,
      reason: generateRecommendationReason(bottle, userBar, analysis),
    };
  });

  // Sort by score and take top 5
  const recommendations = scoredBottles
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    recommendations,
    analysis,
  };
}

/**
 * Calculates a score for how well a bottle matches user preferences
 */
function calculateBottleScore(
  bottle: Bottle,
  userBar: UserBarWithTasteProfile,
  analysis: ReturnType<typeof analyzeUserBar>
): number {
  let score = 50; // Base score

  // Style match
  if (analysis.preferredStyles.includes(bottle.spirit_type)) {
    const styleIndex = analysis.preferredStyles.indexOf(bottle.spirit_type);
    score += 20 - styleIndex * 5; // More points for top preferences
  }

  // Price match - higher score if within their usual range
  const bottlePrice =
    bottle.avg_msrp || bottle.fair_price || bottle.shelf_price || 0;
  if (
    bottlePrice >= analysis.priceRanges.min * 0.8 &&
    bottlePrice <= analysis.priceRanges.max * 1.2
  ) {
    score += 15;
  }

  // Flavor profile match - if both the user bar has a flavor profile and the bottle has a flavor profile
  // This will only be used if the user taste profile is available
  if (userBar.taste_profile?.flavor_profiles && bottle.flavor_profiles) {
    // Calculate flavor profile similarity score
    const userFlavorProfiles = userBar.taste_profile.flavor_profiles;
    const bottleFlavorProfiles = bottle.flavor_profiles;

    // Get all flavor keys across both profiles
    const allFlavors = new Set([
      ...Object.keys(userFlavorProfiles),
      ...Object.keys(bottleFlavorProfiles),
    ]);

    // Calculate the similarity score using cosine similarity
    let dotProduct = 0;
    let userMagnitude = 0;
    let bottleMagnitude = 0;

    allFlavors.forEach((flavor) => {
      // Use optional chaining and nullish coalescing for type safety
      const userValue =
        flavor in userFlavorProfiles
          ? userFlavorProfiles[flavor as keyof typeof userFlavorProfiles] || 0
          : 0;
      const bottleValue =
        flavor in bottleFlavorProfiles ? bottleFlavorProfiles[flavor] || 0 : 0;

      dotProduct += userValue * bottleValue;
      userMagnitude += userValue * userValue;
      bottleMagnitude += bottleValue * bottleValue;
    });

    userMagnitude = Math.sqrt(userMagnitude);
    bottleMagnitude = Math.sqrt(bottleMagnitude);

    // Avoid division by zero
    const similarity =
      userMagnitude > 0 && bottleMagnitude > 0
        ? dotProduct / (userMagnitude * bottleMagnitude)
        : 0;

    // Scale similarity to a 0-15 range for scoring
    score += Math.round(similarity * 15);
  }

  // Popularity/rating boost
  if (bottle.total_score) {
    score += Math.min(10, bottle.total_score / 10000); // Cap at 10 points
  }

  // Ranking boost
  if (bottle.ranking && bottle.ranking <= 100) {
    score += Math.max(0, 10 - bottle.ranking / 10);
  }

  return score;
}

/**
 * Generates a human-readable reason for recommending this bottle
 */
function generateRecommendationReason(
  bottle: Bottle,
  userBar: UserBarWithTasteProfile,
  analysis: ReturnType<typeof analyzeUserBar>
): string {
  const reasons = [];

  // Style match reason
  if (analysis.preferredStyles.includes(bottle.spirit_type)) {
    reasons.push(`matches your preference for ${bottle.spirit_type}`);
  } else {
    reasons.push(
      `would add variety to your collection with a ${bottle.spirit_type}`
    );
  }

  // Flavor profile match reason
  if (userBar.taste_profile?.flavor_profiles && bottle.flavor_profiles) {
    // Find the most prominent flavor in the bottle
    const topFlavor = Object.entries(bottle.flavor_profiles)
      .sort((a, b) => b[1] - a[1])
      .map(([flavor]) => flavor)[0];

    if (topFlavor) {
      const topFlavorValue = bottle.flavor_profiles[topFlavor];
      // Only mention if the flavor is significant (value > 0.5)
      if (topFlavorValue > 0.5) {
        reasons.push(
          `has prominent ${topFlavor} notes that may appeal to your taste profile`
        );
      }
    }
  }

  // Price reason
  const bottlePrice =
    bottle.avg_msrp || bottle.fair_price || bottle.shelf_price || 0;
  if (bottlePrice <= analysis.priceRanges.average * 0.8) {
    reasons.push(`offers good value at $${Math.round(bottlePrice)}`);
  } else if (bottlePrice >= analysis.priceRanges.average * 1.5) {
    reasons.push(`is a premium selection at $${Math.round(bottlePrice)}`);
  } else {
    reasons.push(
      `is in your typical price range at $${Math.round(bottlePrice)}`
    );
  }

  // Popularity reason
  if (bottle.ranking && bottle.ranking <= 50) {
    reasons.push(`is highly rated (ranked #${bottle.ranking})`);
  } else if (bottle.total_score && bottle.total_score > 5000) {
    reasons.push(`is popular among BAXUS users`);
  }

  // Format the reason text
  let reasonText = `This ${bottle.spirit_type} ${reasons[0]}`;

  if (reasons.length > 1) {
    reasonText += ` and ${reasons[1]}`;
  }

  if (reasons.length > 2) {
    reasonText += `. It also ${reasons[2]}`;
  }

  return reasonText;
}
