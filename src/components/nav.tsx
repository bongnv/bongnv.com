import React, { FC } from "react";
import { Link } from "gatsby";

/** @jsx jsx */
import { jsx, Box } from "theme-ui";

const Nav: FC = () => (
  <Box
    as="nav"
    sx={{
      display: ["none", "block"],
    }}
  >
    <Link
      to="/about/"
      sx={{
        padding: 3,
        variant: "textStyles.navLink",
      }}
    >
      <span>About</span>
    </Link>
    <Link
      to="/blog/"
      sx={{
        padding: 3,
        variant: "textStyles.navLink",
      }}
    >
      <span>Blog</span>
    </Link>
  </Box>
);

export default Nav;
