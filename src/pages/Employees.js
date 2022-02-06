import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import { ViewIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useQueryClient } from 'react-query';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  HStack,
  Heading,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { useApiQuery, useMutationApiQuery } from "../hooks/useApiQuery";
import { getAllEmployees, deleteEmployee } from "../services/Employee";
import { Confirmation } from "../components/Confirmation";
import { Loader } from "../components/Loader";
import DebouncedSearch from "../components/DebouncedSearch";

function Employees() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [employeeToDelete, setEmployeeToDelete] = React.useState(null);
  const toast = useToast()
  const queryClient = useQueryClient();

  React.useEffect(() => {
    queryClient.invalidateQueries(['get-all-employees', searchText]);
  }, [searchText, queryClient])

  const {
    data: employeeList,
  } = useApiQuery({
    queryKey: ["get-all-employees", searchText],
    serviceFunction: () => getAllEmployees(searchText),
    onError: () => { },
  });

  const { mutate: removeEmployee, isLoading: deleteLoading, } = useMutationApiQuery({
    serviceFunction: deleteEmployee,
    onError: (error) => {
      toast({
        title: 'Employee Deletion failed.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Employee Deleted Successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
      queryClient.invalidateQueries('get-all-employees')
    }
  });

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
          Dashboard
        </Heading>
      </Box>
      <Box w="100%" p={4} pl={0} display="flex"
        alignContent="center"
        justifyContent="space-between">
        <DebouncedSearch triggerFetch={(term) => {
          setSearchText(term);
        }} />
        <Link to="add">
          <Button variant="outline" colorScheme="teal">
            Add New Employee
          </Button>
        </Link>
      </Box>
      <Box borderWidth="2px" borderRadius="lg">
        <Flex>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>EmployeeId</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Age</Th>
                <Th>Mobile Number</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employeeList?.length ? (
                employeeList.map((employee) => {
                  return (
                    <Tr key={employee.id}>
                      <Td>{employee.employeeId}</Td>
                      <Td>{employee.name}</Td>
                      <Td>{employee.email}</Td>
                      <Td>{employee.age}</Td>
                      <Td>{employee.mobileNumber}</Td>
                      <Td>
                        <HStack>
                          <Link to={"" + employee.id}>
                            <Icon as={ViewIcon} w={6} h={6} color="teal.500" />
                          </Link>
                          <Link to={"" + employee.id + "/edit"}>
                            <Icon as={EditIcon} w={6} h={6} color="blue.500" />
                          </Link>
                          <Icon
                            cursor="pointer"
                            onClick={() => {
                              setEmployeeToDelete(employee.id);
                              setIsModalOpen(true);
                            }}
                            as={DeleteIcon}
                            w={6}
                            h={6}
                            color="red.500"
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr p={6} >
                  <Td textAlign='center' colSpan="6">No record found
                  </Td>
                </Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr></Tr>
            </Tfoot>
          </Table>
        </Flex>
      </Box>
      <Confirmation
        title="Delete Employee"
        message="Are you sure? You can't undo this action afterwards."
        isOpen={isModalOpen}
        onClose={(confirmDelete) => {
          if (confirmDelete) {
            removeEmployee(employeeToDelete);
            setEmployeeToDelete(null);
          }
          setIsModalOpen(false);
        }}
      />
      <Loader showLoader={deleteLoading} />
    </Box>
  );
}

export default Employees;
