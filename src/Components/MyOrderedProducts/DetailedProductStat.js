import React from'react';
import { useState } from 'react';
import { Button, TextField,Card} from "@mui/material";
import axios from 'axios';
import { useNavigate,useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

export default function DetailedProdStat(){
    const navigate=useNavigate(false)
    var {pid} = useParams();
    var data = jwt_decode(Cookies.get('token'));
    var [data,setdata]=useState(null);
    useEffect(() => {
        axios.post(`https://outrageous-cow-headscarf.cyclic.app/api/productdata`,{productid:pid})
        .then((response) =>{
            setdata(response.data[0]);
        })
        .catch((e)=>{console.log(e);})
    },[]);
    return(
    <>

        {data!=null &&   <Card sx={{width:'auto',mt:10,p:5}}>
      <h2> Order Summary</h2>  
      <p> <b>Order Item:-</b> {data.croptype}</p>
      <p> <b>Order pick-up place:-</b> {data.godownname}</p>
      <p> <b>Order pick-up address:-</b> {data.godownaddress}</p>
      <p> <b>Order Storage No:-</b> {data.storageno}</p>
      <p> <b>Order Quantity:-</b> {data.quantity}</p>
      <p> <b>Seller Name:-</b> {data.farmername}</p>
      <p> <b>Seller Contact:-</b> {data.mail}/{data.phonenum}</p>
    </Card>
}
     {/* </center> */}
    </>)
}