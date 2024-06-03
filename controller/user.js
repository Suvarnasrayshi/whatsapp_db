const express = require("express");
const app = express();
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
app.set("view engine", "ejs");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const { user, contact, message } = require('../models')
app.use(bodyParser.urlencoded({ extended: true }));

exports.getuser = async (req, res) => {
  res.render('registration');
  // res.send("hello")
  // console.log("hello");
}

// exports.postuser = async (req, res) => {
//   try {
//     const userdata = await user.create(req.body);
//     const token = jwt.sign({ id: userdata.id }, 'your_secret_key', { expiresIn: '1h' });
//     res.json({ token, user: newUser });
//     // res.json(userdata);
//     // const contacts = await user.findAll(); // Fetch all contacts (users)
//     // res.render('chat', { user: loggedInUser, contacts, messages: [] });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// }



exports.postuser = async (req, res) => {
  try {
    const { username, phoneNumber, email, password } = req.body;
    const newUser = await user.create({
      username,
      phoneNumber,
      email,
      password,
    });

    const token = jwt.sign({ id: newUser.id }, 'your_secret_key', { expiresIn: '1h' });
    res.render('login')
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.postlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginverify = await user.findOne({ where: { email } });

    if (!loginverify) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: loginverify.id }, 'your_secret_key', { expiresIn: '1h' });
    // res.json({ token, user: loginverify });
    res.cookie('token', token, { httpOnly: true });
    const contacts = await user.findAll();
    
    res.render('chat', { user: loginverify, contacts, messages: [] });
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