import React, { FC } from "react";
import { Link } from "theme-ui";

import { useSiteMetadata } from "../hooks/use-site-metadata";

/** @jsx jsx */
import { jsx } from "theme-ui";

const Footer: FC = () => {
  const { author, links } = useSiteMetadata();

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
        {author} © 2016 - {new Date().getFullYear()} |{" "}
        <Link href={links.source}>Source</Link>
      </p>
    </footer>
  );
};

export default Footer;
