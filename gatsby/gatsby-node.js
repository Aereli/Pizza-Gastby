import path from 'path'
import fetch from 'isomorphic-fetch'

async function turnPizzasIntoPages({ graphql, actions}) {
const pizzaTemplate = path.resolve('./src/templates/pizza-template.js') 
const { data } = await graphql(`
  query {
    pizzas:  allSanityPizza {
      nodes {
        name
        slug {
          current
        }
      }
    }
  }
`)
  data.pizzas.nodes.forEach((pizza) => {   
      actions.createPage({
        path: `pizza/${pizza.slug.current}`,
        component: pizzaTemplate,
        context: {
          slug: pizza.slug.current,
        }
    })
  })
}

async function turnToppingsIntoPages({ graphql, actions}) {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js') 
  const { data } = await graphql(`
    query { 
      toppings: allSanityTopping {
        nodes { 
          name
          id
        }
      }
    }
  `)
  data.toppings.nodes.forEach(topping => {
    actions.createPage({
      path: `/topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`
      }
    })
  })
}

async function turnSliceMastersIntoPages({ graphql, actions}) {
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `)
//single person template
data.slicemasters.nodes.forEach(person => {
  actions.createPage({
    path: `/slicemaster/${person.slug.current}`,
    component: path.resolve('./src/templates/person-template.js'),
    context: {
      name: person.name,
      slug: person.slug.current
    }
  })
})

//Pagination  
const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)
const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize)
  Array.from({length: pageCount}).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize: pageSize
      }
    })
  })
}

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest}){
  const res = await fetch('https://sampleapis.com/beers/api/ale')
  const beers = await res.json()

  beers.forEach(beer => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer', //this becomes the name of the query in graphql
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      }
    }
    actions.createNode({ ...beer, ...nodeMeta })
  })
}

export async function sourceNodes(params) {
  //fetch beers and source into gastby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)])
}

export async function createPages(params) {
  // runs all promises concurrently
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params)
  ]) 
}