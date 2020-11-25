// https://www.sanity.io/docs/previews-list-views
export default {
  // computer name
  name: 'person',
  // visible title
  title: 'Slice Masters',
  type: 'document',
  icon: () => '👨🏻‍🍳',
  fields : [ 
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,    
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us a bit about this person'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};