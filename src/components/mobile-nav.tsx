import React, { FC } from "react";
import { Link } from "gatsby";

/** @jsx jsx */
import { jsx, Flex } from "theme-ui";

const MobileNav: FC = () => (
  <Flex
    as="nav"
    sx={{
      flexDirection: "column",
      paddingX: 3,
      paddingBottom: 3,
    }}
  >
    <Link
      to="/"
      sx={{
        variant: "textStyles.navLink",
        marginBottom: 3,
      }}
    >
      <span>Home</span>
    </Link>
    <Link
      to="/blog/"
      sx={{
        variant: "textStyles.navLink",
        marginBottom: 3,
      }}
    >
      <span>Blog</span>
    </Link>
    <Link
      to="/about/"
      sx={{
        variant: "textStyles.navLink",
      }}
    >
      <span>About</span>
    </Link>
  </Flex>
);

export default MobileNav;
