const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({node, getNode, actions}) => {
    if (node.internal.type === 'MarkdownRemark') {
        const { createNodeField } = actions
        const fileNode = getNode(node.parent)
        let parts = fileNode.relativePath.split('/')

        if (parts[0] === 'lessons' || parts[0] === 'webinars') {
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
          createNodeField({
            node,
            name: 'slug2',
            value: `/overview${slug}`,
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
              slug2
              type
            }
          }
        }
      }
    }
  `)

  createPage({
    path: `/verify-student/`,
    matchPath: '/verify-student/:id',
    component: path.resolve(`./src/templates/verify-student.js`),
    ownerNodeId: `123456`,
    // The context is passed as props to the component as well
    // as into the component's GraphQL query.
    context: {
      id: `123456`,
    },
  })

  createPage({
    path: `/course/`,
    matchPath: '/course/:id',
    component: path.resolve(`./src/templates/course.js`),
    ownerNodeId: `123455`,
    // The context is passed as props to the component as well
    // as into the component's GraphQL query.
    context: {
      id: `123455`,
    },
  })

  createPage({
    path: `/editor/`,
    matchPath: '/editor/:courseId/chapter/:chapterId/lesson/:lessonId',
    component: path.resolve(`./src/templates/create-edit-lesson.js`),
    ownerNodeId: `123454`,
    // The context is passed as props to the component as well
    // as into the component's GraphQL query.
    context: {
      id: `123454`,
    },
  })

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
      createPage({
        path: node.fields.slug2,
        component: path.resolve(`./src/templates/lesson-overview.js`),
        context: {
            slug: node.fields.slug2,
            type: 'lesson'
        }
      })
      
    } else if (node.fields.slug.indexOf('webinars') == 1) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/webinar.js`),
        context: {
            slug: node.fields.slug
        }
      })
    } else {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog.js`),
        context: {
            slug: node.fields.slug,
            type: 'webinar'
        }
      })
    }
      
  })
}