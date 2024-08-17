const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", (req, res) => {
  
});

router.post("/login", (req, res) => {
  res.send("login");
});

router.put("/update-password", (req, res) => {
    res.send("update password")
});

router.put("/update-username", (req, res)=>{
    res.send("update username")
})