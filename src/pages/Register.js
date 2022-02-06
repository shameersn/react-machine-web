import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Button,
  Flex,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
  FormControl,
  Text,
  Center,
  useToast
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useMutationApiQuery } from "../hooks/useApiQuery";
import { signup } from "../services/Auth";

function Register() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();
  const {
    mutate: createUser,
    isLoading,
  } = useMutationApiQuery({
    serviceFunction: signup,
    onError: (error) => {
      toast({
        title: "User registration failed.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
    onSuccess: (data) => {
      toast({
        title: "User Registration Success.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/login");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => createUser(data);

  return (
    <Center>
      <Box minW="400px" borderWidth="2px" borderRadius="lg" overflow="hidden">
        <Heading align="center">Register</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <FormControl isInvalid={errors?.password}>
              <InputGroup size="lg">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  focusBorderColor="teal.400"
                  size="lg"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors?.password?.message && (
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              )}
            </FormControl>
          </Box>
          <Flex alignItems="center" flexDirection="column">
            <Button type="submit" isLoading={isLoading}
              loadingText="" colorScheme="teal" size="lg" width="120px">
              Register
            </Button>
          </Flex>
        </form>
        <Text p={2} color="teal.700" align="center" fontSize="md">
          <Link to="/login">Login</Link>
        </Text>
      </Box>
    </Center>
  );
}

export default Register;
