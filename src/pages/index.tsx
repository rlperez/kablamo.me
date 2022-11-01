import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import Seo from "../components/seo";

// markup
const IndexPage = () => {
  return (
    <ChakraProvider>
      <Layout pageTitle={"Kablamo.me"}>
        <p>I'm making this by following the Gatsby Tutorial.</p>
        <Link to="/about">About</Link>
      </Layout>
    </ChakraProvider>
  );
};

export const Head = () => <Seo title="Home Page" />;

export default IndexPage;
