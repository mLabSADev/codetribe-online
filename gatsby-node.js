const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({node, getNode, actions}) => {
    if (node.internal.type === 'MarkdownRemark') {
        const { createNodeField } = actions
        const fileNode = getNode(node.parent)
        let parts = fileNode.relativePath.split('/')

        if (parts[0] === 'lessons') {
          basePath = ``
        } else {
          basePath = parts[0]
        }
        
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
            value: parts[0]
        })

        if (parts[0] === 'lessons') {
          createNodeField({
              node,
              name: 'tutorial',
              value: parts[1]
          })
        }
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
    if (node.fields.slug.indexOf('lessons') == 1) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/lesson.js`),
        context: {
            slug: node.fields.slug,
            type: 'lesson'
        }
      })
    } else {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog.js`),
        context: {
            slug: node.fields.slug
        }
      })
    }
      
  })
}