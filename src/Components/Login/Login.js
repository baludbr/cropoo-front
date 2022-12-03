import './LoginUi.css';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import profile from '../../images/Profile.jpg'
import { Button,Card,TextField, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { FormControl } from "@mui/material";


function Login() {
  var [errmsg,seterrmsg]=useState(null);
  const navigate=useNavigate(false)
  var [mail,setEmail]=useState(null);
  var [pwd,setPassword]=useState(null);
  const [ermsg,setermsg]=useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['dummycookie']);
  function signindata(){
    const logindata={
      email:mail,
      password:pwd
    }
    axios.post(`https://outrageous-cow-headscarf.cyclic.app/api/login`,logindata)
    .then(response=> {
      if(response.status=200){
        setCookie('token', response.data.token, { path: '/' });
        if(response.data.role=="Farmer"){
        navigate('/checkout')  
        }
        else if(response.data.role=="Admin"){
          navigate('/sellers')  
          }
        else if(response.data.role=="Seller"){
          navigate('/shopping')
        }
        }
      else{
        seterrmsg(response.message);
        setermsg('Login Failed !! Invalid Credintals')
        navigate('/login')  
      }
    })
    .catch(e=>{setermsg('Login Failed !! Invalid Credintals');        navigate('/login')  
  })

  }
  return (
    <>
      <center>
      <Card sx={{maxheight:"400px",mt:20,width:"500px",borderRadius:"5%",p:5,fontSize:"10px"}} className="registerclass">
            <img src={profile} alt="profilepic" className="profile"/>          
           <h1 onClick={()=>{navigate('/')}}>Cropoo Login</h1>
            {ermsg!=null && <h2>{ermsg}</h2>}
            <div className='formfields-register'>

 <TextField
            fullWidth
            type="text"
            style={{ width: "200px" }}
            label="Email"
            value={mail}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="textfield-register"
          />
          <br></br>
 <TextField
            fullWidth
            type="password"
            style={{ width: "200px" }}
            label="Password"
            value={pwd}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="textfield-register"
          />

            </div>
    <br/>
         <Button
          variant="contained"
          style={{ marginTop: "10px",width:"50%" }}
          color="secondary"
          onClick={signindata}
        >
          Signin
        </Button>
         <p className='account-exists-register'>Already have an Account? <a variant="text" onClick={()=>{ navigate(`/register`)}} sx={{cursor:"pointer !important"}}>SignUp</a>
          </p>
            </Card>
            </center>
    </>
  );
}

export default Login;