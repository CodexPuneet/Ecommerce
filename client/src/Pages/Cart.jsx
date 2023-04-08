import React, { useState,useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Center, Flex, Image, Text } from '@chakra-ui/react';
import Cartt from './Cartt';
import {
  getCartError, getCartRequest, getCartSuccess
} from "../Redux/AppReducer/action";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const count=useSelector((store)=>(store.AppReducer.Cart))
  const token=useSelector((store)=>(store.AuthReducer.token))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCartData=()=>{
    dispatch(getCartRequest())
    axios.get('https://tough-erin-peplum.cyclic.app/cart/',{
    headers:{
      Authorization: token
    }
      }).then((res)=>dispatch(getCartSuccess(res.data)))
      .catch((err)=>dispatch(getCartError()))
  }

  useEffect(()=>{
    getCartData()
    if(!token)
    {
     navigate('/')
    }
  },[])


  return (
    <div>
        <Navbar />
         <Box>
{ count.length !==0? <Cartt /> 
:<Center><Image src='https://bakestudio.in/assets/images/cart/empty-cart.gif'/></Center> 
}
        </Box> 
    </div>
  )

}

export default Cart



