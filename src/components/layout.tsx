import React, { ReactNode, FC } from "react";

import Footer from "./footer";
import Header from "./header";

/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Flex
      sx={{
        minHeight: "screenHeight",
        maxWidth: "lg",
        padding: [3, 4],
        marginX: "auto",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        as="main"
        sx={{
          paddingTop: [4, 5],
        }}
      >
        {children}
      </Box>
      <div
        sx={{
          flexGrow: 1,
        }}
      />
      <Footer />
    </Flex>
  );
};

export default Layout;
