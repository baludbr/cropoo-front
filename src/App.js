import './App.css';
import Login from '../src/Components/Login/Login';
import Signup from './Components/Register/Signup';
import ContactUs from './Components/ContactUs/Contactus';
import {Router,Routes,Route} from 'react-router-dom'
import Navbar from '../src/Components/Navbar/Navbar';
import DashBoard from './Components/Dashboard/Ordering';
import { useEffect } from 'react';
function App() {
  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element')
  //  }   
  //  useEffect(() => {
  //    var addScript = document.createElement('script');
  //    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  //    document.body.appendChild(addScript);
  //    window.googleTranslateElementInit = googleTranslateElementInit;
  //  }, [])
 
  return (
    <>

      <div className="App">
      {/* <div id="google_translate_element"></div> */}

    <Routes>
        <Route path='/feedback' element={<><ContactUs /></>}/>
      <Route path='/login' element={<><Login /></>}/>
      <Route path='/register' element={<><Signup /></>}/>
      <Route exact path='/' element={<><DashBoard/></>}/>
      <Route exact path="/checkout" element={<><Navbar checkout={true}/></>}/>
      <Route exact path="/shopping" element={<><Navbar shopping={true}/></>}/>
      <Route exact path="/buyers" element={<><Navbar buyers={true}/></>}/>
      <Route exact path="/allproducts" element={<><Navbar allproducts={true}/></>}/>
      <Route exact path="/sellers" element={<><Navbar sellers={true}/></>}/>
      <Route exact path="/myproducts" element={<><Navbar myproducts={true}/></>}/>
      <Route exact path="/orderedproducts" element={<><Navbar orderedproducts={true}/></>}/>
      <Route exact path="/buyproduct/:pid" element={<><Navbar buyproduct={true}/></>}/>
      <Route exact path="/editorder/:pid" element={<><Navbar editorder={true}/></>}/>
      <Route exact path="/orderproductoverview/:pid" element={<><Navbar orderproductoverview={true}/></>}/>
      <Route exact path="/profile" element={<><Navbar profile={true}/></>}/>
    </Routes>
  </div>
</>
    );
}

export default App;
