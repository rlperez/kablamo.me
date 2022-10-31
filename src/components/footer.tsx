import { Box, Container } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Box bg="red.500" color="white" paddingY={4}>
        <Container maxW="container.md">
          All right reserved - Rigoberto L. Perez
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
