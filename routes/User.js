const express =require("express");
const router = express.Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const controllers=require("../controllers/user")
const {loginRules,registerRules,validation} = require ("../middlware/validator");
const isAuth = require("../middlware/passport");


router.get("/",(req,res)=>{
    res.send("hello world");
});


//register

router.post("/register",registerRules(),validation, controllers.registerUser);




//login

router.post("/login",loginRules(),validation,controllers.loginUser);


// get current user
router.get("/current",isAuth(),(req,res)=>{
    res.status(200).send({user:req.user})
})






module.exports = router;