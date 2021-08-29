import React, { FC, useRef, useState, useEffect } from "react";
import { Menu, X } from "react-feather";

import MobileNav from "./mobile-nav";
import ThemeSwitcher from "./theme-switcher";
import Nav from "./nav";

/** @jsx jsx */
import { jsx, Box, Flex, IconButton } from "theme-ui";

const Header: FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const onMenuClick = () => setMenuVisible(!menuVisible);
  const ref = useRef(null);

  useEffect(() => {
    if (menuVisible) {
      const eventHandler = (e: Event): void => {
        if (!ref || !ref.current || !ref.current.contains(e.target)) {
          setMenuVisible(false);
        }
      };

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
        paddingBottom: 2,
        borderBottom: "1px solid",
        borderColor: "muted",
      }}
      ref={ref}
    >
      <Flex
        sx={{
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
        <Nav />
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <ThemeSwitcher />
      </Flex>
      {menuVisible && <MobileNav />}
    </Box>
  );
};

export default Header;
