const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { NavItem } = require("react-bootstrap");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
jwtKey = process.env.TOKEN_KEY

route.get("/", (req, res, next) => {
  // let query = mongoose.getCollection("User").find({});
  const token =
  req.body.token;
  //const token = true;

if (!token) {
  return res.status(403).send("A token is required for authentications");
}
try {
  console.log("Checking token");
  const decoded = jwt.verify(token, config.TOKEN_KEY);
  req.user = decoded;
  //return console.log(decoded);
} catch (err) {
  return res.status(401).send("Invalid Tokens");
}
return next();
},  (req, res) => {
  res.send("Please go to logIn page first to go to your profile");
});

route.post("/signup", (req, res) => {
  const { name, email, password, cpassword } =
    req.body;
  if (email == null || email == "" || password == null || password == "" || password !== cpassword || !name || name.trim().length == 0) {
    res.status(400).send("Please provide all necessary information with correct values");
  }
  else {
    User.findOne({ email: email }, async (err, user) => {
      if (user) {
        res.status(400).send({ message: "User is already registerd" });
      } else {

        const user = new User({
          name,
          email,
          password,
          cpassword: undefined
        });
        user.password = await bcrypt.hash(user.password, 10);
        //user.cpassword= undefined;
        user.save
          ((err) => {
            if (err) {
              res.status(400).send("Please enter valid inputs!");
            } else {
              //user.password=bcrypt.hash(user.password,10);
              jwt.sign({ user }, jwtKey, { expiresIn: '60s' }, (err, token) => {
                res.status(400).json({ token })
              })
              //res.send({user});
            }
          })
      }
    });
  }
})

route.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        "123456",
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      // user
      res.status(200).json(token);
    }
    else { 
      res.status(400).send("Invalid Credentials");
     }

  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

route.post("/update", async (req, res) => {
  try {
    console.log("Coming data : ", req.body.name);
    const { name, email } =
      req.body;

    //const user=await newMember.findOne({email:email});
    const status = await User.updateOne(
      { email: email },
      {
        $set: {
          name: name,
        },
      },
      {
        upsert: true,
      }
    );
    res.send("Wow! Values have been updated on data base");
    //const passMatching=await bcrypt.compare(password,userEmail.password);//camparing hashed password(which is on data base) with entered password
  } catch (e) {
    console.log("Invalid");
    //res.send("Not updateable");
  }
});
module.exports = route;
