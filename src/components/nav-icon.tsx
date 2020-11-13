import React, { FC, ReactNode } from "react";

/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

interface NavIconProps {
  href: string;
  children: ReactNode;
}

const NavIcon: FC<NavIconProps> = ({ href, children }) => (
  <Styled.a
    href={href}
    sx={{
      appearance: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 3,
      color: "text",
      width: "24px",
      height: "24px",
    }}
  >
    {children}
  </Styled.a>
);

export default NavIcon;
