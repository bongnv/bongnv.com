declare module "@theme-ui/preset-swiss" {
  import { Theme } from "theme-ui";

  const preset: Theme;

  export = preset;
}

declare module "@theme-ui/preset-base" {
  import { Theme } from "theme-ui";

  const preset: Theme;

  export = preset;
}

declare module "*.md" {
  const value: any;
  export default value;
}
