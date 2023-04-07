import React from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  useToast,
  Center
 
} from "@chakra-ui/react";

import {useState } from "react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast()
    const navigate = useNavigate();
    const [data, setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        const {name, value}=e.target;
        setData({
            ...data,
            [name]:value
        })
       
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
        axios.post('http://localhost:4500/user/signup',data)
        .then((res)=>{
          console.log(res)
          toast({
            title: 'Account created.',
            description: res.data,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        navigate("/")
        })
        .catch((err)=>{
            console.log(err)
        })
          
       
    }
  
    
   
  return (
    <Box
      h={{ md: "100vh", lg: "100vh", base: "100vh" }}
      bgImage="url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"
      bgPos="center"
      bgRepeat="no-repeat"
      bgSize={{ md: "100%", lg: "100%", base: "100%" }}
      size="100%"
    >
      <div id="toast"></div>
      <Center>
        <Box
          mt={{ md: "0%", lg: "7%", base: "0%" }}
          alignItems={"center"}
          justifyContent={"center"}
          w={{ md: "50%", lg: "30%", base: "100%" }}
          borderRadius="10px"


        >
          <Box
            bg="white"
            p={39}
            rounded="md"
            textAlign={"center"}
            backgroundColor={"transparent"}
            backdropFilter={"blur(3px)"}
          >
            <Heading variant={"solid"} color="white">
              
              REGISTER NOW{" "}
            </Heading>
            <form style={{marginTop:"25px"}} >
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel
                    htmlFor="name"
                    variant={"smooth"}
                    fontSize={"20px"}
                    color="white"
                  >
                    <b> Username</b>
                  </FormLabel>
                  <Input
                    isInvalid
                    errorBorderColor="black"
                    id="name"
                    name="name"
                    type="name"
                    required={true}
                    placeholder="Enter a name"
                    onChange={handleChange} 
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    htmlFor="email"
                    variant={"smooth"}
                    fontSize={"20px"}
                    color="white"
                  >
                    <b> Email</b>
                  </FormLabel>
                  <Input
                    isInvalid
                    errorBorderColor="black"
                    id="email"
                    name="email"
                    type="email"
                    required={true}
                    placeholder="Enter your email"
                    onChange={handleChange} 
                  />
                </FormControl>
                <FormControl>
              
                  <FormLabel
                    htmlFor="password"
                    variant={"smooth"}
                    fontSize={"20px"}
                    color="white"
                  >
                    <b> Password</b>
                  </FormLabel>
                  
                  <Input
                    w="100%"
                    isInvalid
                    errorBorderColor="black"
                    id="password"
                    name="password"
                    placeholder="Password"
                    color="black"
                    required={true}
                    type={showPassword ? 'text' : 'password'}  onChange={handleChange}
                  />
                    
                 
                </FormControl>
                <Button type="submit" bg="black" color="white" width="full"
                  _hover="{ borderColor: '#4299e1'}"
                  onClick={handleSubmit}
                >
                  CREATE ACCOUNT
                </Button>
                <Box alignSelf="center">
                  <Text fontSize="17px" color="white">
                 
                      {" "}
                      Already a member? <Link  to="/"><b>Login</b></Link>
                   
                  </Text>
                </Box>
                <Box alignSelf="center">
                  <Text variant={"outline"} fontSize={{ md: "15px", lg: "17px", base: "12px" }} color="white">
                    <b>
                      {" "}
                      By signing up, you agree to the Impresario Terms of Use and
                      Privacy Policy. 
                    </b>
                  </Text>
                </Box>
              </VStack>
            </form>
            
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
