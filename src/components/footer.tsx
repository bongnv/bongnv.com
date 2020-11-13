import React, { FC } from "react";

import { useSiteMetadata } from "../hooks/use-site-metadata";

/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

const Footer: FC = () => {
  const { author, links } = useSiteMetadata();

  return (
    <Box
      as="footer"
      sx={{
        borderTop: "1px solid",
        borderTopColor: "muted",
        paddingY: 3,
      }}
    >
      <p
        sx={{
          textAlign: "center",
          margin: 0,
        }}
      >
        {author} © 2016 - {new Date().getFullYear()} |{" "}
        <Styled.a href={links.source}>Source</Styled.a>
      </p>
    </Box>
  );
};

export default Footer;
