import React, { FC, ReactNode } from "react";
import { Link } from "gatsby";
import { Linkedin, GitHub, Mail } from "react-feather";

import { useSiteMetadata } from "../hooks/use-site-metadata";
import ThemeSwitcher from "./theme-switcher";
import NavIcon from "./nav-icon";
import NavLink from "./nav-link";

/** @jsx jsx */
import { jsx, Box } from "theme-ui";

const Nav: FC = () => {
  const { links } = useSiteMetadata();

  return (
    <Box
      as="nav"
      sx={{
        display: ["none", "flex"],
        alignItems: "center",
      }}
    >
      <NavLink to="/">About</NavLink>
      <NavLink to="/blog/">Blog</NavLink>
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
    </Box>
  );
};

export default Nav;
