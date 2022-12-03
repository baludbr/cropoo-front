import React from 'react'
// import '../../css/style.css';
import Padd from "../../images/padd.jpg"
import { Card, Paper, Typography } from '@mui/material';
import { minWidth, Stack } from '@mui/system';
import {Grid} from '@mui/material';
import {Button} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

import { useCookies } from 'react-cookie';
import { CardHeader } from '@mui/material';
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import './shopping.css';
function Shopping() {
  const navigate=useNavigate(false)
  
  const [products,setproducts]=useState(null);
  const [errr,seterrr]=useState(null);
  // useEffect(() => {(
  useEffect(() => {
    axios.get(`http://localhost:2000/api/products`)
    .then((result)=>{
      setproducts(result.data);    
    })
    .catch((err)=>{
      seterrr("No Data found");
      console.log(err);
    })
  },[])
 
  return (
<>
<p>Products</p>
{errr!=null && <p>{errr}</p>}

{products!=null && <>
<div style={{display:"flex",flexWrap:"wrap",alignItems:'center'}}>
{products.map((product)=>{
 
return (
<div style={{boxShadow:"0 4px 8px 0 rgba(232, 190, 172,0.2);",transition:"0.3s",backgroundColor:"white",margin:"2px",width:"500px",display:"flex",flexDirection:"column",alignItems:"baseline",flexWrap:"wrap",alignContent:"flex-start",padding:"10px",borderRadius:"5px",marginBottom:10}}>
<p>Crop:-{product.croptype}</p>
<p>Available Qnty:- {product.quantity}</p>
<p>Amount:-{product.amount}</p>
<p>Godown:- {product.godownname},{product.godownaddress}</p>
<p>FarmerName:- {product.farmername}</p>
<p>Mobile No:- {product.phonenum}</p>
<div onClick={()=>{
  navigate(`/buyproduct/${product._id}`)
}} className='buy-btn'>Buy</div>
</div>
)

})}

</div>
</>
}

</>
  )
}

export default Shopping