import React from 'react'
import { useState } from 'react';
import { Button, Card, TextField } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import './bookingproduct.css'
export default function BookingProduct() {
  const navigate=useNavigate(false)
  var data = jwt_decode(Cookies.get('token'));
  var [farmer_name,setFarmername]= useState(null);
  var [farmer_address,setFarmeraddress]= useState(null);
  // var [farmer_mail,setfarmermail]=useState(null);
  var [farmer_phoneno,setfarmerphoneno]=useState(null);
  var [godown_name,setgodownname]= useState(null);
  var [godown_address,setgodownaddress]= useState(null);
  var [storage_no,setstorageno]=useState(null);
  var [crop_type,setcroptype]=useState(null);
  var [qua_ntity,setquantity]=useState(null);
  var [amou_nt,setamount]=useState(null);
  function productsignupdata(){
    const registereddata={
        farmername:farmer_name,
        farmeraddress:farmer_address,
        mail:data.userEmail,
        phonenum:farmer_phoneno,
        godownname:godown_name,
        godownaddress:godown_address,
        storageno:storage_no,
        croptype:crop_type,
        quantity:qua_ntity,
        amount:amou_nt
    }
    axios.post(`https://outrageous-cow-headscarf.cyclic.app/api/productregister`,registereddata)
    .then(response=> {
      console.log(response);
      navigate('/myproducts')
    })
    .catch(e=>console.log(e))

  } 
  return (
  <div>
    <center>
    <Card sx={{mt:20,maxWidth:"600px",borderRadius:"5%",p:5,fontSize:"10px"}} className="registerclass">
           <h1>Product Registration</h1>
            <div sx={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
             <TextField
            type="text"
            style={{ width: "220px",fontFamily: "Arial", color:"White"}}
            label="Farmer Name"
            className="inputtextfield" value={farmer_name}
            onChange={(e)=>{setFarmername(e.target.value)}}
          />
             <TextField
            type="text"
            style={{ width: "220px" }}
            label="Farmer Address"
            className="inputtextfield" value={farmer_address}
            onChange={(e)=>{setFarmeraddress(e.target.value)}}
          />
             <TextField
            type="text"
            style={{ width: "220px" }}
            label="Farmer Phone No"
            className="inputtextfield" value={farmer_phoneno}
            onChange={(e)=>{setfarmerphoneno(e.target.value)}}
          />
           <TextField
            type="text"
            style={{ width: "220px" }}
            label="Godown Name"
            className="inputtextfield" value={godown_name}
            onChange={(e)=>{setgodownname(e.target.value)}}
          />
             <TextField
            type="text"
            style={{ width: "220px" }}
            label="Godown Address"
            className="inputtextfield" value={godown_address}
            onChange={(e)=>{setgodownaddress(e.target.value)}}
          />
             <TextField
            type="text"
            style={{ width: "220px" }}
            label="Storage No"
            className="inputtextfield" value={storage_no}
            onChange={(e)=>{setstorageno(e.target.value)}}
          />
             <TextField
            type="text"
            style={{ width: "220px" }}
            label="Crop Name"
            className="inputtextfield" value={crop_type}
            onChange={(e)=>{setcroptype(e.target.value)}}
          />
             <TextField
            type="text"
            style={{ width: "220px" }}
            label="Product Quantity"
            className="inputtextfield" value={qua_ntity}
            onChange={(e)=>{setquantity(e.target.value)}}
          />
             <TextField
            type="text"
            style={{ width: "220px" }}
            label="Amount per Kg"
            className="inputtextfield" value={amou_nt}
            onChange={(e)=>{setamount(e.target.value)}}
          />
          <br/>
         <Button
          variant="contained"
          style={{ width: "auto" }}
          color="secondary"
          onClick={productsignupdata}
          className="inputtextfield"
        >
          Book Now
        </Button>
        </div>
        </Card>
        </center>
    </div>

  )
}
