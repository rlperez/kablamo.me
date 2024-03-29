import { Link } from "gatsby";
import React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const About = () => {
  return (
    <Layout pageTitle="About Me">
      <p>
        Hi there! I'm the proud creator of this site, which I built with Gatsby.
      </p>
      <Link to="/">Back to home</Link>
    </Layout>
  );
};

export const Head = () => <Seo title="About Me" />;

export default About;
