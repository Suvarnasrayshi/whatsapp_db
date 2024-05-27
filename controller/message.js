const express = require("express");
const app = express();
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
app.set("view engine", "ejs");
const router = express.Router();
const bodyParser = require("body-parser");
const { user, contact, message } = require('../models')
app.use(bodyParser.urlencoded({ extended: true }));

exports.getmessage = async (req, res) => {
  // res.render('user');
  res.send("hello")
  console.log("hello");
}

exports.postmessage = async (req, res) => {
  try {
    const userdata = await message.create(req.body);

    res.json(userdata);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

exports.getallmessage = async(req,res)=>{
try {
  const users = await message.findAll();
      res.status(200).json(users);
} catch (error) {
  console.log(error);
}
}


exports.postupdatemessage = async(req,res)=>{
  try {
    const updated = await message.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await message.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
  }
  }


  exports.postdeleteconatct =async(req,res)=>{
    try {
      const deleted = await message.destroy({
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