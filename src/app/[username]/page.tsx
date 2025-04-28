import { Metadata } from 'next';
import { UserPageClient } from './user-page-client';

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
