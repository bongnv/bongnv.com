import React, { FC } from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostMeta from "../components/post-meta";

/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

interface PageProps {
  data: {
    mdx: {
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
      };
      body: string;
      timeToRead: number;
    };
  };
}

const Page: FC<PageProps> = ({ data }) => {
  const post = data.mdx;

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Styled.h1
        sx={{
          marginBottom: 3,
        }}
      >
        {post.frontmatter.title}
      </Styled.h1>
      <PostMeta date={post.frontmatter.date} timeToRead={post.timeToRead} />
      <Box
        as="section"
        sx={{
          marginTop: 4,
        }}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
      </Box>
    </Layout>
  );
};

export default Page;

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
      }
      timeToRead
      body
      excerpt
    }
  }
`;
