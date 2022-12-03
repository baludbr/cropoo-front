import React from 'react'
import { useState } from 'react';
import { Button, Card, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import profile from '../../images/Profile.jpg'
import './SignupUi.css'
import {Select,MenuItem} from '@mui/material';
import { FormControl } from "@mui/material";
import {InputLabel} from '@mui/material';

var validator = require("email-validator");

export default function Signup() {
  const navigate=useNavigate(false)

   var [name,setFullName]= useState(null);
  var [mail,setEmail]=useState(null);
  var [pwd,setPassword]=useState(null);
  const [selected, setSelected] = useState('');
  var [dupemail,setdupemail] = useState(null);

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };
  function signupdata(){
    if(name==null || mail==null || pwd==null || selected=='' ||name.length==0 || mail.length==0 || pwd.length==0){
      setdupemail("All Fields are Required")
    }
    else if(validator.validate(mail)==false){
      setdupemail("Email is Invalid");
    }
    else{

      axios.post('http://localhost:2000/api/emailexists',{email:mail}).then((result)=>{
        if(result.data.length==0){
          const registerdata={
            fullname:name,
            email:mail,
            password:pwd,
            role:selected
          }
          axios.post(`http://localhost:2000/api/register`,registerdata)
          .then(response=> {
            navigate('/login')
          })
          .catch(e=>console.log(e))
        }    
        else{
          setdupemail("Email is already Exists");
        }
      })
        .catch(error => {console.log(error);})
    }


  }
 
  return (
    <>
      <center>
      <Card sx={{maxheight:"400px",mt:20,width:"500px",borderRadius:"5%",p:5,fontSize:"10px"}} className="registerclass">
            <img src={profile} alt="profilepic" className="profile"/>          
           <h1 onClick={()=>{navigate('/')}}>Cropoo Register</h1>
           {dupemail!=null && <h2 sx={{color:'red !important'}} className="alerts">{dupemail}</h2>}
            <div className='formfields-register'>
            <TextField
            fullWidth
            type="text"
            style={{ width: "200px" }}
            label="Full Name"
            value={name}
            onChange={(e)=>{setFullName(e.target.value)}}

            className="textfield-register"
          />
 <TextField
            fullWidth
            type="text"
            style={{ width: "200px" }}
            label="Email"
            value={mail}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="textfield-register"
          />
 <TextField
            fullWidth
            type="password"
            style={{ width: "200px" }}
            label="Password"
            value={pwd}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="textfield-register"
          />
<FormControl>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
      <Select value={selected} onChange={selectionChangeHandler} sx={{width:200}} labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Role">
      <MenuItem value={'Farmer'}>Farmer</MenuItem>
      <MenuItem value={'Seller'}>Seller</MenuItem>
      </Select>
   </FormControl>
            </div>
    <br/>
         <Button
          variant="contained"
          style={{ marginTop: "10px",width:"50%" }}
          color="secondary"
          onClick={signupdata}
        >
          SignUp
        </Button>
         <p className='account-exists-register'>Already have an Account? <a variant="text" onClick={()=>{ navigate(`/login`)}} sx={{cursor:"pointer !important"}}>Signin</a>
          </p>
            </Card>
            </center>
            </>
  )
}
