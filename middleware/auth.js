const express = require("express");

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
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
};

module.exports = verifyToken;