/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'Codetribe',
    titleTemplate: 'Codetribe - %s',
    description: 'Best place to learn how to build Web & Mobile Apps with React',
    url: 'https://www.reactfire.com',
    siteUrl: 'https://www.reactfire.com',
    image: '/images/logo.png',
    twitterUsername: 'codetribe',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-164634745-1",
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `codetribe`
      }
    },
    `gatsby-plugin-react-helmet`,
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
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
            }
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          },
          `gatsby-remark-smartypants`
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Codetribe`,
        short_name: `Codetribe`,
        start_url: `/`,
        background_color: `#232222`,
        theme_color: `#97CA42`,
        display: `minimal-ui`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyCSvPQ3-fpuAYGljNEBCrWTVO-yO9tepaU",
          authDomain: "mlab-22bb9.firebaseapp.com",
          databaseURL: "https://mlab-22bb9.firebaseio.com",
          projectId: "mlab-22bb9",
          storageBucket: "mlab-22bb9.appspot.com",
          messagingSenderId: "479164571450",
          appId: "1:479164571450:web:d87d6b0dc20f31fb927a03"
        }
      }
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/tutorials/`, '/blog/', '/templates/', '/contact/'],
      },
    },
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`
  ],
}
