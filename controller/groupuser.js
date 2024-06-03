const express = require("express");
const app = express();
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
app.set("view engine", "ejs");
const router = express.Router();
const bodyParser = require("body-parser");
const { groupuser, contact, message } = require('../models')
app.use(bodyParser.urlencoded({ extended: true }));

exports.getgroupuser = async (req, res) => {
  // res.render('groupuser');
  res.send("hello")
  console.log("hello");
}

exports.postgroupuser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const groupuserdata = await groupuser.create({
      group_id,
      user_id:user_id,
    });

    res.json(groupuserdata);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

exports.getallgroupuser = async(req,res)=>{
try {
  const groupusers = await groupuser.findAll();
      res.status(200).json(groupusers);
} catch (error) {
  console.log(error);
}
}


exports.postupdategroupuser = async(req,res)=>{
  try {
    const updated = await groupuser.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedgroupuser = await groupuser.findByPk(req.params.id);
      res.status(200).json(updatedgroupuser);
    } else {
      res.status(404).json({ error: 'groupuser not found' });
    }
  } catch (error) {
    console.log(error);
  }
  }


  exports.postdeletegroupuser =async(req,res)=>{
    const { user_id, group_id } = req.body;
    try {
      const deleted = await groupuser.destroy({
        where: {user_id,group_id}
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'groupuser not found' });
      }
    } catch (error) {
      console.log(error);
    }
  }