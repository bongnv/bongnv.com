import React, { ReactNode, FC } from "react";

import Footer from "./footer";
import Header from "./header";

/** @jsx jsx */
import { jsx, Flex } from "theme-ui";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Flex
        sx={{
          maxWidth: "xl",
          minHeight: "screenHeight",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: [5, 6],
          paddingX: 3,
          marginX: "auto",
        }}
      >
        {children}
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
