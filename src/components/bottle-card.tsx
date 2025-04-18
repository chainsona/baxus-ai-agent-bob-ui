import { Percent, DollarSign, Star, ThumbsUp, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bottle } from "@/lib/api";

interface BottleCardProps {
  bottle: Bottle;
  reason?: string;
}

export function BottleCard({ bottle, reason }: BottleCardProps) {
  // Parse reason into separate points if available
  const reasonPoints = reason ? parseReasonIntoPoints(reason) : [];

  return (
    <Card className="group overflow-hidden glass-card border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      {/* Mobile layout (vertical) */}
      <div className="flex flex-col lg:hidden">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {bottle.image_url ? (
            <img
              src={bottle.image_url}
              alt={bottle.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-secondary p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {bottle.name.substring(0, 2)}
              </div>
              <p className="mt-1 sm:mt-2 text-xs text-muted-foreground">
                No image available
              </p>
            </div>
          )}
          {/* Add a "Recommended" badge at the top of the image */}
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-primary-foreground hover:from-primary/80 hover:via-primary/90 hover:to-primary/80 shadow-sm text-[10px] sm:text-xs px-2 py-0.5 border border-primary/20 font-medium transition-all duration-300 hover:shadow">
              <span className="relative z-10 mix-blend-overlay">✦</span>
              <span className="mr-1">Recommended</span>
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 sm:p-4 text-white">
            <h3 className="text-sm sm:text-base font-medium leading-tight line-clamp-2">
              {bottle.name}
            </h3>
            <p className="text-xs text-white/95 line-clamp-1">
              {bottle.spirit_type}
            </p>
          </div>
        </div>

        <CardContent className="p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {bottle.abv && (
              <div className="flex flex-col items-center justify-center rounded-md border border-primary/10 bg-secondary p-1.5 sm:p-2 text-center">
                <Percent className="mb-0.5 sm:mb-1 h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-[8px] sm:text-[10px] text-muted-foreground">
                  ABV
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  {bottle.abv}%
                </span>
              </div>
            )}

            {bottle.avg_msrp && (
              <div className="flex flex-col items-center justify-center rounded-md border border-primary/10 bg-secondary p-1.5 sm:p-2 text-center">
                <DollarSign className="mb-0.5 sm:mb-1 h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-[8px] sm:text-[10px] text-muted-foreground">
                  MSRP
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  ${bottle.avg_msrp.toFixed(0)}
                </span>
              </div>
            )}

            {bottle.ranking && (
              <div className="flex flex-col items-center justify-center rounded-md border border-primary/10 bg-secondary p-1.5 sm:p-2 text-center">
                <Star className="mb-0.5 sm:mb-1 h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-[8px] sm:text-[10px] text-muted-foreground">
                  Rank
                </span>
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  #{bottle.ranking}
                </span>
              </div>
            )}
          </div>

          {reasonPoints.length > 0 && (
            <div className="mt-2 sm:mt-3 rounded-md border border-primary/20 bg-primary/5 p-2 sm:p-3">
              <h4 className="flex items-center text-xs font-medium text-primary mb-1.5">
                <ThumbsUp className="h-3 w-3 mr-1" />
                <span>Why Bob Recommends This</span>
              </h4>
              <ul className="space-y-1">
                {reasonPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start text-[10px] sm:text-xs text-foreground"
                  >
                    <ArrowRight className="h-3 w-3 text-primary mr-1 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </div>

      {/* Desktop layout (horizontal/landscape) */}
      <div className="hidden lg:flex flex-row h-full">
        {/* Left side: Image */}
        <div className="relative w-2/5 overflow-hidden">
          {bottle.image_url ? (
            <img
              src={bottle.image_url}
              alt={bottle.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-secondary p-4 text-center">
              <div className="text-4xl font-bold text-primary">
                {bottle.name.substring(0, 2)}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                No image available
              </p>
            </div>
          )}
          {/* Badge on the image */}
          <div className="absolute top-3 left-3 z-10">
            <Badge className="relative overflow-hidden bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-primary-foreground hover:from-primary/80 hover:via-primary/90 hover:to-primary/80 shadow-sm text-sm px-3 py-1 border border-primary/20 font-medium animate-pulse-subtle transition-all duration-300 hover:shadow">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent shine-effect"></span>
              <span className="relative z-10 mix-blend-overlay mr-1">✦</span>
              <span className="relative z-10">Recommended</span>
            </Badge>
          </div>
          {/* Gradient overlay for name */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 text-white">
            <h3 className="text-lg font-medium leading-tight">
              {bottle.name}
            </h3>
            <p className="text-sm text-white/95">
              {bottle.spirit_type}
            </p>
          </div>
        </div>

        {/* Right side: Content */}
        <div className="w-3/5 flex flex-col">
          <CardContent className="p-5 flex flex-col h-full">
            {/* Top section: Metrics */}
            <div className="flex space-x-4 mb-4">
              {bottle.abv && (
                <div className="flex items-center rounded-md border border-primary/10 bg-secondary p-3 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-secondary">
                  <Percent className="h-5 w-5 text-primary mr-2" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      ABV
                    </span>
                    <span className="text-base font-medium text-foreground">
                      {bottle.abv}%
                    </span>
                  </div>
                </div>
              )}

              {bottle.avg_msrp && (
                <div className="flex items-center rounded-md border border-primary/10 bg-secondary p-3 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-secondary">
                  <DollarSign className="h-5 w-5 text-primary mr-2" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      MSRP
                    </span>
                    <span className="text-base font-medium text-foreground">
                      ${bottle.avg_msrp.toFixed(0)}
                    </span>
                  </div>
                </div>
              )}

              {bottle.ranking && (
                <div className="flex items-center rounded-md border border-primary/10 bg-secondary p-3 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-secondary">
                  <Star className="h-5 w-5 text-primary mr-2" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Rank
                    </span>
                    <span className="text-base font-medium text-foreground">
                      #{bottle.ranking}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom section: Reason points */}
            {reasonPoints.length > 0 && (
              <div className="mt-auto flex-grow rounded-md border border-primary/20 bg-primary/5 p-4 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                <h4 className="flex items-center text-sm font-medium text-primary mb-2">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  <span>Why Bob Recommends This</span>
                </h4>
                <ul className="space-y-2">
                  {reasonPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-foreground"
                    >
                      <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

/**
 * Parse a recommendation reason string into separate points
 */
function parseReasonIntoPoints(reason: string): string[] {
  // Split complex reason sentences into separate points
  const points: string[] = [];

  // Check for typical phrases in the recommendation text
  if (reason.includes("matches your preference")) {
    points.push("Matches your taste preferences");
  }

  if (reason.includes("would add variety")) {
    points.push("Adds variety to your collection");
  }

  if (reason.includes("good value")) {
    points.push("Offers excellent value for money");
  }

  if (reason.includes("premium selection")) {
    points.push("Premium selection worth the investment");
  }

  if (reason.includes("typical price range")) {
    points.push("Within your typical price range");
  }

  if (reason.includes("highly rated") || reason.includes("ranked #")) {
    points.push("Highly rated among whisky enthusiasts");
  }

  if (reason.includes("popular among")) {
    points.push("Popular among BAXUS users");
  }

  // If we couldn't extract specific points, use the whole reason as one point
  if (points.length === 0) {
    return [reason];
  }

  return points;
}
