/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from "react";
import { Helmet } from "react-helmet";

import { useSiteMetadata } from "../hooks/use-site-metadata";

interface SEOProps {
  description?: string;
  title: string;
  lang?: string;
  meta?: Array<
    { name: string; content: string } | { property: string; content: string }
  >;
}

const SEO: FC<SEOProps> = ({
  description,
  lang = "en",
  meta = [],
  title,
}: SEOProps) => {
  const siteMeta = useSiteMetadata();

  const metaDescription: string = description || siteMeta.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s - ${siteMeta.title}`}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: siteMeta.author as string,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
      ].concat(meta)}
    ></Helmet>
  );
};

export default SEO;
