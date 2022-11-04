import React, { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
//import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Register = () => {
  //const history = useHistory();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
    console.log(user);
  };
// useEffect(()=>{},[])
  const register = () => {
    
    const { name, email, password, cPassword } = user;
    console.log(`user is ${user.cPassword}`);
    if (name && email && password && (password === cPassword)) {
      try{
         axios.post("http://localhost:9000/user/signup", user).then(res => {
        const resp=res.data;
        //navigate("/login");
        console.log(`error occured is: ${resp}`);

      });
    }catch(e){
        console.log("Some error");
      }
      
    } else {
      alert("invlid input");
    }
   
  }

 
  return (
    <div className="register">
      <h1>Sign Up</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="cPassword"
        value={user.cPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
      ></input>
      <div className="button" onClick={register()}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
