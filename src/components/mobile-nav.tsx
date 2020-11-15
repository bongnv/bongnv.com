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
      borderBottom: "1px solid",
      borderColor: "muted",
    }}
  >
    <Link
      to="/about/"
      sx={{
        variant: "textStyles.navLink",
        marginBottom: 3,
      }}
    >
      <span>About</span>
    </Link>
    <Link
      to="/blog/"
      sx={{
        variant: "textStyles.navLink",
      }}
    >
      <span>Blog</span>
    </Link>
  </Flex>
);

export default MobileNav;
