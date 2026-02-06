import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    published: z.boolean().optional(),
    date: z.coerce.date(),
    image: z.string().optional(),
    author: z.string().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = { news };
