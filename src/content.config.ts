import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      updatedDate: z.coerce.date().optional(),
    }),
});

export const collections = { blog };
