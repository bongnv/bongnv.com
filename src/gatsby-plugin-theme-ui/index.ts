import swiss from "@theme-ui/preset-swiss";
import base from "@theme-ui/preset-base";
import { merge, Theme } from "theme-ui";

const theme: Theme = merge(base, {
  ...swiss,
  sizes: {
    sm: "640px",
    ms: "700px",
    md: "768px",
    xl: "1280px",
    screenHeight: "100vh",
    screenWidth: "100vw",
  },
  breakpoints: ["640px", "1280px"],
});

console.log("Theme", theme);

export default theme;
