import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Button,
  Divider,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { getEmployeeDetails } from "../services/Employee";
import { useApiQuery } from "../hooks/useApiQuery";

function EmployeeDetails() {
  const params = useParams();
  const { isLoading, data: employeeDetails } = useApiQuery({
    queryKey: ["get-employee-details", params?.id],
    serviceFunction: () => getEmployeeDetails(params?.id),
    onError: () => {},
  });
  if (isLoading) {
    return <p>Loading .....</p>;
  }
  return (
    <Box w="100%">
      <Box
        mb={4}
        w="100%"
        display="flex"
        alignContent="center"
        justifyContent="space-between"
      >
        <Heading as="h2" size="lg">
          Employee Details
        </Heading>
        <Link to="/employee">
          <Button variant="outline" colorScheme="teal">
            Back
          </Button>
        </Link>
      </Box>
      <Divider mb={4} />
      <Box p={4} borderWidth="2px" borderRadius="lg">
        {employeeDetails ? (
          <List spacing={3}>
            <ListItem>
              <Text fontSize="xl">
                Employee ID: {employeeDetails?.employeeId}{" "}
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="xl">Name: {employeeDetails?.name} </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="xl">Email: {employeeDetails?.email} </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="xl">Age: {employeeDetails?.age} </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="xl">
                Mobile Number: {employeeDetails?.mobileNumber}{" "}
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="xl">Address: {employeeDetails?.address} </Text>
            </ListItem>
          </List>
        ) : (
          <p>No data available</p>
        )}
      </Box>
    </Box>
  );
}

export default EmployeeDetails;
