const express = require("express");
const app = express();
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
app.set("view engine", "ejs");
const router = express.Router();
const bodyParser = require("body-parser");
const { user, contact, message } = require('../models')
app.use(bodyParser.urlencoded({ extended: true }));

exports.getgroup = async (req, res) => {
  // res.render('group');
  res.send("hello")
  console.log("hello");
}

exports.postgroup = async (req, res) => {
  try {
    const groupdata = await group.create(req.body);

    res.json(groupdata);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

exports.getallgroup = async(req,res)=>{
try {
  const groups = await group.findAll();
      res.status(200).json(groups);
} catch (error) {
  console.log(error);
}
}


exports.postupdategroup = async(req,res)=>{
  try {
    const updated = await group.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedgroup = await group.findByPk(req.params.id);
      res.status(200).json(updatedgroup);
    } else {
      res.status(404).json({ error: 'group not found' });
    }
  } catch (error) {
    console.log(error);
  }
  }


  exports.postdeletegroup =async(req,res)=>{
    try {
      const deleted = await group.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'group not found' });
      }
    } catch (error) {
      console.log(error);
    }
  }