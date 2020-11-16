/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);
const PAGE_SIZE = 5;

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

const buildPaginatedPages = ({ createPage, totalCount, prefix, template }) => {
  const numPages = Math.ceil(totalCount / PAGE_SIZE);
  const getPath = (page) => (page === 1 ? `${prefix}` : `${prefix}${page}`);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: getPath(i + 1),
      component: template,
      context: {
        limit: PAGE_SIZE,
        skip: i * PAGE_SIZE,
        next: i === 0 ? null : getPath(i),
        prev: i == numPages - 1 ? null : getPath(i + 2),
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
        filter: {
          fields: {
            sourceInstanceName: { eq: "posts" }
            isPublished: { eq: true }
          }
        }
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
        totalCount
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

  buildPaginatedPages({
    createPage,
    totalCount: result.data.posts.totalCount,
    prefix: "/blog/",
    template: path.resolve("src/templates/blog.tsx"),
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
