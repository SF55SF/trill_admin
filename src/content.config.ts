import { defineCollection, z } from 'astro:content';

const offices = defineCollection({
  type: 'content',
  schema: z.object({
    published: z.boolean().default(true),
    order: z.number().default(1),
    pageSlug: z.string(),
    block: z.string().default('Trilliant'),
    floor: z.string(),
    area: z.number(),
    rentRate: z.number().default(0),
    workplaces: z.string(),
    ready: z.string(),
    officeLayout: z.string(),
    title: z.string(),
    detailTitle: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    imageAlt: z.string().default('Офис в бизнес-центре Trilliant, Ташкент'),
    intro: z.string(),
    features: z.array(z.string()).default([]),
    detailFeatures: z.array(z.string()).default([]),
    planImage: z.string(),
    mainImage: z.string(),
    gallery: z.array(z.string()).default([]),
    presentationFile: z.string().default('/files/placeholder-presentation-1.pdf'),
  }),
});

export const collections = { offices };
