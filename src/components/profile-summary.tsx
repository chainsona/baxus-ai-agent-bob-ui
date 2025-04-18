import { RecommendationResponse } from '@/lib/recommendation-engine';
import { UserBar } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileSummaryProps {
  userBar: UserBar;
  analysis: RecommendationResponse['analysis'];
}

export function ProfileSummary({ userBar, analysis }: ProfileSummaryProps) {
  const { preferredStyles, priceRanges, profileSummary } = analysis;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <span className="text-xl">{userBar.username}'s Whisky Profile</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium">Collection Summary</h3>
            <p className="text-sm text-muted-foreground mt-1">{profileSummary}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Preferred Styles</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {preferredStyles.slice(0, 5).map((style) => (
                <span
                  key={style}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium">Price Range</h3>
            <div className="mt-2 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Min</p>
                <p className="font-medium">${Math.round(priceRanges.min)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Average</p>
                <p className="font-medium">${Math.round(priceRanges.average)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Max</p>
                <p className="font-medium">${Math.round(priceRanges.max)}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium">Collection Stats</h3>
            <div className="mt-2 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Bar Size</p>
                <p className="font-medium">{userBar.bottles.length} bottles</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Wishlist</p>
                <p className="font-medium">{userBar.wishlist.length} bottles</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 