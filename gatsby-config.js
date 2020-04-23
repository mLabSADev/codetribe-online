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
    `gatsby-plugin-netlify-cms`
  ],
}
