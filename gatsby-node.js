/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

const buildPages = ({ edges, createPage }) => {
  const template = path.resolve("src/templates/page.tsx");
  edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: template,
      context: {
        id: node.id,
      },
    });
  });
};

const buildPosts = ({ edges, createPage }) => {
  const template = path.resolve("src/templates/post.tsx");
  edges.forEach(({ node }, i) => {
    const next =
      i === 0
        ? null
        : {
            slug: edges[i - 1].node.fields.slug,
            title: edges[i - 1].node.frontmatter.title,
          };
    const prev =
      i === edges.length - 1
        ? null
        : {
            slug: edges[i + 1].node.fields.slug,
            title: edges[i + 1].node.frontmatter.title,
          };
    createPage({
      path: node.fields.slug,
      component: template,
      context: {
        id: node.id,
        prev,
        next,
      },
    });
  });
};

const buildTagPages = ({ tags, createPage }) => {
  const tagTemplate = path.resolve("src/templates/tag.tsx");

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${tag.fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
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
            frontmatter {
              title
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

  buildPages({
    createPage,
    edges: result.data.pages.edges,
  });

  buildPosts({
    createPage,
    edges: result.data.posts.edges,
  });

  buildTagPages({
    createPage,
    tags: result.data.tagsGroup.group,
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
      value: isBlogPost ? `/blog${slug}` : slug,
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
