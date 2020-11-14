import React, { FC } from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/layout";
import SEO from "../components/seo";
import TOC from "../components/toc";
import PostMeta from "../components/post-meta";

/** @jsx jsx */
import { jsx, Box, Flex, Styled } from "theme-ui";

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
      <Flex
        sx={{
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
        <Box
          as="main"
          sx={{
            maxWidth: "ms",
            fontFamily: "body",
          }}
        >
          <Styled.h1
            sx={{
              marginBottom: 3,
            }}
          >
            {post.frontmatter.title}
          </Styled.h1>
          <PostMeta date={post.frontmatter.date} timeToRead={post.timeToRead} />
          <Box
            as="article"
            sx={{
              marginTop: 4,
            }}
          >
            <MDXRenderer>{post.body}</MDXRenderer>
          </Box>
        </Box>
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
      </Flex>
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
      tableOfContents(maxDepth: 3)
    }
  }
`;
