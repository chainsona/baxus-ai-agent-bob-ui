import { Metadata } from 'next';
import { UserPageClient } from './user-page-client';
import { fetchUserBar, loadBottleDataset } from '@/lib/api';
import { generateRecommendations } from '@/lib/recommendation-engine';

type Params = Promise<{
  username: string;
}>;

interface PageProps {
  params: Params;
  searchParams?: Promise<Record<string, string | string[]>>;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { username } = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000');

  try {
    // Fetch user bar data
    const userData = await fetchUserBar(username);

    // Validate user data and fetch bottles if available
    if (userData?.bottles?.length > 0) {
      const bottles = await loadBottleDataset();
      const result = await generateRecommendations(userData, bottles);

      // Get the top recommendation bottle image if available
      const topRecommendation = result.recommendations[0];
      const topBottleImageUrl = topRecommendation?.bottle?.image_url;

      const title = `${username}'s Whisky Recommendations | BAXUS`;
      const description = `Personalized whisky recommendations for ${username} by BAXUS AI Agent Bob`;

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: 'profile',
          images: topBottleImageUrl
            ? [
                {
                  url: topBottleImageUrl,
                  width: 800,
                  height: 600,
                  alt: `${username}'s top whisky recommendation`,
                },
              ]
            : [`${baseUrl}/baxus-bob-og.png`],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: topBottleImageUrl
            ? [topBottleImageUrl]
            : [`${baseUrl}/baxus-bob-og.png`],
        },
      };
    }
  } catch (error) {
    // Fall back to default metadata
    console.error('Error generating metadata:', error);
  }

  // Default metadata if user data can't be fetched or has no bottles
  return {
    title: `${username} | BAXUS Whisky Recommendations`,
    description: 'Personalized whisky recommendations by BAXUS AI Agent Bob',
    openGraph: {
      images: ['/baxus-bob-og.png'],
    },
    twitter: {
      images: ['/baxus-bob-og.png'],
    },
  };
}

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;

  return <UserPageClient username={username} />;
}
