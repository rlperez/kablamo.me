import { Container, Heading, Flex, Box, Image, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";

const Header = ({ pageTitle }) => {
  return (
    <header>
      <title>{pageTitle}</title>
      <meta name="description" content={pageTitle} />

      <Box bg="red.500" color="white">
        <Container maxW="container.md" paddingY={12}>
          <Link to="/">
            <Heading as="h1" size="2xl">
              {pageTitle}
            </Heading>
          </Link>
        </Container>
      </Box>
      <Container maxW="container.md" paddingY={12}>
        <Flex>
          <Image
            borderRadius="full"
            boxSize="50px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            marginRight={4}
          />
          <Box>
            <Text>
              Written by <b>Dicka Ismaji</b> who lives and work in Tokyo, Japan.
              He like to learn something new, check out on new tweet of him
            </Text>
          </Box>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
