import {feedPlugin} from '@11ty/eleventy-plugin-rss';
import {url} from '../../_data/meta';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(feedPlugin, {
    type: 'atom', // or "rss", "json"
    outputPath: '/feed.xml',
    collection: {
      name: 'posts',
      limit: 15
    },
    metadata: {
      language: 'en',
      title: 'Kablamo.me',
      subtitle:
        'A personal blog on technology and software development. Or whatever other' +
        ' interesting projects I undertake that are worth sharing.',
      base: url(),
      author: {
        name: 'Rigoberto L. Perez'
      }
    }
  });
}
