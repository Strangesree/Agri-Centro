const express = require("express");
const bodyparser = require("body-parser");
const mongoose  = require("mongoose");
let alert = require('alert'); 

const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

const mongoDB = "mongodb://127.0.0.1:27017/appointmentDB";
mongoose.connect(mongoDB)
  .then(() => { console.log('Successfully connected to MongoDB'); })
  .catch((err) => { console.error('Error connecting to MongoDB', err); });

const appointmentschema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    date:String
})

const Item = mongoose.model("appointment",appointmentschema);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/appointment.html");
})

app.post("/",function(req,res){
    var fname = req.body.name;
    var femail = req.body.email;
    var fphone = req.body.phone;
    var fdate = req.body.date;

    //console.log(fname  + email + phone + date)

    const item = new Item({
        name:fname,
        email:femail,
        phone:fphone,
        date:fdate
    });

    item.save();
    alert("message");
    res.redirect("/");
}) 

app.listen(3000,function(){
    console.log("server started on port 3000");
});