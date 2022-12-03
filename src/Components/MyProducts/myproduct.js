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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const [products,setproducts]=useState(null);
  const [errr,seterrr]=useState(null);
  const navigate=useNavigate(false)

  var data = jwt_decode(Cookies.get('token'));
  useEffect(() => {
    axios.post(`https://outrageous-cow-headscarf.cyclic.app/api/myproducts`,{"email":data.userEmail})
    .then((result)=>{
      setproducts(result.data);    
    })
    .catch((err)=>{
      seterrr("No Data found");
      console.log(err);
    })
  },[])

   function deleteorder(val){
    console.log(val);
     axios.post(`https://outrageous-cow-headscarf.cyclic.app/api/deleteorder`,{bid:val})
        .then((vaa)=>{
          navigate('/myproducts');
          // window.location.reload(false);
        })
        .catch((err)=>{console.log(err)});
    }

    function editorder(val){
       axios.post(`https://outrageous-cow-headscarf.cyclic.app/api/editorder`,{bid:val})
          .then((vaa)=>{
            navigate('/myproducts');
            window.location.reload(false);
          })
          .catch((err)=>{console.log(err)});
      }
  return (
<>
{products!=null && <>
  <p>My Products</p>
{errr!=null && <p>{errr}</p>}

<TableContainer component={Paper} sx={{mt:'2%'}}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>CropName</TableCell>
            <TableCell align="right">Godown</TableCell>
            <TableCell align="right">Farmer Name</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
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
                {product.croptype}
              </TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
              <TableCell align="right">{product.godownname},{product.godownaddress}</TableCell>
              <TableCell align="right"  onClick={()=>{
  navigate(`/editorder/${product._id}`)
}
}><EditIcon/> </TableCell>
              <TableCell align="right" onClick={()=>{
  deleteorder(product._id);
}}><DeleteIcon/></TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
</>}
</>
  )
}

export default MyProducts