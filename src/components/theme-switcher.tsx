import React, { FC } from "react";
import { Moon, Sun } from "react-feather";

/** @jsx jsx */
import { jsx, Box, useColorMode } from "theme-ui";

const ThemeSwitcher: FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  const onClick = () => {
    setColorMode(colorMode === "default" ? "dark" : "default");
  };

  return (
    <Box
      as="button"
      bg="background"
      color="text"
      onClick={onClick}
      sx={{
        border: "none",
        padding: "0px",
        height: "24px",
        "&:focus": {
          outline: "none",
        },
        "&:hover": {
          color: "secondary",
        },
      }}
    >
      {colorMode === "default" ? <Sun /> : <Moon />}
    </Box>
  );
};

export default ThemeSwitcher;
