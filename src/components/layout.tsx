import { Container } from "@chakra-ui/react";
import React from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ pageTitle, children }) => {
  return (
    <>
      <Header pageTitle={pageTitle} />
      <Container maxW="container.md" paddingY={5} marginBottom="12">
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
