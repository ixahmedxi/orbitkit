import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import { consts } from '../consts';

/** @param {import('astro').APIContext} context */
export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: consts.site.title,
    description: consts.site.description,
    site: context.site ?? '',
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
