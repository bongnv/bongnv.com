import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author
            title
            links {
              email
              github
              linkedin
              source
            }
          }
        }
      }
    `,
  );

  return site.siteMetadata;
};
