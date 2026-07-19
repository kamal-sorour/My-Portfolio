import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/links';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
      alternates: {
        languages: {
          en: `${SITE_URL}/en`,
          ar: `${SITE_URL}/ar`,
        },
      },
    },
    {
      url: `${SITE_URL}/ar`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${SITE_URL}/en`,
          ar: `${SITE_URL}/ar`,
        },
      },
    },
  ];

  return routes;
}
