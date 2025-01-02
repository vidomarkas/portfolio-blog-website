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
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      initialValue: false,
      description: 'Check this box to mark as featured work',
    },
    {
      name: 'gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'text',
              title: 'Alt Text',
              validation: (rule: Rule) => rule.required().error('Alt text is required'),
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      title: 'Gallery',
      description: 'Select 4 images',
      hidden: ({document}) => !document?.featured,
    },

    {
      title: 'Live URL',
      name: 'liveUrl',
      type: 'url',
    },
    {
      title: 'Source URL',
      name: 'sourceUrl',
      type: 'url',
    },
    {
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      fields: [
        {
          name: 'alt',
          type: 'text',
          title: 'Alt Text',
          description:
            'Provide a brief description of the featured image for accessibility and SEO.',
          validation: (rule: Rule) => rule.required().error('Alt text is required'),
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'aboutClientText',
      type: 'text',
      title: 'About Client (Max 200 characters)',
      validation: (rule: Rule) => rule.max(200).error('Max 200 characters'),
    },
    {
      name: 'type',
      type: 'string',
      title: 'Project type',
    },
    {
      name: 'industry',
      type: 'string',
      title: 'Industry',
      validation: (rule: Rule) => rule.required().error('Industry is required'),
    },
    {
      name: 'year',
      type: 'number',
      title: 'Year',
      validation: (rule: Rule) => rule.required().error('Year is required'),
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
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'technology'}]}],
    },
  ],
})
