import React, { FC } from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostItem from "../components/post-item";
import StyledLink from "../components/styled-link";

/** @jsx jsx */
import { jsx, Box, Flex, Styled } from "theme-ui";

interface BlogIndexPageProps {
  pageContext: {
    prevSlug?: string;
    nextSlug?: string;
  };
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

const BlogIndexPage: FC<BlogIndexPageProps> = ({
  pageContext: { prevSlug, nextSlug },
  data,
}: BlogIndexPageProps) => {
  const title = "Blog";
  const edges = data.allMdx.edges;

  return (
    <Layout>
      <SEO title={title} />
      <Styled.h1
        sx={{
          marginBottom: 4,
        }}
      >
        {title}
      </Styled.h1>
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
      <Flex
        sx={{
          marginY: 4,
          justifyContent: "space-between",
        }}
      >
        <Box>
          {prevSlug && <StyledLink to={prevSlug}>Older Posts</StyledLink>}
        </Box>
        <Box>
          {nextSlug && <StyledLink to={nextSlug}>Newer Posts</StyledLink>}
        </Box>
      </Flex>
    </Layout>
  );
};

export default BlogIndexPage;

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMdx(
      filter: {
        fields: {
          sourceInstanceName: { eq: "posts" }
          isPublished: { eq: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
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
