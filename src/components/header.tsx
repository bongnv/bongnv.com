import React, { FC } from "react";
import { Box, Container } from "theme-ui";
import { Link } from "gatsby";
// import { Menu, X } from "react-feather";

import { useSiteMetadata } from "../hooks/use-site-metadata";
import Nav from "./nav";

/** @jsx jsx */
import { jsx } from "theme-ui";

const Header: FC = () => {
  const { title } = useSiteMetadata();

  // const MenuBtn = Menu;

  return (
    <header
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 5,
        width: "screenWidth",
        backgroundColor: "background",
        fontFamily: "heading",
      }}
    >
      <Container
        sx={{
          maxWidth: "xl",
          paddingX: 3,
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid",
            borderBottomColor: "muted",
            paddingY: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            sx={{
              fontSize: [3, 4],
              textDecoration: "none",
              fontWeight: "heading",
              color: "text",
            }}
            to="/"
          >
            {title}
          </Link>
          <Nav />
          {/* <MenuBtn sx={{
            display: ["block", "none"],
          }} /> */}
        </Box>
      </Container>
    </header>
  );
};

export default Header;
