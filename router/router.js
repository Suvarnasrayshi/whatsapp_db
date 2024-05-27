var express = require("express");
const bodyParser = require("body-parser");
const dataresult = express.Router();

const {getuser,postuser,getalluser,postupdateuser,postdelete} = require
('../controller/user');

const{getallcontact,getcontact,postcontact,postdeleteconatct
  ,postupdatecontact}=require('../controller/contact')


const{getmessage,getallmessage,postdeleteconatct,postmessage
  ,postupdatemessage}=require('../controller/message')

  dataresult.route("/user").get(getuser);
  dataresult.route("/user").post(postuser);
  dataresult.route("/user/:id").get(getalluser);
  dataresult.route("/user/:id/update").post(postupdateuser);
  dataresult.route("/user/:id/delete").post(postdelete);


  dataresult.route("/contact").get(getcontact);
  dataresult.route("/contact").post(postcontact);
  dataresult.route("/contact/:id").get(getallcontact);
  dataresult.route("/contact/:id/update").post(postupdatecontact);
  dataresult.route("/contact/:id/delete").post(postdeleteconatct);


  dataresult.route("/message").get(getmessage);
  dataresult.route("/message").post(postmessage);
  dataresult.route("/message/:id").get(getallmessage);
  dataresult.route("/message/:id/update").post(postupdatemessage);
  dataresult.route("/message/:id/delete").post(postdeleteconatct);

module.exports = dataresult;
