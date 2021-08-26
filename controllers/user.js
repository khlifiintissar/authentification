const bcrypt = require("bcrypt");
const User= require ("../models/User");
const jwt = require("jsonwebtoken");


exports.registerUser=async (req, res) => {
    const { name, lastName, email, password} = req.body;
    try {
        const newUser = new User({ name, lastName, email, password });
        //check if email is unique
        const searchedUser = await User.findOne({ email });
    
        if (searchedUser){
            return res.status(400).send({ msg:"email already exist" })
        }
         //hash password
          const salt = 10;
          const genSalt = await bcrypt.genSalt(salt);
          const hashedPassword = await bcrypt.hash(password, genSalt);
          console.log(hashedPassword);
          newUser.password = hashedPassword;
        //generate a token
        //save user il le génère tt au cours de la creation 
        const newUserToken= await newUser.save();
        const payload = {
            _id:newUserToken._id,
            name:newUserToken.name,
        }
    const token =await jwt.sign(payload,process.env.SecretOrKey,{
            expiresIn:3600,
        });
    

        res.status(200).send({ user:newUserToken, message:"User is saved",token:`Bearer ${token}` });
    } catch (error) {
    res.status(500).send("can not save the user");
    console.log(error);
    }
    };





exports.loginUser=async (req,res)=>{
        const {email,password}=req.body
    try {
        //find if the user exist
        const searchedUser = await User.findOne({email});
        //if the email not exist
        if(!searchedUser){
            return res.status(400).send({msg:"bad credential"});
        }
        //password are equals
        const match =await bcrypt.compare(password,searchedUser.password);

        if(!match){
            return res.status(400).send({msg:"bad credential"});
        }
        //creer un token
        const payload = {
            _id:searchedUser._id,
            name:searchedUser.name,
        }
        const token =await jwt.sign(payload,process.env.SecretOrKey,{
            expiresIn:3600,
        });
        console.log(token);
        //send the user 
        res.status(200).send({user: searchedUser, msg: "success" ,token:`Bearer ${token}`});
    } catch (error) {
        res.status(500).send({msg:"can not get the user"});
        console.log(error)
    }
    };