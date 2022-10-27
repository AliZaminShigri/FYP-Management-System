const express = require('express');
const route = express.Router();
 const mongoose=require('mongoose');
 validator = require('validator');
 const productSchema = new mongoose.Schema({
    email:String,
    title: {
        type:String,
         validate(value){  // custom validator function
            if(value.unique==false){
                throw new Error(title="Project with same title already exists");
            }
        },
       
    },
    description:  {type:String,
    required:true},
    price:Number,
    contacts:[{type:String}],
    team_members:[{type:String}], 
    date:Date  
  });
  
  module.exports=mongoose.model("Products", productSchema);