'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BarChart3, Droplet, Award, GlassWater } from 'lucide-react';
import { UserSearch } from '@/components/user-search';
import { useUser } from '@/lib/UserContext';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUsername } = useUser();

  // Clear user context when landing on the root page
  useEffect(() => {
    // Clear username from context and localStorage
    setUsername(null);
  }, [setUsername]);

  const handleSearch = async (username: string) => {
    setIsLoading(true);

    try {
      // Set username in the user context
      setUsername(username);

      // Redirect to the username page
      router.push(`/${username}`);
    } catch (err) {
      console.error('Error:', err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden py-10 md:py-16 lg:py-24 bg-[#F8F6F1]">
        <div className="absolute inset-0 bg-[url('/whisky-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="container px-4 sm:px-6 relative">
          <div className="mx-auto max-w-3xl text-center mb-6 md:mb-10">
            <h1 className="mb-4 md:mb-6 text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-[#222222]">
              Meet <span className="text-[#1D6D72]">BOB</span>
            </h1>
            <div className="mb-4 flex justify-center">
              <Image
                src="/baxus-bob-pfp.png"
                alt="BOB, your whisky expert"
                width={150}
                height={150}
                className="rounded-full border-2 border-[#1D6D72]"
                priority
              />
            </div>
            <p className="text-lg sm:text-xl text-neutral-800 px-4 sm:px-0 mb-6">
              Your personal whisky expert for exquisite recommendations
            </p>
          </div>

          <div className="mx-auto max-w-md px-2 sm:px-0">
            <UserSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-[#F8F6F1]">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
              <FeatureCard
                icon={
                  <GlassWater className="h-6 w-6 sm:h-8 sm:w-8 text-[#1D6D72]" />
                }
                title="Expert Curation"
                description="Deep knowledge of whisky profiles, distilleries, and flavor notes"
              />
              <FeatureCard
                icon={
                  <Droplet className="h-6 w-6 sm:h-8 sm:w-8 text-[#1D6D72]" />
                }
                title="Taste Analysis"
                description="Understand your preferences based on your collection"
              />
              <FeatureCard
                icon={
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-[#1D6D72]" />
                }
                title="Premium Recommendations"
                description="Discover rare bottles perfectly matched to your taste"
              />
              <FeatureCard
                icon={
                  <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-[#1D6D72]" />
                }
                title="Collection Insights"
                description="Gain valuable perspective on your whisky collection"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-[#1D6D72]/10 shadow-sm transition-all hover:border-[#1D6D72]/30">
      <div className="mb-3 sm:mb-4">{icon}</div>
      <h3 className="mb-1 sm:mb-2 text-base sm:text-lg font-medium text-[#1D6D72]">
        {title}
      </h3>
      <p className="text-xs sm:text-sm font-medium text-neutral-800">
        {description}
      </p>
    </div>
  );
}
