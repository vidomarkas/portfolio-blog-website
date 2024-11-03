import {defineType} from 'sanity'
import {Rule} from 'sanity'

export const work = defineType({
  name: 'work',
  type: 'document',
  title: 'Work',
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
      title: 'Excerpt (Max 200 characters)',
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
})
