import React from 'react'
import Navbar from '../Components/Navbar'
import { useDispatch, useSelector } from "react-redux";
import { Box, Image } from '@chakra-ui/react';

const Cart = () => {

  const item=useSelector((store)=>(store.AppReducer.Cart))

  return (
    <div>
        <Navbar />
        <Box>
{
  item.map((el)=>{
    return <Box>
    <Image src={el.image} />
    </Box>
  })
}
        </Box>
    </div>
  )
}

export default Cart