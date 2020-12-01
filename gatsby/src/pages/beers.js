import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import SEO from '../components/SEO'

const BeerPage = ({ data} ) => {
  const beers = data.beers.nodes
  return (
    <>
      <SEO title="Beers!" />
      <h2 className="cernter">{`We have ${beers.length} beers available!`}</h2>
      <BeerGridStyles>  
      {beers.map(beer => {
        const rating = Math.round(beer.rating.average)
        return (
          <SingleBeerStyle key={beer.id}>
            <h2>{beer.name}</h2>
            <img src={beer.image} alt={beer.name}></img>
            <p>{beer.price}</p>
            <p title={`${rating} out of 5 stars`}>
              {`⭐️`.repeat(rating)}
              <span style={{ filter: `grayscale(100%)`}}>
                {`⭐️`.repeat(5 - rating)}
              </span>
              <span>({beer.rating.reviews} reviews)</span>
            </p>
        </SingleBeerStyle>
      )})}
      </BeerGridStyles>
    </>
  )
}

export default BeerPage

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
  `

const SingleBeerStyle = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    min-height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 12px;
  }
`