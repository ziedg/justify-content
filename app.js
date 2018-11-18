const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
//connect to the DataBase...





var mongodbUri ="mongodb://@ds163683.mlab.com:63683/justify";
mongoose.connect(mongodbUri, {
  auth: {
    user: 'zied',
    password: 'zied1234'
  }
})
var conn = mongoose.connection;    
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', () =>{
 console.log('connected to a database')                        
});

const app = express();


//middlewars
app.use(express.static(path.join(__dirname,'public')));
app.use(cors({ origin: true }));

app.use(bodyParser.json())
app.use(bodyParser.text());
app.use(bodyParser.text({ type: "json" }));

require("./routes/api")(app);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`App is up at port ${PORT} `);
});
