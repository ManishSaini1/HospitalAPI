const mongoose=require('mongoose');

const doctorSchema=mongoose.Schema
({
    email:
    {
        type: String, 
        required: true,
        
    },
    password:
    {
        type:String, 
        required: true
    }
},
{
    timestamps :{}
});
const Doctor= mongoose.model('doctorSchema', doctorSchema);
module.exports=Doctor;