import React, { FC } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Themed } from "theme-ui";

const NotFoundPage: FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Themed.h1>Not Found</Themed.h1>
    <Themed.p>
      You just hit a route that doesn&#39;t exist... the sadness.
    </Themed.p>
  </Layout>
);

export default NotFoundPage;
