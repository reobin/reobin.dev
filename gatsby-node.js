const path = require(`path`);
const fetch = require(`node-fetch`);
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

  const blogPostTemplate = path.resolve(`./src/templates/blogPost/index.jsx`);
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      stargazersCount: Int
    }
  `;
  createTypes(typeDefs);
};

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });

    if (node.fileAbsolutePath.match(/(projects)\/.*.md$/)) {
      try {
        const githubURL = `https://api.github.com/repos/reobin/${node.frontmatter.name}`;
        const response = await fetch(githubURL);
        const data = await response.json();
        const stargazersCount = data.stargazers_count;
        if (stargazersCount) node.frontmatter.stargazersCount = stargazersCount;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
