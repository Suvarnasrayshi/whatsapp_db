const express = require("express");
const app = express();
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
app.set("view engine", "ejs");
const router = express.Router();
const bodyParser = require("body-parser");
const { user, contact, message } = require('../models')
app.use(bodyParser.urlencoded({ extended: true }));

exports.getuser = async (req, res) => {
  // res.render('user');
  res.send("hello")
  console.log("hello");
}

exports.postuser = async (req, res) => {
  try {
    const userdata = await user.create(req.body);

    res.json(userdata);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

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