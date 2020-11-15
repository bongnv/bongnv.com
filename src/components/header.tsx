import React, { FC, useState, useEffect } from "react";
import { Link } from "gatsby";
import { Menu, X } from "react-feather";

import { useSiteMetadata } from "../hooks/use-site-metadata";
import MobileNav from "./mobile-nav";
import ThemeSwitcher from "./theme-switcher";
import Nav from "./nav";

/** @jsx jsx */
import { jsx, Box, Flex, IconButton } from "theme-ui";

const Header: FC = () => {
  const { title } = useSiteMetadata();

  const [menuVisible, setMenuVisible] = useState(false);
  const onMenuClick = () => setMenuVisible(!menuVisible);

  useEffect(() => {
    if (menuVisible) {
      const eventHandler = (): void => setMenuVisible(false);
      window.addEventListener("click", eventHandler);
      window.addEventListener("scroll", eventHandler);

      return (): void => {
        window.removeEventListener("click", eventHandler);
        window.removeEventListener("scroll", eventHandler);
      };
    }
  }, [menuVisible]);

  return (
    <Box
      as="header"
      sx={{
        marginBottom: 3,
      }}
    >
      <Flex
        sx={{
          paddingBottom: 3,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          title="Menu"
          aria-label="Toggle Menu"
          sx={{
            marginRight: 3,
            variant: "buttons.navIcon",
            display: ["block", "none"],
          }}
          onClick={onMenuClick}
        >
          {menuVisible ? <X /> : <Menu />}
        </IconButton>
        <Link
          sx={{
            fontSize: [3, 4],
            textDecoration: "none",
            fontWeight: "heading",
            color: "text",
          }}
          to="/"
        >
          <span>{title}</span>
        </Link>
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <Nav />
        <ThemeSwitcher />
      </Flex>
      {menuVisible && <MobileNav />}
    </Box>
  );
};

export default Header;
