const express = require("express");
const productRoute = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { NavItem } = require("react-bootstrap");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Product = require("../models/products");
jwtKey = process.env.TOKEN_KEY;

productRoute.get(
   "/getProjects",async(req,res)=>{
    try{
        const result=await Product.find({email: "zaminali@gmail.com"});
        if(result.length<=0){
          res.status(501).send("No projects available");
        }
        
      
        res.status(200).send(result);
    }catch(e){
        res.status(401).send("No project can be found");
    }
   }
   
  );


module.exports = productRoute;