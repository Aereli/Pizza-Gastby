// common JS modules use "module.exports = {}" 
// we are using ES Modules instead unlike the gastby docs . 

import dotenv from 'dotenv' 
dotenv.config({ path: '.env' })

export default {
  siteMetadata: {
    title: `Slick Slices`,
    siteUrl: `https://www.gatsbyjs.com`,
    description: `Awesome Example site template using Gatsby JS!` 
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-sanity`,
      options: { 
        projectId: `7nxqd9br`,
        dataset: `production`,
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
}