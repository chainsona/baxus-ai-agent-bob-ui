import { Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function EmptyRecommendations() {
  return (
    <section className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-[#222222] flex items-center gap-2">
          <Award className="h-6 w-6 text-[#1D6D72]" />
          BOB&apos;s Recommendations
        </h2>
      </div>
      <Card className="p-6 text-center bg-white border-[#1D6D72]/10">
        <p className="text-neutral-600">
          No recommendations available at this time.
        </p>
        <p className="text-sm text-neutral-400 mt-2">
          Try refreshing the page or check back later.
        </p>
      </Card>
    </section>
  );
}

export function InvalidRecommendations() {
  return (
    <section className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-[#222222] flex items-center gap-2">
          <Award className="h-6 w-6 text-[#1D6D72]" />
          BOB&apos;s Recommendations
        </h2>
      </div>
      <Card className="p-6 text-center bg-white border-[#1D6D72]/10">
        <p className="text-neutral-600">
          Unable to load recommendation details.
        </p>
        <p className="text-sm text-neutral-400 mt-2">
          Try refreshing the page or check back later.
        </p>
      </Card>
    </section>
  );
}
