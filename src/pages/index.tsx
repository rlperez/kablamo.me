import * as React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import Seo from "../components/seo";

// markup
const IndexPage = ({ data }) => {
  return (
    <ChakraProvider>
      <Layout pageTitle={"Kablamo.me"}>
        <p>I'm making this by following the Gatsby Tutorial.</p>
        <Link to="/about">About</Link>
        <Container>
          <h3>Articles</h3>
          {data.allMdx.nodes.map((node) => (
            <article key={node.id}>
              <h2>
                <Link to={`/articles/${node.frontmatter.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </h2>
              <p>{node.excerpt}</p>
              <p>Posted: {node.frontmatter.date}</p>
            </article>
          ))}
        </Container>
      </Layout>
    </ChakraProvider>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
        excerpt
      }
    }
  }
`;

export const Head = () => <Seo title="Home Page" />;

export default IndexPage;
