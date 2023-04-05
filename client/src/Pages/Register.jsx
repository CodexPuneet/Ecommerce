import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { Link } from 'react-router-dom';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
   import axios from 'axios';
   import { useToast } from '@chakra-ui/react'
  //  import Footer from "../Components/Footer"
  
  export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast()
    const [data, setData]=useState({
        name:"",
        Lname:"",
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

    const handleSubmit=()=>{
        axios.post('https://fine-tan-panther-wrap.cyclic.app/user/signup',data)
        .then((res)=>{ toast({
            title: 'Account created.',
            description: res.data,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })})
        .catch((err)=>{console.log(err)})
    }
  
    return (
      <Box>
             <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Register Now
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy our cool services by PayPal ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" name='name' placeholder='First Name' onChange={handleChange} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" name='Lname' placeholder='Last Name' onChange={handleChange} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name='email' placeholder='Email' onChange={handleChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' onChange={handleChange} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  onClick={handleSubmit}
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'} >
                  Already a user? <Text color={'blue.400'}> <Link  to="/">Login</Link></Text> 
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      {/* <Footer /> */}
      </Box>
    );
  }