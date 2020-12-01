import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import SEO from './SEO'

function SinglePizza({ pizza }) {
  return (
    <>
      <PizzaStyles>
        <Link to={`/pizza/${pizza.slug.current}`}>
          <h2>
            <span className="mark">{pizza.name}</span>
          </h2>
        </Link>
        <p>{pizza.toppings.map(top => top.name).join(', ')}</p>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
      </PizzaStyles>
    </>
  )
}

const PizzaList = ({ pizzas }) => {
  return (
    <PizzaGridStyles>
      {pizzas.map(pizza => 
        <SinglePizza key={pizza.id} pizza={pizza}/>
      )}
    </PizzaGridStyles>
  )
}

export default PizzaList
  
  const PizzaGridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 4rem;
    grid-auto-rows: auto auto 500px;
  `
  
  const PizzaStyles = styled.div`
  @supports not(grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
    display: grid;
    grid-template-rows: var(--rows, subgrid);
    grid-row: span 3;
    grid-gap: 1rem;
    h2, p { margin: 0 };
  `