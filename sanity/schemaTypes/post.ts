import {Rule} from 'sanity'

export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule: Rule) => rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule: Rule) => rule.required().error('Slug is required'),
    },
    {
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      validation: (rule: Rule) => rule.required().error('Image is required'),
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt | Meta description (Max 200 characters)',
      validation: (rule: Rule) => rule.max(200).error('Max 200 characters'),
    },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        {
          type: 'block',
        },
        {type: 'image', fields: [{type: 'text', name: 'alt', title: 'Alt'}]},
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    },
  ],
}
