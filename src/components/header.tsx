import React, { FC, useState } from "react";
import { Link } from "gatsby";

import { useSiteMetadata } from "../hooks/use-site-metadata";
import Nav from "./nav";
import MenuBtn from "./menu-btn";
import MobileNav from "./mobile-nav";

/** @jsx jsx */
import { jsx, Box, Container } from "theme-ui";

const Header: FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { title } = useSiteMetadata();
  const onMenuClick = () => {
    setMenuVisible(!menuVisible);
  };

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
          <MenuBtn closed={!menuVisible} onClick={onMenuClick} />
        </Box>
      </Container>
      {menuVisible && <MobileNav />}
    </header>
  );
};

export default Header;
