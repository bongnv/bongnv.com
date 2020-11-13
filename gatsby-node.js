/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

const buildPages = ({ edges, createPage, template }) => {
  edges.forEach((edge) => {
    createPage({
      path: edge.node.fields.slug,
      component: template,
      context: {
        id: edge.node.id,
      },
    });
  });
};

// You can delete this file if you're not using it
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      pages: allMdx(
        filter: { fields: { sourceInstanceName: { eq: "pages" } } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
      posts: allMdx(
        filter: { fields: { sourceInstanceName: { eq: "posts" } } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  console.log("Pages", result.data.pages.edges);
  console.log("Posts", result.data.posts.edges);
  console.log("TagsGroup", result.data.tagsGroup.edges);

  buildPages({
    createPage,
    edges: result.data.pages.edges,
    template: path.resolve("src/templates/page.tsx"),
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const sourceInstanceName = getSourceInstanceName({ node, getNode });
    const isBlogPost = sourceInstanceName === "posts";
    const slug = createFilePath({ node, getNode });
    const isPublished =
      process.env.NODE_ENV !== "production" ||
      node.frontmatter.published ||
      false;

    createNodeField({
      name: "slug",
      node,
      value: isBlogPost ? `blog/${slug}` : slug,
    });

    createNodeField({
      name: "sourceInstanceName",
      node,
      value: sourceInstanceName,
    });

    createNodeField({
      name: "isPublished",
      node,
      value: isPublished,
    });
  }
};

function getSourceInstanceName({ node, getNode }) {
  const parentNode = getNode(node.parent);
  if (parentNode && parentNode.internal.type === `File`) {
    return parentNode.sourceInstanceName;
  }

  return "";
}
