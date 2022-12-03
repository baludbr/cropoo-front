import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useState } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './profile.css';
export default function Profile(){
    const [pdata,setpdata]=useState(null);
    useEffect(()=>{
        var data = jwt_decode(Cookies.get('token'));
        axios.post(`http://localhost:2000/api/profileview`,{email:data.userEmail})
        .then((result)=>{
            setpdata(result.data[0]);    
        })
    },[]);
    return(<>
        {pdata!=null && <>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className='profile-card'>
            <AccountCircleIcon sx={{width:"20%",height:"20%"}}/>
            <p><b>Name:-</b> {pdata.fullname}</p> 
            <p><b>Email:-</b> {pdata.email}</p> 
            <p><b>Role:-</b> {pdata.role}</p> 
        </div>
        </>}
    </>)
}