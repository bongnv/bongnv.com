module.exports = {
  siteMetadata: {
    title: "Bong",
    description: "The blog of Bong.",
    author: "Bong Nguyen",
    links: {
      linkedin: "https://linkedin.com/in/bongnv",
      github: "https://github.com/bongnv",
      source: "https://github.com/bongnv/gatsby-mdx-blog",
      email: "mailto:vanbong@gmail.com",
    },
    siteUrl: "https://bongnv.com",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/pages`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        // defaultLayouts: {},
        // remarkPlugins: [],
        rehypePlugins: [
          require("rehype-slug"),
          require("@mapbox/rehype-prism"),
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 650,
              withWebp: true,
            },
          },
          "gatsby-remark-copy-linked-files",
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-theme-ui",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-11696168-2",
      },
    },
    "gatsby-plugin-sitemap",
    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     name: "gatsby-starter-default",
    //     short_name: "starter",
    //     start_url: "/",
    //     background_color: "#663399",
    //     theme_color: "#663399",
    //     display: "minimal-ui",
    //     icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // "gatsby-plugin-offline",
  ],
};
