import type { MetadataRoute } from 'next'

const BASE = 'https://settlementcalculators.app'

const STATE_SLUGS = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california',
  'colorado', 'connecticut', 'delaware', 'florida', 'georgia',
  'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
  'kansas', 'kentucky', 'louisiana', 'maine', 'maryland',
  'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri',
  'montana', 'nebraska', 'nevada', 'new-hampshire', 'new-jersey',
  'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio',
  'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina',
  'south-dakota', 'tennessee', 'texas', 'utah', 'vermont',
  'virginia', 'washington', 'west-virginia', 'wisconsin', 'wyoming',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const piPages: MetadataRoute.Sitemap = STATE_SLUGS.map(slug => ({
    url: `${BASE}/${slug}-personal-injury-settlement`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const caPages: MetadataRoute.Sitemap = STATE_SLUGS.map(slug => ({
    url: `${BASE}/${slug}-car-accident-settlement`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const wcPages: MetadataRoute.Sitemap = STATE_SLUGS.map(slug => ({
    url: `${BASE}/${slug}-workers-comp-calculator`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const sfPages: MetadataRoute.Sitemap = STATE_SLUGS.map(slug => ({
    url: `${BASE}/${slug}-slip-fall-settlement`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE,                                     lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/car-accident`,                   lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/slip-fall`,                      lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/workers-comp`,                   lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/medical-malpractice`,            lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/dog-bite`,                       lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/wrongful-termination`,           lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/divorce-settlement`,             lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/debt-settlement`,                lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...piPages,
    ...caPages,
    ...wcPages,
    ...sfPages,
    { url: `${BASE}/about`,                          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
