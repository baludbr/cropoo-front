import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import AgricultureSharpIcon from '@mui/icons-material/AgricultureSharp';
import Checkout from "../Checkout/Checkout";
import Shopping from "../Shopping/Shopping";
import { useNavigate } from "react-router-dom";
import DashBoard from '../Dashboard/OrderTable';
import Buyers from '../Buyers/buyers';
import Sellers from '../Sellers/sellers';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import BookingProduct from '../BookingProduct/BookingProduct';
import MyProducts from '../MyProducts/myproduct';
import OrderProduct from '../OrderProduct/orderproduct';
import MyOrderedProducts from '../MyOrderedProducts/myorderedproducts';
import EditOrder from '../EditOrder/editOrder';
import '../../App.css';
import {useEffect} from 'react';
import Allproducts from '../AllProducts/Allproducts';
import DetailedProdStat from '../MyOrderedProducts/DetailedProductStat';
import Profile from '../Profile/Profile';
function ScrollTop(props) {
  
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element')
   }   
   useEffect(() => {
     var addScript = document.createElement('script');
     addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
     document.body.appendChild(addScript);
     window.googleTranslateElementInit = googleTranslateElementInit;
   }, [])
  var data = jwt_decode(Cookies.get('token'));
   
  const navigate=useNavigate(false)
  return (
    <React.Fragment>
      <CssBaseline />
      
      <AppBar>
        <Toolbar>
        <List sx={{display:"flex",alignItems:"center"}}>
        <List sx={{display:"flex",alignItems:"center"}}>
          <AgricultureSharpIcon sx={{translate:"2px"}}/>
          <Typography variant="h6" component="div">
            Cropoo...
          </Typography>
          </List>
          <List sx={{display:"flex"}}>      
            {data.userRole=='Farmer'&&<>
                    
              <ListItem button  onClick={() => {
                  navigate("/checkout");
                }}>
                <ListItemText primary="Booking"/>        
              </ListItem>
              <ListItem button  onClick={() => {
                  navigate("/myproducts");
                }}>
                <ListItemText primary="My_Products"/>        
              </ListItem>               
              </>
              }
          
          {data.userRole=='Admin'&&<>
                    <ListItem button  onClick={() => {
                  navigate("/sellers");
                }}>
                <ListItemText primary="Sellers"/>        
              </ListItem>
              <ListItem button  onClick={() => {
                  navigate("/buyers");
                }}>
                <ListItemText primary="Buyers"/>        
              </ListItem>
              <ListItem button  onClick={() => {
                  navigate("/allproducts");
                }}>
                <ListItemText primary="Products"/>        
              </ListItem>
              </>
              }
            {data.userRole=="Seller"&&<>
            <ListItem button  onClick={() => {
                  navigate("/shopping");
                }}>
                <ListItemText primary="Shopping"/>        
              </ListItem>
              <ListItem button  onClick={() => {
                  navigate("/orderedproducts");
                }}>
                <ListItemText primary="My_Orders"/>        
              </ListItem>           
            </>}         
            </List>
            <List sx={{display:'flex'}}>
            <div id="google_translate_element"></div>
            </List>
            <List sx={{display:'flex',color:'black',ml:2,alignItems:'center',cursor:'pointer'}} onClick={()=>{
              navigate("/profile");
            }}><span>Logged as {data.userEmail}</span><Avatar sx={{ width: 32, height: 32 }}>A</Avatar></List>
            <List sx={{display:'flex'}}>
          <ListItem button  sx={{alignItems:'flex-end'}} onClick={() => {
                  Cookies.remove("token");
                  navigate("/");
                }}>
                <ListItemText primary="Logout"/>        
              </ListItem>  
          </List>            
        </List>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>

        <Box sx={{ my: 2 }}>

        {props.checkout && <BookingProduct/>}
        {props.shopping && <Shopping/>}
        {props.myproducts && <MyProducts/>}
        {props.buyers && <Buyers/>}
        {props.sellers && <Sellers/>}
        {props.allproducts && <Allproducts/>}
        {props.buyproduct && <OrderProduct/>}
        {props.orderedproducts && <MyOrderedProducts/>}
        {props.editorder && <EditOrder/>}
        {props.orderproductoverview && <DetailedProdStat/>}
        {props.profile && <Profile/>}
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
