const express = require("express");
const app = express();
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
app.set("view engine", "ejs");
const router = express.Router();
const bodyParser = require("body-parser");
const { groupmessage, contact, message } = require('../models')
app.use(bodyParser.urlencoded({ extended: true }));

exports.getgroupmessage = async (req, res) => {
  // res.render('groupmessage');
  res.send("hello")
  console.log("hello");
}

exports.postgroupmessage = async (req, res) => {
  try {
    const groupmessagedata = await groupmessage.create(req.body);

    res.json(groupmessagedata);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

exports.getallgroupmessage = async(req,res)=>{
try {
  const groupmessages = await groupmessage.findAll();
      res.status(200).json(groupmessages);
} catch (error) {
  console.log(error);
}
}


exports.postupdategroupmessage = async(req,res)=>{
  try {
    const updated = await groupmessage.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedgroupmessage = await groupmessage.findByPk(req.params.id);
      res.status(200).json(updatedgroupmessage);
    } else {
      res.status(404).json({ error: 'groupmessage not found' });
    }
  } catch (error) {
    console.log(error);
  }
  }


  exports.postdeletegroupmessage =async(req,res)=>{
    try {
      const deleted = await groupmessage.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'groupmessage not found' });
      }
    } catch (error) {
      console.log(error);
    }
  }