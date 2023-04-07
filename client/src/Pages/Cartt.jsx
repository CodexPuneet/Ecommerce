import { Button, Tag, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { DeleteIcon } from '@chakra-ui/icons'
import "./Cart.css"
import {
  getCartError, getCartRequest, getCartSuccess
} from "../Redux/AppReducer/action";

const Cartt = () => {
  const products =useSelector((store)=>(store.AppReducer.Cart))
  let total=0;
  for(let i=0;i<products.length;i++) 
  {
    total=total+products[i].quantity*products[i].price
  }

  return (
    <div>
    <Header />
    <ProductList />
    <Summary subTotal={total} />
    </div>
  )
}

function Header() {
  const data =useSelector((store)=>(store.AppReducer.Cart))
    return (
      <header style={{width:'80%', margin:'auto' }} >
        <h1 style={{ fontFamily: "fantasy", fontSize:"50px", margin:"20px", color:"#2da9e1" }}>Shopping Cart</h1>
  
        <ul className="breadcrumb">
          <li >Home</li>
          <li >Shopping Cart</li>
        </ul>
       
        <span style={{float: 'right'}}>{data.length} items in the bag</span>
     
      </header>
    );
  }
  function ProductList() {
    const dispatch = useDispatch();
    const toast = useToast()
    const products =useSelector((store)=>(store.AppReducer.Cart))
    const token=useSelector((store)=>(store.AuthReducer.token))
    const handelDelete = (id) => {
      axios.delete(`http://localhost:4500/cart/${id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: token
        },
      })
      .then((res) => {
        toast({
          title: "Item Removed ",
          description: `Oops ! You've Droped Item `,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getCartData();
      })
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
  
  const getCartData=()=>{
    dispatch(getCartRequest())
    axios.get('http://localhost:4500/cart/',{
    headers:{
      Authorization: token
    }
      }).then((res)=>dispatch(getCartSuccess(res.data)))
      .catch((err)=>dispatch(getCartError()))
  }
const handleEdit=(id,x)=>{
  let quant=x<1?1:x
const data={
  quantity:quant
}
axios.patch(`http://localhost:4500/cart/${id}`,data, {
  headers: {
    "content-type": "application/json",
    Authorization: token
  },
}).then((res)=> getCartData())
}


    return (
      <section className="container">
        <ul className="products">
          {products.map((product, index) => {
             
            return (
              <li className="row" key={index}>
                <div className="col left">
                  <div className="thumbnail">
                      <img src={product.image} alt={product.name} />
                 
                  </div>
                  <div className="detail">
                    <div className="name">
                      {product.title}<Tag h={'5px'} bgColor={product.rating<4?"red":"green" } 
            color="white"
            >
              {product?.rating}
            </Tag>
                    </div>
                    <div className="price">₹ {' '}{(product.price)}</div>
                    
                  </div>
                  <Button onClick={() => handelDelete(product._id)} ><DeleteIcon /></Button>
                </div>
  
                <div className="col right">
  
  <Button style={{border:'none', backgroundColor:'#ffff', margin:'auto'}}  disabled={product.quantity<2} onClick={()=>handleEdit(product._id,product.quantity-1)}>-</Button>
  <Button style={{ margin:'auto'}}>{product.quantity}</Button>
  <Button style={{border:'none', backgroundColor:'#ffff',margin:'auto'}} onClick={()=>handleEdit(product._id,product.quantity+1)} >+</Button>
                 
 
                  <Text margin="auto" fontSize={'2.0rem'}  color='#0a7009ae' >{'₹'+ product.quantity*product.price}</Text>
               
             
  
                
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
  function Summary({
    subTotal,
    discount,
  }) {
    let tax=17;
    let total = subTotal+(subTotal*0.17);

  const [promo, setPromo]=useState("")
  const handelDiscount=()=>{
    if(promo=="Richa30")
    {
       total=Math.floor(subTotal-(subTotal*0.3))
       console.log(total)
    }
    else if(promo=="Mart60")
    {

    }
    else if(promo=="Mart80")
    {
      
    }
  }
  
    return (
      <section className="container">
        <div className="promotion">
          <label htmlFor="promo-code">Have A Promo Code?</label>
          <input type="text" onChange={(e)=>setPromo(e.target.value)} />
          <button type="button" onClick={handelDiscount} />
        </div>
  
        <div className="summary">
          <ul>
            <li>
              Subtotal <span>{'₹'+(subTotal)}</span>
            </li>
            {discount > 0 && (
              <li>
                Discount <span>{'₹'+(discount)}</span>
              </li>
            )}
            <li>
              GST <span>{(tax)+"%"}</span>
            </li>
            <li className="total">
              Total <span>{'₹'+(total)}</span>
            </li>
          </ul>
        </div>
  
        <div className="checkout">
          <button type="button">Check Out</button>
        </div>
      </section>
    );
  }
  


export default Cartt