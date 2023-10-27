const mongoose=require("mongoose")
const schema=mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true,
        select:false  
        // here select means it is not shown to anyone bydefault
    },
    bankBalance:
    {
        type:Number,
        default:0
    }
})
const User=mongoose.model("User",schema)
module.exports=User

