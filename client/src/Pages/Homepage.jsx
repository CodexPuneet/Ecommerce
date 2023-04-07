import React, { useEffect, useState } from 'react'
import Autocrausel from "./Autocrausal";
import Navbar from "../Components/Navbar"
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {useNavigate } from 'react-router-dom';
import { Button, SimpleGrid, Tag, useToast } from '@chakra-ui/react';
import {BsCart4} from "react-icons/bs"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react';
import SmallCentered from './footer';
import {
  getCartError, getCartRequest, getCartSuccess
} from "../Redux/AppReducer/action";


const Homepage = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast()
  const token=useSelector((store)=>(store.AuthReducer.token))

  const getData = () => {
    axios.get(`http://localhost:4500/shop/`, {
      headers: {
        "content-type": "application/json",
        Authorization: token
      },
    })
      .then((res) => setList(res.data))
  
      .catch((err) =>
        toast({
          title: "Error Occured",
          description: `${err.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  };

  useEffect(()=>{
    getData()
    if(!token)
    {
     navigate('/')
    }
  },[])

const item=useSelector((store)=>(store.AppReducer.Cart))
const handlecart=(el)=>{
   dispatch(getCartSuccess([...item,el]))
}

console.log(item.length)

  return (
    <div>
      <Navbar/>
      <Autocrausel/> 
      <Center>
        <Text mt={"100px"} color="#2da9e1" fontSize={"40px"}>WEEKEND'S TOP<span style={{fontWeight:"bold" ,marginLeft:"10px",color:"#f2a2c7"}}>DEALS</span> </Text>
      </Center>
       <SimpleGrid columns={3} mt="50px">
      {
        list?.map((el,index)=>(
        
    <Center>
          <Box
          mt="50px"
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
             <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${el.image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
            },
          }}>
            <Image
            mt="20px"
            rounded={'lg'}
            borderRadius={"5px"}
            height={290}
            width={282}
            objectFit={'cover'}
            src={el?.image}
          />
          </Box>
            <Stack pt={10} align={'center'} mt="50px">
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={700}>
           {el?.title}
          </Heading>
          <Box direction={'columns'} align={'center'}>
            <Text fontWeight={500} fontSize={'xl'}>
            ₹ {el?.price}
            </Text>
            <Tag mt="8px" bgColor={el.rating<4?"red":"green" } 
            color="white"
            >
              {el?.rating}
            </Tag> 
           
          </Box> 
          <Button
          bg={index%2==0?"#2da9e1":"#f2a2c7"}
        color="white"
        _hover={{bg:"black"}}
        onClick={()=>handlecart(el)}
          >ADD TO CART <span style={{fontWeight:"bolder" ,marginLeft:"10px"}}><BsCart4 /></span></Button>
          
           
        </Stack>
       
      </Box>
      </Center>
        ))
      } </SimpleGrid>
      <Box mt={"150px"}>
        <SmallCentered mt={"50px"}/>
      </Box>
      </div>
  )
}

export default Homepage