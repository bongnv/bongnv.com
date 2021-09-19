import React, { FC, useRef, useState, useEffect } from "react";

import ThemeSwitcher from "./theme-switcher";
import Nav from "./nav";

/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";

const Header: FC = () => (
  <Box
    as="header"
    sx={{
      marginBottom: 3,
      paddingBottom: 2,
      borderBottom: "1px solid",
      borderColor: "muted",
    }}
  >
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Nav />
      <ThemeSwitcher />
    </Flex>
  </Box>
);

export default Header;
