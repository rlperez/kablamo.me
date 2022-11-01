import { Container } from "@chakra-ui/react";
import { Link, useStaticQuery, graphql } from "gatsby";
import React from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header pageTitle={data.site.siteMetadata.title} />
      <Container maxW="container.md" paddingY={5} marginBottom="12">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>,
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
