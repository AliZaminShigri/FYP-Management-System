//import { Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./homepage.css";

const Homepage=()=>{
  const navigate = useNavigate();
  const GoToRegister = () => {
   
        navigate("/signup");
      }
  return (<div>
    <div>Home page</div>
    
    <button onClick={GoToRegister}></button>
  </div>
    
  );
}
  

export default Homepage;
