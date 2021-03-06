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
      req.token=token;
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

    var token = jwt.sign(email, "mytestserver");

    User.findOne({
      email
    }).then(user => {
      if (user) {
        return res.json({
          status: 200,
          token : token,
          msg: "User Already  have a token ..."
        });
      }

     

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
      return  res.send("make sure to enter a text!!")
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

      let justified= "";
      arr.forEach(ch => {


        if (!ch.trim() == "" ) {
         
          justifiedText += justify(ch+' ');
          
        }
        if(ch==''){
          
          justified+= justify(justifiedText)
          justifiedText=''
        }
      });
      justifiedText =justify(justifiedText)
      justified+= justify(justifiedText);
    

      if (total <= 80000) {
        res.send(justified);

        if(user ){
        user.text.push({
          date: new Date(Date.now()),
          numberOfWords: nbMots
        });
        await user.save();
      }
      } else {
        res.status(402).send(`U passed the day limit of today
        : ${new Date(Date.now()).toDateString()  } ----> Payement is required 
        `);
      }
    } catch (e) {
      console.error(e);
    }
  });
};
