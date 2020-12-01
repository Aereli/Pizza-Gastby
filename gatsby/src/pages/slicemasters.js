import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const SlicemastersPage = ({ data }) => {
  const sliceMaster = data.sliceMaster.nodes
  return (
    <>
      <SliceMasterGrid>
        {sliceMaster.map(person => (
          <SliceMasterStyles>
            <Link to={`/slice-master/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>                
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </SliceMasterStyles>
        ))}
      </SliceMasterGrid>
    </>
  )
}

export default SlicemastersPage
 
export const query = graphql`
  query {
    sliceMaster: allSanityPerson {
      nodes {
        id
        name
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`

const SliceMasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`

const SliceMasterStyles = styled.div`
  a { 
    text-decoration: none
  }
  .gatsby-image-wrapper{
    height: 400px;
  }
  h2 {
    position: relative;
    margin-bottom: -2rem;
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    z-index: 2
  }
  .description {
    position: relative;
    margin: -6rem 2rem 2rem 2rem;
    padding: 1rem;
    transform: rotate(1deg);
    text-align: center;
    background: var(--yellow);
    z-index: 3;
  }
`