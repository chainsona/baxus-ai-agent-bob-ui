import { Metadata } from 'next';
import { UserPageClient } from './user-page-client';
import { fetchUserProfile, fetchRecommendations } from '@/lib/api';

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
    // Fetch user profile data
    const profileData = await fetchUserProfile(username);

    // Validate user data and generate metadata if available
    if (profileData?.collection?.stats?.bottle_count > 0) {
      // Fetch recommendations
      const result = await fetchRecommendations(username);

      // Get the top recommendation bottle image if available
      // The API now returns 'similar' and 'diverse' arrays
      const topRecommendation = result.similar?.[0] || result.diverse?.[0];
      const topBottleImageUrl = topRecommendation?.image_url;

      // Create metadata with taste profile information
      const title = `${username}'s ${profileData.taste_profile.favorite_type} Collection | BAXUS AI Agent BOB`;
      const description = `${username}'s whisky collection featuring ${profileData.taste_profile.dominant_flavors.join(', ')} flavors. Personalized recommendations by BAXUS AI Agent BOB`;

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: 'profile',
          url: `${baseUrl}/${username}`,
          siteName: 'BAXUS',
          locale: 'en_US',
          images: topBottleImageUrl
            ? [
                {
                  url: topBottleImageUrl,
                  width: 800,
                  height: 600,
                  alt: `${username}'s top whisky recommendation`,
                },
              ]
            : [
                {
                  url: `${baseUrl}/baxus-BOB-og.png`,
                  width: 1200,
                  height: 630,
                  alt: `${username}'s whisky recommendations by BAXUS`,
                },
              ],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: topBottleImageUrl
            ? [topBottleImageUrl]
            : [`${baseUrl}/baxus-BOB-og.png`],
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
    description: 'Personalized whisky recommendations by BAXUS AI Agent BOB',
    openGraph: {
      title: `${username} | BAXUS Whisky Recommendations`,
      description: 'Personalized whisky recommendations by BAXUS AI Agent BOB',
      type: 'profile',
      url: `${baseUrl}/${username}`,
      siteName: 'BAXUS',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/baxus-BOB-og.png`,
          width: 1200,
          height: 630,
          alt: 'BAXUS - Meet BOB, Your Whisky Expert',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${username} | BAXUS Whisky Recommendations`,
      description: 'Personalized whisky recommendations by BAXUS AI Agent BOB',
      images: [`${baseUrl}/baxus-BOB-og.png`],
    },
  };
}

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;

  return <UserPageClient username={username} />;
}
