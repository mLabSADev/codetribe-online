const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({node, getNode, actions}) => {
    if (node.internal.type === 'MarkdownRemark') {
        const { createNodeField } = actions
        const fileNode = getNode(node.parent)
        const [basePath] = fileNode.relativePath.split('/')
        
        const slug = createFilePath({
            node,
            getNode,
            basePath
        })

        createNodeField({
            node,
            name: 'slug',
            value: slug,
        })
        createNodeField({
            node,
            name: 'type',
            value: basePath
        })
    }
}

exports.createPages = async ({graphql, actions}) => {
    const { createPage } = actions
    const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              type
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog.js`),
          context: {
              slug: node.fields.slug
          }
      })
  })
}