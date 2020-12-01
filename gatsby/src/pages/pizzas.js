import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import ToppingsFilter from '../components/ToppingsFilter'
import SEO from '../components/SEO'

const PizzasPage = ({ data, pageContext }) => {
  const pizzas = data.pizzas.nodes
  return (
    <>
      <SEO title={pageContext.topping ? `Pizzas with ${pageContext.topping}` : `All Pizzas`} />
      <ToppingsFilter />
      <PizzaList pizzas={pizzas}/>
    </>
  )
}

export default PizzasPage

export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
      pizzas: allSanityPizza(
      filter: {toppings: {elemMatch: {name: {regex: $toppingRegex } } } } 
    ) {
      nodes {
        name
        price
        id
        slug {
          current
        }
        toppings {
          name
          id
        }
        image {
          asset {
            fluid(maxWidth: 300) {
            ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`