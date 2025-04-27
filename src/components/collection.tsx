import { CollectionBottle } from '@/components/collection-bottle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BottleData } from '@/lib/api';

interface CollectionProps {
  bottles: BottleData[];
  title?: string;
}

export function Collection({ bottles, title = 'Collection' }: CollectionProps) {
  if (!bottles || bottles.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white border-[#E5E2D9]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-[#222222]">
          {title} ({bottles.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {bottles.map((bottle) => (
            <CollectionBottle key={bottle.id} bottle={bottle} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
