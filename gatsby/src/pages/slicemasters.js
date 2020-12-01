import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'

const SlicemastersPage = ({ data, pageContext }) => {
  const sliceMaster = data.slicemasters.nodes
  return (
    <>
    <SEO title={`Slice Masters - Page ${pageContext.currentPage || 1 }`} />
      <Pagination 
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)} 
        totalCount={data.slicemasters.totalCount} 
        currentPage={pageContext.currentPage || 1} 
        skip={pageContext.skip} 
        base="/slicemasters" 
      />
      <SliceMasterGrid>
        {sliceMaster.map(person => (
          <SliceMasterStyles>
            <Link to={`/slicemaster/${person.slug.current}`}>
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
  query($skip: Int = 0, $pageSize: Int = 3) {
    slicemasters: allSanityPerson (limit: $pageSize, skip: $skip){
      totalCount
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