import path from 'path'
import fetch from 'isomorphic-fetch'

async function turnPizzasIntoPages({ graphql, actions}) {
const { createPage } = actions
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
      createPage({
        path: `pizza/${pizza.slug.current}`,
        component: pizzaTemplate,
        context: {
          slug: pizza.slug.current,
        }
    })
  })
}

async function turnToppingsIntoPages({ graphql, actions}) {
  const { createPage } = actions
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
    createPage({
      path: `/topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`
      }
    })
  })
}

// async function turnSliceMastersIntoPages({ grapqhl , actions})
  
// const sliceMasterTemplate = path.resolve('.src/templates/slice-master-template.js')
// const { data } = await graphql(`
//   query { 
//     toppings: allSanityTopping {
//       nodes { 
//         name
//         id
//       }
//     }
//   }
// `)


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
    turnToppingsIntoPages(params)
  ]) 
}