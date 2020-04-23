/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'ReactFire',
    author: {
      name: 'Melvin Musehani'
    },
    siteUrl: 'https://www.reactfire.com',
    social: {
      twitter: 'reactfire',
      facebook: 'reactfire'
    }
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'content',
        path: `${__dirname}/content/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {

            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`
  ],
}
