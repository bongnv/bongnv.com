import React, { FC } from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostItem from "../components/post-item";

import { Styled } from "theme-ui";

interface BlogIndexPageProps {
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
    </Layout>
  );
};

export default BlogIndexPage;

export const pageQuery = graphql`
  query {
    allMdx(
      filter: {
        fields: {
          sourceInstanceName: { eq: "posts" }
          isPublished: { eq: true }
        }
      }
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
            tags
          }
        }
      }
    }
  }
`;