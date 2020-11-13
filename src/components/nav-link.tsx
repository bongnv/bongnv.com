import React, { FC, ReactNode } from "react";
import { Link } from "gatsby";

/** @jsx jsx */
import { jsx } from "theme-ui";

interface NavLinkProps {
  to: string;
  children: ReactNode;
  mobile?: boolean;
}

const NavLink: FC<NavLinkProps> = ({ to, children, mobile }) => (
  <Link
    to={to}
    activeClassName="active"
    sx={{
      marginRight: mobile ? 0 : 4,
      marginLeft: mobile ? 2 : 0,
      marginTop: mobile ? 3 : 0,
      textDecoration: "none",
      fontWeight: "heading",
      color: "text",
      "&.active": {
        color: "primary",
      },
      "&:hover": {
        color: "secondary",
      },
    }}
  >
    {children}
  </Link>
);

export default NavLink;
