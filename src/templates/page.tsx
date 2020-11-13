import React, { FC } from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Container } from "theme-ui";

import Layout from "../components/layout";

/** @jsx jsx */
import { jsx } from "theme-ui";

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
  return (
    <Layout>
      <Container
        sx={{
          maxWidth: "ms",
          fontFamily: "body",
        }}
      >
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
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
    }
  }
`;
