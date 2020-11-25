import PriceInput from '../components/PriceInput'

// https://www.sanity.io/docs/previews-list-views
export default {
  // computer name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon: () => '🍕',
  fields : [ 
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
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
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{type: 'reference', to: [{ type: 'topping'}] }]
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents', 
      validation: Rule => Rule.min(1000).max(50000),
      inputComponent: PriceInput,
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
  preview: {
    select: {
      title: 'name',
      media: 'image',
      toppings0: 'toppings.0.name',
      toppings1: 'toppings.1.name',
      toppings2: 'toppings.2.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      const tops = Object.values(toppings).filter(Boolean)
      return {
        title,
        media,
        subtitle: tops.join(', ')
      }
    }
  },
};