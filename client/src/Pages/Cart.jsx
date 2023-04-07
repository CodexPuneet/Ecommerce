import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Center, Flex, Image, Text } from '@chakra-ui/react';
import Page from './CartUi';
import Cartt from './Cartt';

const Cart = () => {
const [quant, setQuant]= useState(1)
  const item=useSelector((store)=>(store.AppReducer.Cart))

  return (
    <div>
        <Navbar />
         <Box>
{ item.length !==0? <Cartt /> 

//  item.map((el)=>{
//     return <Flex p={'5%'} border={'1px solid red'}>
//     <Image w='12%' src={el.image} />
//     <Text>{el.title}</Text>
//     <Button onClick={()=>setQuant(quant)}>-</Button>
//     <Button>{quant}</Button>
//     <Button>+</Button>
//     </Flex>
//   }) 
:<Center><Image src='https://bakestudio.in/assets/images/cart/empty-cart.gif'/></Center> 
}
        </Box> 
    </div>
  )
}

export default Cart

