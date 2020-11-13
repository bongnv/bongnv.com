import React, { ReactNode, FC } from "react";
import { Container } from "theme-ui";

import Footer from "./footer";
import Header from "./header";

/** @jsx jsx */
import { jsx } from "theme-ui";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        sx={{
          maxWidth: "xl",
          minHeight: "screenHeight",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: [5, 6],
          paddingX: 3,
        }}
      >
        {children}
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
