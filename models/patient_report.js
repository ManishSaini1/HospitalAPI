const mongoose=require('mongoose');


const reportSchema=mongoose.Schema(
{

    doctor:
    {
        type: String
    },
    patient:
    {
        type: String
    },
    status:
    {
        type: String
    },

    date:
    {
        type: Date
    }
},
{
    timeStamps :{}
});
const Report = mongoose.model('Report', reportSchema);
module.exports=Report;
