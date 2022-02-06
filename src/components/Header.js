import React from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { useAuth } from "../utils/auth";

const Header = () => {
  const auth = useAuth();
  return (
    <Box
      bg="teal"
      mb={4}
      w="100%"
      p={4}
      display="flex"
      alignContent="center"
      justifyContent="space-between"
      color="white"
    >
      <Heading as="h3" size="lg">
        Employee Portal
      </Heading>
      {auth?.user && (
        <Button
          variant="outline"
          colorScheme="white"
          onClick={() => auth.logout()}
        >
          Logout
        </Button>
      )}
    </Box>
  );
};

export default Header;
