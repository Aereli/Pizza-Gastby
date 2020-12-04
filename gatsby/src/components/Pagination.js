import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const Pagination = ({ pageSize, totalCount, currentPage, skip, base}) => {

  const totalPages = Math.ceil(totalCount / pageSize)
  const prevPage = currentPage - 1
  const nextpage = currentPage + 1
  const hasNext = nextpage <= totalPages
  const hasPrev = prevPage >= 1
  return (
    <PaginationStyles>
      <Link disabled={!hasPrev} to={`${base}/${prevPage}`}> ← Prev </Link>
      {
        Array.from({ length: totalPages}).map((_, i) => 
          <Link 
            key={i}
            className={currentPage === 1 && i === 0 ? 'current' : ''} 
            to={`${base}/${i + 1}`}>{i + 1}
          </Link>
      )}
      <Link disabled={!hasNext} to={`${base}/${nextpage}`}> Next → </Link>
    </PaginationStyles>
  )
}

export default Pagination

const PaginationStyles = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  border: 1px solid var(--grey);
  border-radius: 5px;
  & > * {
    padding: 1rem;
    text-decoration: none;
    &[aria-current],
    &.current{ 
      color: var(--red);  
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`