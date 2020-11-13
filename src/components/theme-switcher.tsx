import React, { FC } from "react";
import { Moon, Sun } from "react-feather";

/** @jsx jsx */
import { jsx, IconButton, useColorMode } from "theme-ui";

const ThemeSwitcher: FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  const onClick = () => {
    setColorMode(colorMode === "default" ? "dark" : "default");
  };

  return (
    <IconButton
      size={24}
      onClick={onClick}
      sx={{
        padding: "0px",
        "&:focus": {
          outline: "none",
        },
        "&:hover": {
          color: "secondary",
        },
      }}
    >
      {colorMode === "default" ? <Sun /> : <Moon />}
    </IconButton>
  );
};

export default ThemeSwitcher;
