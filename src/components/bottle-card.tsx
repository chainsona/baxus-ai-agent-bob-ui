import { Bottle } from '@/lib/api';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface BottleCardProps {
  bottle: Bottle;
  reason?: string;
}

export function BottleCard({ bottle, reason }: BottleCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 rounded-md border">
            {bottle.image_url ? (
              <img
                src={bottle.image_url}
                alt={bottle.name}
                className="aspect-square h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                {bottle.name.substring(0, 2)}
              </div>
            )}
          </Avatar>
          <div>
            <h3 className="font-semibold leading-tight">{bottle.name}</h3>
            <p className="text-sm text-muted-foreground">{bottle.spirit_type}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {bottle.abv && (
            <div>
              <span className="text-muted-foreground">ABV: </span>
              <span>{bottle.abv}%</span>
            </div>
          )}
          {bottle.avg_msrp && (
            <div>
              <span className="text-muted-foreground">MSRP: </span>
              <span>${bottle.avg_msrp.toFixed(2)}</span>
            </div>
          )}
          {bottle.ranking && (
            <div>
              <span className="text-muted-foreground">Rank: </span>
              <span>#{bottle.ranking}</span>
            </div>
          )}
        </div>
        {reason && <p className="mt-3 text-sm">{reason}</p>}
      </CardContent>
    </Card>
  );
} 