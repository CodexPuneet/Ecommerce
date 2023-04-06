import React, { useEffect, useState } from 'react'
import Autocrausel from "./Autocrausal";
import Navbar from "../Components/Navbar"
import axios from 'axios';
import { useSelector } from "react-redux";
import {useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Homepage = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const toast = useToast()
  const token=useSelector((store)=>(store.AuthReducer.token))
  if(!token)
  {
   navigate('/')
  }
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
  },[])
console.log(list)
  return (
    <div>
      <Navbar/>
      <Autocrausel/>
      {
        
      }
      </div>
  )
}

export default Homepage