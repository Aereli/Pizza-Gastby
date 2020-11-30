import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import ToppingsFilter from '../components/ToppingsFilter'

const PizzasPage = ({ data }) => {
  const pizzas = data.pizzas.nodes
  return (
    <>
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