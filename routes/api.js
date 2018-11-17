const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

const justify = require("../utils/justify");

module.exports = app => {
  function authMiddleware(req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token)
      return res.status(401).send({
        auth: false,
        message: "No token provided."
      });
    jwt.verify(token, "mytestserver", (err, decoded) => {
      if (err)
        return res.status(500).send({
          auth: false,
          message: "Failed to authenticate token."
        });
      req._token = decoded;
    });
    next();
  }

app.get('/',(req,res)=>{
  res.render('index.html');
})

  app.post("/api/token", (req, res) => {
    const { email } = req.body;

    if(!email   || email===''  ){
      return res.send({
        msg:'email is required'
      })
    }

    User.findOne({
      email
    }).then(user => {
      if (user) {
        return res.json({
          status: 200,
          msg: "User Already  have a token ..."
        });
      }

      const token = jwt.sign(email, "mytestserver");

      const userProfile = new User({
        email: email,
        token: token
      });

      userProfile.save();
      res.json({
        status: 200,
        token: token,
        msg: "token Added.."
      });
    });
  });

  app.post("/api/justify", authMiddleware, async (req, res) => {
    //manage date
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    let total = 0;
    let arr = req.body.split("\n");
    if(! req.body || req.body==='' ){
      return  res.send({msg:"make sure to enter a text!!"})
    }

    const nbMots = req.body.length;

    try {
      const user = await User.findOne({
        email: req._token
      });
    if(user){
      user.text.map(item => {
        const itemYear = item.date.getFullYear();
        const itemMonth = item.date.getMonth();
        const itemDay = item.date.getDay();

        if (itemYear === year && itemMonth === month && itemDay === day) {
          total += item.numberOfWords;
        }
      });
    }

      let justifiedText = "";
      arr.forEach(ch => {
        if (!ch.trim() == "") {
          justifiedText += justify(ch) + "\n";
        }
      });
      if (total <= 80000) {
        res.send(justifiedText);
        if(user ){
        user.text.push({
          date: new Date(Date.now()),
          numberOfWords: nbMots
        });
        await user.save();
      }
      } else {
        res.status(402).send({
          msg: "Payment required!!"
        });
      }
    } catch (e) {
      console.error(e);
    }
  });
};
