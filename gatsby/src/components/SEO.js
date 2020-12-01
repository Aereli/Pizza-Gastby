import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

const SEO = ({ children, location, description, title, image }) => {
  
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description 
          siteUrl
        }
      }
    }
  `)
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* fav icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.svg" />
      {/* meta tags */}
      <meta name="viewport" content="width-device-width" />
      <meta charset="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {/* open graph */}
      {location && <meta  property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:site_name" content={site.siteMetadata.titel} key="ogsitename" />
      <meta property="og:description" content={description} key="ogdesc" />
      {/* //this children would overwrite anything passed via SEO */}
      {children}
    </Helmet>
  )
}

export default SEO

