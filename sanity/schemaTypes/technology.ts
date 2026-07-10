import {defineType} from 'sanity'

export const technology = defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  fields: [
    {name: 'name', title: 'Technology Name', type: 'string'},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}},
  ],
})
