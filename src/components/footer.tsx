import React, { FC } from "react";
import { Linkedin, GitHub, Mail } from "react-feather";

import { useSiteMetadata } from "../hooks/use-site-metadata";

/** @jsx jsx */
import { jsx, Box, Flex, Styled } from "theme-ui";

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
      <Styled.p
        sx={{
          margin: 0,
        }}
      >
        {author} © 2016 - {new Date().getFullYear()}
      </Styled.p>
      <Box>
        <Styled.a
          target="_blank"
          rel="noopener noreferrer"
          href={links.linkedin}
          sx={{
            marginRight: 3,
            variant: "textStyles.navLink",
          }}
        >
          <Linkedin />
        </Styled.a>
        <Styled.a
          target="_blank"
          rel="noopener noreferrer"
          href={links.github}
          sx={{
            marginRight: 3,
            variant: "textStyles.navLink",
          }}
        >
          <GitHub />
        </Styled.a>
        <Styled.a
          href={links.email}
          sx={{
            variant: "textStyles.navLink",
          }}
        >
          <Mail />
        </Styled.a>
      </Box>
    </Flex>
  );
};

export default Footer;
