import swiss from "@theme-ui/preset-swiss";
import base from "@theme-ui/preset-base";
import { merge, Theme } from "theme-ui";

const theme: Theme = merge(base, {
  ...swiss,
  colors: {
    ...swiss.colors,
    modes: {
      dark: {
        text: "hsl(210, 50%, 96%)",
        background: "hsl(230, 25%, 18%)",
        primary: "hsl(260, 100%, 80%)",
        secondary: "hsl(290, 100%, 80%)",
        highlight: "hsl(260, 20%, 40%)",
        purple: "hsl(290, 100%, 80%)",
        muted: "hsla(230, 20%, 0%, 20%)",
        gray: "hsl(210, 50%, 60%)",
      },
    },
  },
  sizes: {
    sm: "640px",
    ms: "700px",
    md: "768px",
    xl: "1280px",
    screenHeight: "100vh",
    screenWidth: "100vw",
  },
  breakpoints: ["640px", "1280px"],
  textStyles: {
    ...swiss.textStyles,
    subtitle: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 1,
    },
  },
});

console.log("Theme", theme);

export default theme;
