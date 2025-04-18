import { RecommendationResponse } from '@/lib/recommendation-engine';
import { UserBar } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, PackageCheck, GlassWater, DollarSign } from 'lucide-react';

interface ProfileSummaryProps {
  userBar: UserBar;
  analysis: RecommendationResponse['analysis'];
}

export function ProfileSummary({ userBar, analysis }: ProfileSummaryProps) {
  const { preferredStyles, priceRanges, profileSummary } = analysis;
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="glass-card border-[#1D6D72]/10 shadow-sm">
        <CardHeader className="border-b border-[#1D6D72]/10 pb-2 sm:pb-3 px-3 sm:px-5 pt-3 sm:pt-4">
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#1D6D72]" />
            <span className="text-base sm:text-lg text-[#222222]">  Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-5">
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-800">{profileSummary}</p>
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
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {preferredStyles.slice(0, 6).map((style) => (
              <span
                key={style}
                className="rounded-full bg-[#1D6D72]/15 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-[#1D6D72]"
              >
                {style}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card border-[#1D6D72]/10 shadow-sm">
        <CardHeader className="border-b border-[#1D6D72]/10 pb-2 sm:pb-3 px-3 sm:px-5 pt-3 sm:pt-4">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[#1D6D72]" />
            <span className="text-base sm:text-lg text-[#222222]">Investment Range</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center">
              <div className="flex flex-col items-center">
                <p className="text-[10px] sm:text-xs text-neutral-600">Min</p>
                <p className="text-xl sm:text-2xl font-semibold text-[#1D6D72]">${Math.round(priceRanges.min)}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center">
                <p className="text-[10px] sm:text-xs text-neutral-600">Average</p>
                <p className="text-xl sm:text-2xl font-semibold text-[#1D6D72]">${Math.round(priceRanges.average)}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center">
                <p className="text-[10px] sm:text-xs text-neutral-600">Max</p>
                <p className="text-xl sm:text-2xl font-semibold text-[#1D6D72]">${Math.round(priceRanges.max)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card border-[#1D6D72]/10 shadow-sm">
        <CardHeader className="border-b border-[#1D6D72]/10 pb-2 sm:pb-3 px-3 sm:px-5 pt-3 sm:pt-4">
          <CardTitle className="flex items-center gap-2">
            <PackageCheck className="h-4 w-4 sm:h-5 sm:w-5 text-[#1D6D72]" />
            <span className="text-base sm:text-lg text-[#222222]">Collection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-5">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="flex flex-col items-center rounded-md border border-[#1D6D72]/10 bg-[#F8F6F1] p-2 sm:p-3">
              <span className="text-[10px] sm:text-xs text-neutral-600">Bar Size</span>
              <span className="text-lg sm:text-xl font-semibold text-[#1D6D72]">{userBar.bottles.length}</span>
              <span className="text-[10px] sm:text-xs text-neutral-600">bottles</span>
            </div>
            <div className="flex flex-col items-center rounded-md border border-[#1D6D72]/10 bg-[#F8F6F1] p-2 sm:p-3">
              <span className="text-[10px] sm:text-xs text-neutral-600">Wishlist</span>
              <span className="text-lg sm:text-xl font-semibold text-[#1D6D72]">{userBar.wishlist.length}</span>
              <span className="text-[10px] sm:text-xs text-neutral-600">bottles</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 