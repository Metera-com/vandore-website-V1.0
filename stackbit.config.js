import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
  stackbitVersion: '0.6.0',
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['_posts', '_properties'],
      models: ['BlogPost', 'Property'],
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'image',
        uploadDir: 'image',
        publicPath: '/image',
      },
    }),
  ],
  models: {
    BlogPost: {
      type: 'page',
      label: 'Blog Post',
      filePath: '_posts/{slug}.md',
      fields: [
        { type: 'string', name: 'title', label: 'Title', required: true },
        { type: 'slug', name: 'slug', label: 'Slug', required: true },
        { type: 'date', name: 'date', label: 'Date', required: true },
        { type: 'string', name: 'author', label: 'Author', default: 'Anonymous' },
        { type: 'image', name: 'image', label: 'Featured Image' },
        { type: 'markdown', name: 'body', label: 'Post Content', required: true },
      ],
    },
    Property: {
      type: 'page',
      label: 'Property',
      filePath: '_properties/{slug}.md',
      fields: [
        { type: 'string', name: 'title', label: 'Title', required: true },
        { type: 'slug', name: 'slug', label: 'Slug', required: true },
        { type: 'string', name: 'location', label: 'Location' },
        { type: 'string', name: 'price', label: 'Price (e.g., 569,000)' },
        { type: 'number', name: 'bedrooms', label: 'Bedrooms', subtype: 'integer' },
        { type: 'number', name: 'bathrooms', label: 'Bathrooms', subtype: 'integer' },
        { type: 'number', name: 'area', label: 'Area (sq.ft)', subtype: 'integer' },
        { type: 'number', name: 'floors', label: 'Floors', subtype: 'integer' },
        { type: 'boolean', name: 'featured', label: 'Featured Property', default: false },
        { type: 'image', name: 'main_image', label: 'Main Card Image' },
        { type: 'image', name: 'banner_image', label: 'Page Banner Image' },
        {
          type: 'list',
          name: 'gallery',
          label: 'Image Gallery',
          items: { type: 'image' },
        },
        {
          type: 'list',
          name: 'features',
          label: 'Additional Features',
          items: { type: 'string' },
        },
        { type: 'markdown', name: 'description', label: 'Property Description' },
      ],
    },
  },
});