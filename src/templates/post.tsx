import React, { FC } from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Container } from "theme-ui";

import Layout from "../components/layout";
import SEO from "../components/seo";
import TOC from "../components/toc";

/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

interface PageProps {
  data: {
    mdx: {
      excerpt: string;
      frontmatter: {
        title: string;
      };
      body: string;
      tableOfContents: {
        items: Array<{
          url: string;
          title: string;
          items: Array<{
            url: string;
            title: string;
          }>;
        }>;
      };
    };
  };
}

const Page: FC<PageProps> = ({ data }) => {
  const post = data.mdx;
  const headings = post.tableOfContents ? post.tableOfContents.items : [];
  const showTOC = headings && headings.length > 0;

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {showTOC && (
          <Box
            sx={{
              width: "280px",
              display: ["none", "none", "block"],
            }}
          />
        )}
        <Container
          sx={{
            maxWidth: "ms",
            fontFamily: "body",
          }}
        >
          <Styled.h1>{post.frontmatter.title}</Styled.h1>
          <MDXRenderer>{post.body}</MDXRenderer>
        </Container>
        {showTOC && (
          <Box
            as="aside"
            sx={{
              width: "280px",
              display: ["none", "none", "block"],
            }}
          >
            <TOC items={headings} />
          </Box>
        )}
      </Container>
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
      excerpt
      tableOfContents(maxDepth: 3)
    }
  }
`;
