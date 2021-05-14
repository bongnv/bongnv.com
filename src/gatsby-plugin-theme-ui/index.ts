const theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: { body: 400, heading: 700, display: 700 },
  lineHeights: { body: 1.5, heading: 1.25 },
  colors: {
    text: "hsl(10, 20%, 20%)",
    background: "hsl(10, 10%, 98%)",
    primary: "hsl(10, 80%, 50%)",
    secondary: "hsl(10, 60%, 50%)",
    highlight: "hsl(10, 40%, 90%)",
    purple: "hsl(250, 60%, 30%)",
    muted: "hsl(10, 20%, 94%)",
    gray: "hsl(10, 20%, 50%)",
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
  styles: {
    Container: { p: 3, maxWidth: 1024 },
    root: { fontFamily: "body", lineHeight: "body", fontWeight: "body" },
    h1: { variant: "textStyles.display" },
    h2: { variant: "textStyles.heading", fontSize: 5 },
    h3: { variant: "textStyles.heading", fontSize: 4 },
    h4: { variant: "textStyles.heading", fontSize: 3 },
    h5: { variant: "textStyles.heading", fontSize: 2 },
    h6: { variant: "textStyles.heading", fontSize: 1 },
    a: { color: "primary", "&:hover": { color: "secondary" } },
    pre: {
      variant: "prism",
      fontFamily: "monospace",
      fontSize: 1,
      p: 3,
      color: "text",
      bg: "muted",
      overflow: "auto",
      code: { color: "inherit" },
    },
    code: { fontFamily: "monospace", color: "secondary", fontSize: 1 },
    inlineCode: { fontFamily: "monospace", color: "secondary", bg: "muted" },
    table: {
      width: "100%",
      my: 4,
      borderCollapse: "separate",
      borderSpacing: 0,
      "th,td": {
        textAlign: "left",
        py: "4px",
        pr: "4px",
        pl: 0,
        borderColor: "muted",
        borderBottomStyle: "solid",
      },
    },
    th: { verticalAlign: "bottom", borderBottomWidth: "2px" },
    td: { verticalAlign: "top", borderBottomWidth: "1px" },
    hr: { border: 0, borderBottom: "1px solid", borderColor: "muted" },
    img: { maxWidth: "100%" },
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
    },
    display: {
      variant: "textStyles.heading",
      fontSize: [5, 6],
      fontWeight: "display",
      letterSpacing: "-0.03em",
      mt: 3,
    },
    subtitle: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 1,
    },
    navLink: {
      fontSize: 2,
      textDecoration: "none",
      fontWeight: "body",
      color: "text",
      "&:hover": {
        color: "secondary",
      },
    },
    postItemTitle: {
      fontSize: 3,
      color: "text",
      textDecoration: "none",
      variant: "textStyles.heading",
      "&:hover": {
        color: "secondary",
      },
    },
  },
  buttons: {
    navIcon: {
      "&:focus": {
        outline: "none",
      },
      "&:hover": {
        color: "secondary",
      },
    },
  },
  prism: {
    ".comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url": {
      color: "gray",
    },
    ".comment": { fontStyle: "italic" },
    ".property,.tag,.boolean,.number,.constant,.symbol,.deleted,.function,.class-name,.regex,.important,.variable":
      {
        color: "purple",
      },
    ".atrule,.attr-value,.keyword": { color: "primary" },
    ".selector,.attr-name,.string,.char,.builtin,.inserted": {
      color: "secondary",
    },
  },
  sizes: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    screenHeight: "100vh",
    screenWidth: "100vw",
  },
  breakpoints: ["640px", "1280px"],
};

export default theme;
