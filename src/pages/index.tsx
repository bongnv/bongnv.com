import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostItem from "../components/post-item";
import Introduction from "../components/introduction.md";

/** @jsx jsx */
import { jsx, Flex, Themed } from "theme-ui";

interface IndexPageProps {
  data: {
    allMdx: {
      edges: Array<{
        node: {
          id: string;
          excerpt: string;
          frontmatter: {
            date: string;
            title: string;
            tags: Array<string>;
          };
          timeToRead: number;
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const edges = data.allMdx.edges;

  return (
    <Layout>
      <SEO title="Hi" />
      <Introduction />
      <Flex
        sx={{
          marginTop: 5,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Themed.h2>Latest Posts</Themed.h2>
        <Link
          sx={{
            variant: "styles.a",
            color: "text",
            textDecoration: "none",
          }}
          to="/blog/"
        >
          <span>Read all posts</span>
        </Link>
      </Flex>
      {edges.map(({ node }) => (
        <PostItem
          key={node.id}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          description={node.excerpt}
          timeToRead={node.timeToRead}
          slug={node.fields.slug}
          tags={node.frontmatter.tags}
        />
      ))}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMdx(
      filter: {
        fields: {
          sourceInstanceName: { eq: "posts" }
          isPublished: { eq: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
            tags
          }
        }
      }
    }
  }
`;
