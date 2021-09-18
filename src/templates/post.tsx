import React, { FC } from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostMeta from "../components/post-meta";
import TagsMeta from "../components/tags-meta";
import StyledLink from "../components/styled-link";

/** @jsx jsx */
import { jsx, Box, Themed } from "theme-ui";

interface PostProps {
  pageContext: {
    next: {
      title: string;
      slug: string;
    };
    prev: {
      title: string;
      slug: string;
    };
  };
  data: {
    mdx: {
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        tags: Array<string>;
      };
      body: string;
      timeToRead: number;
    };
  };
}

const Post: FC<PostProps> = ({ data, pageContext: { next, prev } }) => {
  const post = data.mdx;
  const tags = post.frontmatter.tags;

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Themed.h1
        sx={{
          marginBottom: 3,
        }}
      >
        {post.frontmatter.title}
      </Themed.h1>
      <PostMeta date={post.frontmatter.date} timeToRead={post.timeToRead} />
      <Box
        as="section"
        sx={{
          marginY: 4,
        }}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
      </Box>
      <Box
        sx={{
          marginY: 4,
        }}
      >
        {tags && <TagsMeta tags={tags} />}
        {prev && (
          <Themed.p
            sx={{
              fontSize: 1,
              marginY: 1,
            }}
          >
            Previous: <StyledLink to={prev.slug}>{prev.title}</StyledLink>
          </Themed.p>
        )}
        {next && (
          <Themed.p
            sx={{
              fontSize: 1,
              marginY: 1,
            }}
          >
            Next: <StyledLink to={next.slug}>{next.title}</StyledLink>
          </Themed.p>
        )}
      </Box>
    </Layout>
  );
};

export default Post;

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        tags
      }
      timeToRead
      body
      excerpt
    }
  }
`;
