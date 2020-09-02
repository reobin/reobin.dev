const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(
    `
      {
        blogPosts: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(blog)/.*.md$/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
        projects: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(projects)/.*.md$/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              name
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`./src/templates/blogPost.jsx`);
  createCollectionPages(
    result.data.blogPosts.nodes,
    blogPostTemplate,
    createPage,
  );

  const projectTemplate = path.resolve(`./src/templates/project/index.jsx`);
  createCollectionPages(
    result.data.projects.nodes,
    projectTemplate,
    createPage,
  );
};

const createCollectionPages = (collection, template, createPage) => {
  collection.forEach((item, index) => {
    const previous =
      index === collection.length - 1 ? null : collection[index + 1];
    const next = index === 0 ? null : collection[index - 1];

    createPage({
      path: item.fields.slug,
      component: template,
      context: {
        slug: item.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
