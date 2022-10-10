import  express  from "express";
import expressAsyncHandler from "express-async-handler";
import UserChat from "../Models/User.js";
import { maketoken, tokencheck } from "../utils.js";

const UserRouter=express.Router()

// specific conversation bring


  UserRouter.get('/alluser',async(req,res)=>{
    const alluser=await UserChat.find({})
    res.send(alluser)
   
})



// ........msgs

UserRouter.get('/Chats/:id',tokencheck,async(req,res)=>{
  console.log(req.user)

  // console.log(req.params.id)
  // console.log(req.query.reciverid)
  const reciverid=req.query.reciverid
  const Senderid=await UserChat.findById(req.params.id)
  if(Senderid){
    const senderinside=Senderid.conversations.find((x)=>x.messages.find((x)=>x.from===req.params.id&&x.to===reciverid))
    const reciverinside=Senderid.conversations.find((x)=>x.messages.find((x)=>x.to===req.params.id&&x.from===reciverid))
   if(senderinside){
    res.status(200).send(senderinside)
   }else if(reciverinside){
    
    res.status(200).send(reciverinside)
    
  }else{
    const messages=[]
    res.status(200).send({messages:messages})
  }
    
  }else{
    res.status(404).send({message:"no user found"})
  }

  
   
   
   
  })



// ...............











// .......user Msges.Making.............
UserRouter.post('/:id/m',expressAsyncHandler(async(req,res)=>{
  //  let id=req.params.id
    // console.log(req.body.messages)
  const newcon=await UserChat.findById(req.params.id)

  const insidemsg=req.body.messages.find((x)=>x.to)
  const sender=await UserChat.findById(insidemsg.to)
if ( sender && newcon ) {
  //   console.log(reciver)
        if (newcon && sender && newcon.conversations.length>0&& sender.conversations.length>0) {
    
      const insidemsg=req.body.messages.find((x)=>x.from)
      const ava=newcon.conversations.find((x)=>x.messages.find((x)=>x.from===insidemsg.from&&x.to===insidemsg.to))
      const a1=newcon.conversations.find((x)=>x.messages.find((x)=>x.from===insidemsg.to&&x.to===insidemsg.from))
      
      // console.log(ava)

      const insidemsgrec=req.body.messages.find((x)=>x.to)
      const reccheck=sender.conversations.find((x)=>x.messages.find((x)=>x.to===insidemsgrec.to&&x.from===insidemsgrec.from))
      const a2=sender.conversations.find((x)=>x.messages.find((x)=>x.to===insidemsg.from&&x.from===insidemsg.to))
      // console.log(a1,a2)
      if((ava && reccheck)){

        // console.log(finalstate)
        ava.messages.push(insidemsg)
        const respsavepush= await newcon.save()
      

        reccheck.messages.push(insidemsgrec)
        const reciverpush= await sender.save()
        res.send({messgae:"in old msgs push save",reciverpush,respsavepush})
        
      }else if(a1&&a2){
        a1.messages.push(insidemsg)
        const respsavepush= await newcon.save()
      

        a2.messages.push(insidemsgrec)
        const reciverpush= await sender.save()
        res.send({messgae:"in old msgs push save",reciverpush,respsavepush})

      }else{
        const  infosender ={
          messages:req.body.messages
        
         }
         const savenew= newcon.conversations.push(infosender)
         const sendnew=await newcon.save()
        //  res.send({message:"new msgs save",sendnew})
        //  re
           const  inforeciver ={
          messages:req.body.messages
        
         }
         const savereciver= sender.conversations.push(inforeciver)
         const reciverstate=await sender.save()
         res.send({message:"new msgs save",reciverstate,sendnew})
}
    }else{
    
     const  infosender ={
    messages:req.body.messages
  
   }
   const savenew= newcon.conversations.push(infosender)
   const sendnew=await newcon.save()
  //  res.send({message:"new msgs save",sendnew})
  //  re
     const  inforeciver ={
    messages:req.body.messages
  
   }
   const savereciver= sender.conversations.push(inforeciver)
   const reciverstate=await sender.save()
   res.send({message:"new msgs save",reciverstate,sendnew})
   }

  }else{
   

    res.status(404).send({message:"no user found"})


  }
  

 


  
}))









// ........Signup..........


UserRouter.post('/Signup',expressAsyncHandler(async(req,res)=>{
   
  

  const Checkavaliblity=await UserChat.findOne({email:req.body.email})

  if (Checkavaliblity) {
       res.status(409).send({message:"Already Exits"})
       return
  }else{
    const user={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        image:req.body.image,
        isAdmin:req.body.isAdmin,
        
    }

    const savingdata= new UserChat(user)
    const sendsdata=await savingdata.save()
    if(sendsdata){
      let usermade={
        email:sendsdata.email,
        name:sendsdata.name,
        _id:sendsdata._id,
        token:maketoken(sendsdata)

      }

      res.status(201).send({messgae:"new user pop up",user:usermade})
    }else{
      res.status(500).send({message:"problems"})
    }
  


  }

}))

// ......Login.........

UserRouter.post('/Signin',expressAsyncHandler(async(req,res)=>{

  const Checkavaliblity=await UserChat.findOne({email:req.body.email})
  if (!Checkavaliblity) {
    
    res.status(404).send({message:"sorry invalid user or password"})
  }else{
      // console.log(Checkavaliblity)
      if(Checkavaliblity.password===req.body.pass){
        let userobj={
          name:Checkavaliblity.name,
          email:Checkavaliblity.email,
          _id:Checkavaliblity._id,
          password:Checkavaliblity.password,
          token:maketoken(Checkavaliblity)
        }
      res.status(200).send({message:"exits",user:userobj})

    }else{
      res.status(200).send({message:"password or email"})

    }
  }

}))

// ..............Messages...../











export default UserRouter