import React, { FC, ReactNode } from "react";
import { Link } from "gatsby";
import { Linkedin, GitHub, Mail } from "react-feather";

import { useSiteMetadata } from "../hooks/use-site-metadata";
import ThemeSwitcher from "./theme-switcher";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = (props) => (
  <Link
    {...props}
    activeClassName="active"
    sx={{
      marginRight: 4,
      textDecoration: "none",
      fontWeight: "heading",
      color: "text",
      "&.active": {
        color: "primary",
      },
      "&:hover": {
        color: "secondary",
      },
    }}
  >
    {props.children}
  </Link>
);

interface NavIconProps {
  href: string;
  children: ReactNode;
}

const NavIcon: FC<NavIconProps> = (props) => (
  <Styled.a
    {...props}
    sx={{
      marginRight: 3,
      color: "text",
      height: "24px",
    }}
  >
    {props.children}
  </Styled.a>
);

const Nav: FC = () => {
  const { links } = useSiteMetadata();

  return (
    <nav
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
      <ThemeSwitcher
        sx={{
          marginRight: 3,
        }}
      />
    </nav>
  );
};

export default Nav;
