import React, { FC } from "react";
import { Linkedin, GitHub, Mail } from "react-feather";

import NavIcon from "./nav-icon";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import ThemeSwitcher from "./theme-switcher";
import NavLink from "./nav-link";

/** @jsx jsx */
import { jsx, Flex } from "theme-ui";

const MobileNav: FC = () => {
  const { links } = useSiteMetadata();

  return (
    <Flex
      as="nav"
      sx={{
        flexDirection: "column",
        paddingX: 3,
        borderBottom: "1px solid",
        borderBottomColor: "muted",
      }}
    >
      <NavLink to="/" mobile>
        About
      </NavLink>
      <NavLink to="/blog/" mobile>
        Blog
      </NavLink>
      <Flex
        sx={{
          borderTop: "1px solid",
          borderTopColor: "muted",
          paddingLeft: 2,
          paddingY: 3,
          marginTop: 3,
        }}
      >
        <NavIcon href={links.linkedin}>
          <Linkedin />
        </NavIcon>
        <NavIcon href={links.github}>
          <GitHub />
        </NavIcon>
        <NavIcon href={links.email}>
          <Mail />
        </NavIcon>
        <ThemeSwitcher />
      </Flex>
    </Flex>
  );
};

export default MobileNav;
