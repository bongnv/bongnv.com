import React, { FC } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "theme-ui";

/** @jsx jsx */
import { jsx } from "theme-ui";

const Footer: FC = () => {
  const data = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          author
          links {
            source
          }
        }
      }
    }
  `);

  const meta = data.site.siteMetadata;

  return (
    <footer
      sx={{
        borderTop: "1px solid",
        borderTopColor: "muted",
        paddingY: 3,
      }}
    >
      <p
        sx={{
          font: "heading",
          textAlign: "center",
          margin: 0,
        }}
      >
        {meta.author} © 2016 - {new Date().getFullYear()} |{" "}
        <Link href={meta.links.source}>Source</Link>
      </p>
    </footer>
  );
};

export default Footer;
