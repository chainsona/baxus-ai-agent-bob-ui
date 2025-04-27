import { UserProfile } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, GlassWater, DollarSign } from 'lucide-react';
import { TasteProfileChart } from './taste-profile-chart';
import { Recommendation } from '@/lib/recommendation-engine';

interface ProfileSummaryProps {
  userProfile: UserProfile;
  similarRecommendations?: Recommendation[];
}

export function ProfileSummary({
  userProfile,
  similarRecommendations = [],
}: ProfileSummaryProps) {
  const { taste_profile, collection } = userProfile;

  // Create a profile summary based on the data
  const profileSummary = `This collection consists of ${collection.stats.bottle_count} bottles, with a clear preference for ${taste_profile.favorite_type} from ${taste_profile.favorite_region}. The dominant flavors are ${taste_profile.dominant_flavors.join(' and ')}.`;

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="glass-card border-[#1D6D72]/10 shadow-sm">
        <CardHeader className="border-b border-[#1D6D72]/10 pb-2 sm:pb-3 px-3 sm:px-5 pt-3 sm:pt-4">
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#1D6D72]" />
            <span className="text-base sm:text-lg text-[#222222]">Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-5">
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-800">
            {profileSummary}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card border-[#1D6D72]/10 shadow-sm">
        <CardHeader className="border-b border-[#1D6D72]/10 pb-2 sm:pb-3 px-3 sm:px-5 pt-3 sm:pt-4">
          <CardTitle className="flex items-center gap-2">
            <GlassWater className="h-4 w-4 sm:h-5 sm:w-5 text-[#1D6D72]" />
            <span className="text-base sm:text-lg text-[#222222]">Taste</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-5">
          <TasteProfileChart
            flavorProfiles={taste_profile.flavor_profiles}
            similarRecommendations={similarRecommendations}
          />
        </CardContent>
      </Card>

      <Card className="glass-card border-[#1D6D72]/10 shadow-sm">
        <CardHeader className="border-b border-[#1D6D72]/10 pb-2 sm:pb-3 px-3 sm:px-5 pt-3 sm:pt-4">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[#1D6D72]" />
            <span className="text-base sm:text-lg text-[#222222]">
              Investment Range
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center">
              <div className="flex flex-col items-center">
                <p className="text-[10px] sm:text-xs text-neutral-600">Min</p>
                <p className="text-xl sm:text-2xl font-semibold text-[#1D6D72]">
                  ${Math.round(collection.investment.price_range.min)}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center">
                <p className="text-[10px] sm:text-xs text-neutral-600">
                  Average
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-[#1D6D72]">
                  ${Math.round(collection.investment.estimated_value.average)}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center">
                <p className="text-[10px] sm:text-xs text-neutral-600">Max</p>
                <p className="text-xl sm:text-2xl font-semibold text-[#1D6D72]">
                  ${Math.round(collection.investment.price_range.max)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
