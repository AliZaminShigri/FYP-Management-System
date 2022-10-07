const express = require('express');
const route = express.Router();
 const mongoose=require('mongoose');
 validator = require('validator');
 const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String,
        required:true,
        validate(value){  // custom validator function
            if(validator.isEmail(value)===false){
                throw new Error("Please enter a valid email.");
            }
        }
    },
    password: {type: String,
    required:true},
    cpassword: {type: String}
    
  });
//   userSchema.pre('save', async function(next){
//     if(this.isModified('password')){
//       this.password=bcrypt.hash(this.password,12);
//     }
//     next();
//   });
  
  module.exports=mongoose.model("User", userSchema);