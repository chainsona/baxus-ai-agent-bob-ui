import { CollectionBottle } from '@/components/collection-bottle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageCheck } from 'lucide-react';
import { BottleData } from '@/lib/api';

interface CollectionWithStatsProps {
  bottles: BottleData[];
  title?: string;
  bottleCount?: number;
  diversityScore?: number;
}

export function CollectionWithStats({
  bottles,
  title = 'Bottles',
  bottleCount,
  diversityScore = 0,
}: CollectionWithStatsProps) {
  // Use the provided bottleCount or fallback to the length of the bottles array
  const displayBottleCount = bottleCount ?? (bottles?.length || 0);

  if (!bottles || bottles.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white border-[#E5E2D9]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-[#222222] flex items-center gap-2">
          <PackageCheck className="h-4 w-4 sm:h-5 sm:w-5 text-[#1D6D72]" />
          <span>Collection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Collection Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div className="flex flex-col items-center rounded-md border border-[#1D6D72]/10 bg-[#F8F6F1] p-2 sm:p-3">
            <span className="text-[10px] sm:text-xs text-neutral-600">
              Bar Size
            </span>
            <span className="text-lg sm:text-xl font-semibold text-[#1D6D72]">
              {displayBottleCount}
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-600">
              bottles
            </span>
          </div>
          <div className="flex flex-col items-center rounded-md border border-[#1D6D72]/10 bg-[#F8F6F1] p-2 sm:p-3">
            <span className="text-[10px] sm:text-xs text-neutral-600">
              Diversity
            </span>
            <span className="text-lg sm:text-xl font-semibold text-[#1D6D72]">
              {diversityScore.toFixed(1)}
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-600">
              score
            </span>
          </div>
        </div>

        {/* Collection Bottles List */}
        <div>
          <h3 className="font-medium text-sm text-[#222222] mb-3">
            {title} ({displayBottleCount})
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {bottles.map((bottle) => (
              <CollectionBottle key={bottle.id} bottle={bottle} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
