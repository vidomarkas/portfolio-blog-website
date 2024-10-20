import {Rule} from 'sanity'

export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title of blog article',
      validation: (rule: Rule) => rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of your blog article',
      options: {
        source: 'title',
      },
      validation: (rule: Rule) => rule.required().error('Slug is required'),
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Title Image',
    },
    {
      name: 'publsihedAt',
      type: 'datetime',
      title: 'Published at',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small Description',
      validation: (rule: Rule) => rule.max(200).error('Max 200 characters'),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
        {type: 'image', fields: [{type: 'text', name: 'alt', title: 'Alt'}]},
      ],
    },
  ],
}
