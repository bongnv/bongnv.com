import React, { FC } from "react";
import { Box, Container } from "theme-ui";

/** @jsx jsx */
import { jsx } from "theme-ui";

const Header: FC = () => {
  return (
    <header
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 5,
        width: "screenWidth",
        backgroundColor: "background",
        font: "heading",
      }}
    >
      <Container
        sx={{
          maxWidth: "xl",
          paddingX: 3,
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid",
            borderBottomColor: "muted",
            paddingY: 2,
          }}
        >
          <p>This is a header</p>
        </Box>
      </Container>
    </header>
  );
};

export default Header;
