import React, { FC } from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/layout";
import SEO from "../components/seo";

/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

interface PageProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
      };
      body: string;
    };
  };
}

const Page: FC<PageProps> = ({ data }) => {
  const post = data.mdx;
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <Styled.h1>{post.frontmatter.title}</Styled.h1>
      <Box
        as="section"
        sx={{
          marginY: 4,
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
      }
      body
    }
  }
`;
