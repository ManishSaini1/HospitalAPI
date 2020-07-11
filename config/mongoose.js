const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/HospitalAPI');
const db=mongoose.connection;
db.on('error', console.error.bind(console, "Error on Connecting DB"));
db.once("open", function()
{
    console.log("Connnected to :: Mongo DB");
});
module.exports=db;
