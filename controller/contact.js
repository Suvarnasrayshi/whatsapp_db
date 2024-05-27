const express = require("express");
const app = express();
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
app.set("view engine", "ejs");
const router = express.Router();
const bodyParser = require("body-parser");
const { user, contact, message,group } = require('../models')
app.use(bodyParser.urlencoded({ extended: true }));
const { Op } = require("sequelize");

exports.getcontact = async (req, res) => {
  // res.render('user');
  res.send("hello")
  console.log("hello");
}

exports.postcontact = async (req, res) => {
  try {
  const { user_id, contactnumber, name } = req.body;
  console.log(req.body);
  if(!user_id|| !contactnumber || !name){
    return res.json({error:"provide valid details here!"})
  }
    const userdetail = await user.findByPk(user_id);
    console.log(userdetail)
    let contactuser=await user.findOne({
      where :{
        phoneNumber:contactnumber
      }
    })
    if(!contactuser){
      return res.json({error:"user not found"});
    }
    console.log("contactuser",contactuser.id)
    const newcontact = await contact.create({
      user_id:user_id,
      contact_user_id:contactuser.id,
      name:name,
    })
    res.status(201).json(newcontact);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

exports.getallcontact = async (req, res) => {
  try {
    const users = await contact.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
}


exports.postupdatecontact = async (req, res) => {
  try {
    const updated = await contact.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await contact.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
  }
}


exports.postdeleteconatct = async (req, res) => {
  try {
    const deleted = await contact.destroy({
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
};


  exports.getsearchcontact = async (req, res) => {
   const name = req.query
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    let username =Object.values(name);
    // let a= json.stringfy(username)

    console.log(username);
    try{
      const contactname = await contact.findAll({
        where: {
        
            name: { [Op.like]: `%${username}%` } 
          
           
        },

      });

      const users = await user.findAll({
        where: 
              { phoneNumber: { [Op.like]: `%${username}%` } },

      });

      // res.json({users})
      const groups = await group.findAll({
        where: {
          name: { [Op.like]: `%${username}%` }
        },
        // include: [
        //   {
        //     model: user,
        //     through: { attributes: [] }
        //   }
        // ]
      });
    // res.status(200).json(groups);
      res.json({users,groups,contactname})
      

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};















