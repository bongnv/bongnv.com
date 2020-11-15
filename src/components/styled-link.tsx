import React from "react";
import { Link } from "gatsby";

/** @jsx jsx */
import { jsx } from "theme-ui";

interface StyledLink {
  to: string;
  children: React.ReactNode;
}

const StyledLink: React.FC<StyledLink> = ({ to, children }) => (
  <Link
    sx={{
      variant: "styles.a",
    }}
    to={to}
  >
    {children}
  </Link>
);

export default StyledLink;
