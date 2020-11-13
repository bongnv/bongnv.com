import React, { ReactNode, FC } from "react";
import { Container } from "theme-ui";

/** @jsx jsx */
import { jsx } from "theme-ui";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
