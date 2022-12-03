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
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";
function MyOrderedProducts() {
  const navigate=useNavigate(false);
  const [products,setproducts]=useState(null);
  const [errr,seterrr]=useState(null);
  var data = jwt_decode(Cookies.get('token'));
  useEffect(() => {
    axios.post(`https://outrageous-cow-headscarf.cyclic.app/api/myorders`,{"email":data.userEmail})
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
<p>My Products</p>
{errr!=null && <p>{errr}</p>}

{products!=null && <>
  <TableContainer component={Paper} sx={{mt:'2%'}}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor:'blue',color:'white !important'}}>
            <TableCell>Seller Name</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">View Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {products.map((product)=>{
            return (
            <TableRow
              key={product._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.sellername}
              </TableCell>
              <TableCell align="right">{product.phonenum}</TableCell>
              <TableCell align="right">{product.reqquantity}</TableCell>
              <TableCell align="right"  onClick={()=>{
                navigate(`/orderproductoverview/${product.productid}`);
              }
}><VisibilityIcon/> </TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>

</>
}

</>
  )
}

export default MyOrderedProducts