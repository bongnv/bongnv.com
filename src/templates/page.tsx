import React, { FC } from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

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
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
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
