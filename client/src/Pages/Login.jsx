import React from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  useToast,
  Center
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getAuthError,
  getAuthRequest,
  getAuthSuccess,
} from "../Redux/AuthReducer/action";

export default function Loginpage() {
  const dispatch = useDispatch();
    const toast = useToast()
    const navigate = useNavigate();
    const [data, setData]=useState({
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
      dispatch(getAuthRequest())
      axios.post('http://localhost:4500/user/login',data)
        .then((res)=>{
            if(res.data.token){
              dispatch(getAuthSuccess(res.data))
            toast({
            title: 'Login Sucessfull.',
            description: res.data.msg,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          if( res.data.msg=="User Login")
          {
            navigate("/homepage");
          }
          else{
            navigate("/admin");
          }
          }
 
    })
        .catch((err)=>{
          dispatch(getAuthError())
        })
    }
   useSelector((store)=>console.log(store))
  return (
    <Box
      h={{ md: "100vh", lg: "100vh", base: "100vh" }}
      bgImage="url(https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"
      bgPos="center"
      bgRepeat="no-repeat"
      bgSize={{ md: "100%", lg: "100%", base: "100%" }}
      size="100%"
    >
      <Center>
        <Box
          mt={{ md: "5%", lg: "8%", base: "2%" }}
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
            backdropFilter={"blur(5px)"}
          >
            <Heading variant={"solid"} color="black">
              
             SIGN IN {" "}
            </Heading>
            <form style={{marginTop:"25px"}} >
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel
                    htmlFor="email"
                    variant={"smooth"}
                    fontSize={"20px"}
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
                    onChange={handleChange}
                  />
                    
                 
                </FormControl>
                <Button type="submit" bg="black" color="white" width="full"
                  _hover="{ borderColor: '#4299e1'}"
                  onClick={handleSubmit}
                >
                  LOGIN
                </Button>
                <Box alignSelf="center">
                  <Text fontSize="17px">
                    <b>
                      {" "}
                      Already a member? <Link  to="/register">Register Here</Link>
                    </b>
                  </Text>
                </Box>
                <Box alignSelf="center">
                  <Text variant={"outline"} fontSize={{ md: "15px", lg: "17px", base: "12px" }}>
                    <b>
                      {" "}
                     Welcome to our Lelo-Mart
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
