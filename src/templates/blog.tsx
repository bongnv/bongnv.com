import React, { FC } from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostItem from "../components/post-item";
import StyledLink from "../components/styled-link";

/** @jsx jsx */
import { jsx, Grid, Styled } from "theme-ui";

interface BlogIndexPageProps {
  pageContext: {
    prev?: string;
    next?: string;
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
  pageContext: { prev, next },
  data,
}: BlogIndexPageProps) => {
  const title = "Blog";
  const edges = data.allMdx.edges;

  return (
    <Layout>
      <SEO title={title} />
      <Styled.h1>{title}</Styled.h1>
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
      <Grid
        sx={{
          marginY: [4, 5],
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Styled.p>
          {prev && <StyledLink to={prev}>Older Posts</StyledLink>}
        </Styled.p>
        <Styled.p
          sx={{
            textAlign: "right",
          }}
        >
          {next && <StyledLink to={next}>Newer Posts</StyledLink>}
        </Styled.p>
      </Grid>
    </Layout>
  );
};

export default BlogIndexPage;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
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
