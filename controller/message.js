const express = require("express");
const app = express();
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
app.set("view engine", "ejs");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const { user, contact, message } = require('../models')
app.use(bodyParser.urlencoded({ extended: true }));

exports.getmessage = async (req, res) => {
  // res.render('user');
  res.send("hello")
  console.log("hello");
}

exports.postmessage = async (req, res) => {
  try {
    const { receiver_id, content } = req.body;
    const sender_id = req.user.id;
    const userdata = await message.create({
      receiver_id:receiver_id,
      content:content,
    });

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
      where: { id: req.user.id }
    });
    if (updated) {
      const updatedUser = await message.findByPk(req.user.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
  }
  }


  exports.postdeletemessage =async(req,res)=>{
    try {
      const deleted = await message.destroy({
        where: { id: req.user.id }
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

exports.markMessageAsRead=async(req, res) =>{
    try {
      const { id } = req.body;
      const [updated] = await message.update({ is_read: 1 }, {
        where: { id: id }
      });
      if (updated) {
        const updatedMessage = await message.findByPk(id);
        res.status(200).json(updatedMessage);
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

