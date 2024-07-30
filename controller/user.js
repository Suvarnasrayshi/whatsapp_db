const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const { user,session } = require('../models')
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

exports.registration = async (req, res) => {
  
  try {
    const { username, phoneNumber, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = await user.create({
      username:username,
      phoneNumber:phoneNumber,
      email:email,
      password:hashPass,
    });
  console.log(newUser);
    res.json(newUser)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const loginverify = await user.findOne({ where: { email } });
    if (!loginverify) {
      return res.status(401).json({ error: 'Invalid email' });
    }
    else{
     const newPassword=bcrypt.compare(password,loginverify.password);
     console.log(newPassword,"password-old",password)
     if(newPassword){
    const token = jwt.sign({ id: loginverify.id }, 'your_secret_key', { expiresIn: '1h' });
    console.log("token:",token)
    console.log("USERID",loginverify.id)
    res.cookie('token', token, { httpOnly: true });
    const getSession= await session.findOne({
      attributes: ['id', 'userid', 'session_token', 'createdAt', 'updatedAt'],
      where:{userid:loginverify.id},

    })
    console.log("getSession")
    if(getSession==null){
      const createSession=await session.create({
        userid:loginverify.id,
        session_token:token
      })
    }
    res.json({login:loginverify,token:token})
    }
  }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};





exports.getalluser = async(req,res)=>{
try {
  const users = await user.findAll();
      res.status(200).json(users);
} catch (error) {
  console.log(error);
}
}


exports.postupdateuser = async(req,res)=>{
  try {
    const updated = await user.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await user.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
  }
  }


  exports.postdelete =async(req,res)=>{
    try {
      const deleted = await user.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.log(error);
    }
  }