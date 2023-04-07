import React, { useEffect } from 'react';
import { Button, Center, Image, Tag, Text, useToast,Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'
const Payment=()=>{
    const navigate = useNavigate();
    useEffect(()=>{
setTimeout(()=>{
    navigate("/home");
},7000)
    },[])

return <div>
    <Navbar/>
    <Center> {
           <Box backgroundColor={"transparent"}
           backdropFilter={"blur(5px)"}> 
           <Text mb="10px" fontWeight="bold" fontSize="30px" color="green"
          >PAYMENT SUCESSFULL</Text>
          <Text mb="10px" fontWeight="bold" fontSize="10px" color="gray.400"
          >Redirecting to Dashboard...</Text>
          
          <Image src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif"/>

          
          </Box> 
        }</Center>
</div>
}

export default Payment;