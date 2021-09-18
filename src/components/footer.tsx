import React, { FC } from "react";
import { Linkedin, GitHub, Mail } from "react-feather";

import { useSiteMetadata } from "../hooks/use-site-metadata";

/** @jsx jsx */
import { jsx, Box, Flex, Themed } from "theme-ui";

const Footer: FC = () => {
  const { author, links } = useSiteMetadata();

  return (
    <Flex
      as="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "muted",
        paddingTop: 3,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: ["column-reverse", "row"],
      }}
    >
      <Themed.p
        sx={{
          margin: 0,
        }}
      >
        {author} © 2016 - {new Date().getFullYear()}
      </Themed.p>
      <Box>
        <Themed.a
          target="_blank"
          rel="noopener noreferrer"
          href={links.linkedin}
          sx={{
            marginRight: 3,
            variant: "textStyles.navLink",
          }}
        >
          <Linkedin />
        </Themed.a>
        <Themed.a
          target="_blank"
          rel="noopener noreferrer"
          href={links.github}
          sx={{
            marginRight: 3,
            variant: "textStyles.navLink",
          }}
        >
          <GitHub />
        </Themed.a>
        <Themed.a
          href={links.email}
          sx={{
            variant: "textStyles.navLink",
          }}
        >
          <Mail />
        </Themed.a>
      </Box>
    </Flex>
  );
};

export default Footer;
