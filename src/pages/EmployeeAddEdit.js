import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Textarea,
  Heading,
  Button,
  Flex,
  useToast,
  Input,
  FormErrorMessage,
  FormControl,
  Divider,
} from "@chakra-ui/react";
import { useMutationApiQuery, useApiQuery } from "../hooks/useApiQuery";
import {
  addEmployee,
  getEmployeeDetails,
  updateEmployeeDetails,
} from "../services/Employee";
import { useMutation } from "react-query";
import { Loader } from "../components/Loader";

function EmployeeAddEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();
  const employeeId = params?.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      employeeId: "",
      name: "",
      email: "",
      age: "",
      mobileNumber: "",
      address: "",
    },
  });

  // get employee details
  useApiQuery({
    queryKey: ["get-employee-details", employeeId],
    serviceFunction: () => getEmployeeDetails(employeeId),
    onError: (error) => {
      toast({
        title: "Employee fetching failed.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/employee");
    },
    onSuccess: (data) => {
      const fields = [
        "employeeId",
        "name",
        "email",
        "mobileNumber",
        "age",
        "address",
      ];
      fields.forEach((key) => setValue(key, data[key]));
    },
    enabled: !!employeeId,
  });

  const { mutate: createEmployee, isLoading } = useMutationApiQuery({
    serviceFunction: addEmployee,
    onError: (error) => {
      toast({
        title: "Employee creation failed.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Employee creation Success.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/employee");
    },
  });

  const { mutate: updateEmployee, isLoading: updateLoading } = useMutation(
    (data) => {
      updateEmployeeDetails(data);
    },
    {
      onError: (error) => {
        toast({
          title: "Employee Update failed.",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      },
      onSuccess: () => {
        toast({
          title: "Employee update Success.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/employee");
      },
    }
  );

  const onSubmit = (data) => {
    if (employeeId) {
      updateEmployee({ employeeId, data });
    } else {
      createEmployee(data);
    }
  };

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
          {!employeeId ? "Add new" : "Update"} Employee
        </Heading>
        <Link to="/employee">
          <Button variant="outline" colorScheme="teal">
            Back
          </Button>
        </Link>
      </Box>
      <Divider mb={4} />
      <Box borderWidth="2px" borderRadius="lg">
        <Box
          minW="400px"
          maxW="100%"
          borderWidth="2px"
          borderRadius="lg"
          overflow="hidden"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box p="2">
              <FormControl isInvalid={errors?.employeeId}>
                <Input
                  focusBorderColor="teal.400"
                  size="lg"
                  type="text"
                  {...register("employeeId", {
                    required: "EmployeeId is required",
                  })}
                  colorScheme="teal"
                  placeholder="EmployeeId"
                />
                {errors?.employeeId?.message && (
                  <FormErrorMessage>
                    {errors?.employeeId?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box p="2">
              <FormControl isInvalid={errors?.name}>
                <Input
                  id="name"
                  placeholder="Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors?.name?.message && (
                  <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box p="2">
              <FormControl isInvalid={errors?.email}>
                <Input
                  focusBorderColor="teal.400"
                  size="lg"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    email: "Please enter a valid email",
                  })}
                  colorScheme="teal"
                  placeholder="Email"
                />
                {errors?.email?.message && (
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box p="2">
              <FormControl isInvalid={errors?.age}>
                <Input
                  focusBorderColor="teal.400"
                  size="lg"
                  type="number"
                  {...register("age", { required: "age is required" })}
                  colorScheme="teal"
                  placeholder="Age"
                />
                {errors?.age?.message && (
                  <FormErrorMessage>{errors?.age?.message}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box p="2">
              <FormControl isInvalid={errors?.mobileNumber}>
                <Input
                  focusBorderColor="teal.400"
                  size="lg"
                  type="number"
                  {...register("mobileNumber", {
                    required: "Mobile Number is required",
                  })}
                  colorScheme="teal"
                  placeholder="Mobile Number"
                />
                {errors?.mobileNumber?.message && (
                  <FormErrorMessage>
                    {errors?.mobileNumber?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box p="2">
              <FormControl isInvalid={errors?.address}>
                <Textarea
                  placeholder="Address"
                  size="lg"
                  {...register("address", { required: "Address required" })}
                  colorScheme="teal"
                />
                {errors?.address?.message && (
                  <FormErrorMessage>
                    {errors?.address?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Flex justifyContent="flex-end" p={4}>
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText=""
                colorScheme="teal"
                size="lg"
              >
                {!employeeId ? "Add New" : "Update"} Employee
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
      <Loader showLoader={isLoading || updateLoading} />
    </Box>
  );
}

export default EmployeeAddEdit;
