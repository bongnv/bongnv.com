import React, { FC } from "react";
import { Link } from "gatsby";

/** @jsx jsx */
import { jsx, Box } from "theme-ui";

const Nav: FC = () => (
  <Box as="nav">
    <Link
      sx={{
        paddingRight: [2, 3],
        variant: "textStyles.navLink",
      }}
      to="/"
    >
      <span>Home</span>
    </Link>
    <Link
      to="/blog/"
      sx={{
        padding: [2, 3],
        variant: "textStyles.navLink",
      }}
    >
      <span>Blog</span>
    </Link>
    <Link
      to="/about/"
      sx={{
        padding: [2, 3],
        variant: "textStyles.navLink",
      }}
    >
      <span>About</span>
    </Link>
  </Box>
);

export default Nav;
