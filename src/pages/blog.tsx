import React, { FC } from "react";
import { graphql } from "gatsby";

// import PostList from "../components/post-list";
import Layout from "../components/layout";
import SEO from "../components/seo";

import { Container } from "theme-ui";

interface BlogIndexPageProps {
  data: {
    allMdx: {
      edges: Array<{
        node: {
          id: string;
        };
      }>;
    };
  };
}

const BlogIndexPage: FC<BlogIndexPageProps> = ({
  data,
}: BlogIndexPageProps) => {
  const title = "The blog of Bong";
  const description =
    "Hey! I write about my personal experiences and challenges here.";
  const edges = data.allMdx.edges;
  return (
    <Layout>
      <SEO title={description} />
      <Container
        as="main"
        sx={{
          maxWidth: "ms",
          fontFamily: "body",
        }}
      >
        {/* <PostList title={title} edges={edges} description={description} /> */}
      </Container>
    </Layout>
  );
};

export default BlogIndexPage;

export const pageQuery = graphql`
  query {
    allMdx(
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
          excerpt
          timeToRead
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
          }
        }
      }
    }
  }
`;
