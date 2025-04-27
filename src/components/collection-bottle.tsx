import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottleData } from '@/lib/api';

interface CollectionBottleProps {
  bottle: BottleData;
}

export function CollectionBottle({ bottle }: CollectionBottleProps) {
  return (
    <Card className="overflow-hidden h-full bg-white border-[#E5E2D9] hover:border-[#1D6D72]/30 transition-colors">
      <CardContent className="p-3">
        <div className="flex gap-3 items-center">
          <div className="relative w-16 h-16 flex-shrink-0 bg-[#F8F6F1] rounded-md overflow-hidden">
            {bottle.image_url ? (
              <Image
                src={bottle.image_url}
                alt={bottle.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#1D6D72]/40">
                No image
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-medium text-sm text-[#222222] truncate"
              title={bottle.name}
            >
              {bottle.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className="text-xs px-1.5 border-[#1D6D72]/30 text-[#1D6D72]"
              >
                {bottle.spirit}
              </Badge>
              {bottle.price && (
                <span className="text-xs text-neutral-500">
                  ${bottle.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
