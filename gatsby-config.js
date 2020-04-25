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
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `reactfire`
      }
    },
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ReactFire`,
        short_name: `ReactFire`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00586d`,
        display: `minimal-ui`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`
  ],
}
