import mongoose from "mongoose";


const UsermsgSchema=new mongoose.Schema({
 messages:[{from:{type:String,required:true},
    to:{type:String,required:true},
    msg:{type:String,required:true},
    name:{type:String,required:true}
    

}]
},{timestamps:true})




const UserSchema=new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  image:{type:String},
  conversations:[UsermsgSchema],
  isAdmin:{type:Boolean,default:false},
 


})


const UserChat=mongoose.model("UserChat",UserSchema)
export default UserChat