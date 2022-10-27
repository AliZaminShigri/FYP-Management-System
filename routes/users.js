const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { NavItem } = require("react-bootstrap");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Product = require("../models/products");
jwtKey = process.env.TOKEN_KEY;

route.get(
  "/",
  auth,
  async (req, res) => {
    let result = await User.find({ email: req.body.email });
    if (result.length > 0) {
      res.send({
        message: "User has been fetched successfully",
        data: result.filter((usr) => usr.email === req.body.email),
      });
    }
    res.status(500).send("Can not fetch data");
  }
);
//registration
route.post("/signup", (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (
    email == null ||
    email == "" ||
    password == null ||
    password == "" ||
    password !== cpassword ||
    !name ||
    name.trim().length == 0
  ) {
    res
      .status(400)
      .send("Please provide all necessary information with correct values");
  } else {
    User.findOne({ email: email }, async (err, user) => {
      if (user) {
        res.status(400).send({ message: "User is already registerd" });
      } else {
        const user = new User({
          name,
          email,
          password,
        });
        user.password = await bcrypt.hash(user.password, 10);
        //user.cpassword= undefined;
        user.save((err) => {
          if (err) {
            res.status(400).send("Please enter valid inputs!");
          } else {
            //user.password=bcrypt.hash(user.password,10);
            jwt.sign({ user }, jwtKey, { expiresIn: "60s" }, (err, token) => {
              res.status(200).json({ user });
            });
            //res.send({user});
          }
        });
      }
    });
  }
});

//log in
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
      console.log("User Password is correct");
      // Create token
      const token = jwt.sign({ email }, "123456", {
        expiresIn: "2h",
      });
      // save user token
      user.token = token;

      // user
      res.status(200).json(token);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

//update user details
route.post("/update", auth, async (req, res) => {
  try {
    console.log("Coming data : ", req.body.name);
    const { name, email } = req.body;

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
    console.log("Invalid inputs");
    //res.send("Not updateable");
  }
});

//Add a product into users table
route.post(
  "/addProject", auth, async (req, res) => {
    try {
      const product = new Product({
        email: req.body.email,
        title: req.body.title,
        description: req.body.description,
        contacts: req.body.contacts,
        price: req.body.price,
        team_members: req.body.team_members

      });
      const result = await product.save();
      res.status(200).send(result);
    } catch (e) {
      // if(e.code=="E11000"){res.status(401).send(`Invalid inputs  ${e}`);}
      res.status(401).send("Invalid inputs");
    }
  }
);

//delete a product (project)
route.post(
  "/deleteProject", auth, async (req, res) => {
    try {

      const result = await Product.deleteOne({ email: req.body.email, title: req.body.title });
      if (result.deletedCount > 0) {
        res.status(200).send({
          message: `The project titled {${req.body.title}} has been deleted successfully`,

        });
      }
      else {
        res.status(500).send("The data does not exist");
      }

    } catch (e) {
      res.status(401).send("Can not delete this project");
    }
  }
);

//update a product(Project)
route.post(
  "/updateProject", auth, async (req, res) => {
    try {

      const result = await Product.findOne({ email: req.body.email, title: req.body.title });
      if (result != null) {
        const response = await Product.updateOne({ email: req.body.email, title: req.body.title }, {
          $set: {
            description: req.body.description,
            contacts: req.body.contacts,
            price: req.body.price,
            team_members: req.body.team_members
          }
        });
        res.status(200).send(response);

      }
      else {
        res.status(501).send({
          message: `The project titled {${req.body.title}} does not exist on DataBase`,

        });
      }
    } catch (e) {
      res.status(401).send("Can not update this project");
    }
  }
);

//Show user's all projects
route.get(
  "/getProjects", auth, async (req, res) => {
    try {

      const result = await Product.find({ email: req.body.email });
      if (result != null) {
        res.status(200).send(result);

      }
      else {
        res.status(501).send({
          message: `You don't have any project`,

        });
      }
    } catch (e) {
      res.status(401).send("Error");
    }
  }
);
module.exports = route;
