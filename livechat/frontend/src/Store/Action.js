import { actionalluser, actions, chatactions } from "./Reducer"
import Axios from "axios"
import { Msgreducer } from "./Reducer"


export const Userlogin=((datainfo)=>async(dispatch,getState)=>{
    
    
    dispatch(actions.Useronfoloading())

    try {
      
        const {data}=await Axios.post(`/postman/msg/Signin`,datainfo)
        if (data.user.name) {
            // const payload={
            //    data:data.user
            // }
            dispatch(actions.UserinfoSucccs({payload:data.user}))
            localStorage.setItem("userinfo",JSON.stringify(data.user))
            
        }else{
            const payload={
                err:data.message
            }
            dispatch(actions.Userinfofail(payload))

        }
        
        
    } catch (error) {
        const payload={
            err:error.response && error.response.data.message?error.response.data.message:error.message
        }
        dispatch(actions.Userinfofail(payload))
    }



})



// alluseraction
export const UserlistAction=(()=>async(dispatch,getState)=>{
    
    dispatch(actionalluser.Userlistload())
 
    try {

      
        const {data}=await Axios.get(`/postman/msg/alluser`,
       
        )
        if (data) {
           
            // const payload={
            //    data:data.user
            // }
            dispatch(actionalluser.UserlistSucccs({payload:data}))
            // localStorage.setItem("userinfo",JSON.stringify(data))
            
        }else{
            const payload={
                err:data.message
            }
            dispatch(actionalluser.UserlistFail(payload))

        }
        
        
    } catch (error) {
        const payload={
            err:error.response && error.response.data.message?error.response.data.message:error.message
        }
        dispatch(actions.UserlistFail(payload))
    }



})



// ............user mSg get
export const UsermsgAction=((id,token)=>async(dispatch,getState)=>{
    console.log(id.senderid,id.reciverid)

    dispatch(chatactions.msgload())
    const {UserSign:{Userinfo}}=getState()
    try {
   const {data}= await Axios.get(`/postman/msg/Chats/${id.senderid}?reciverid=${id.reciverid}`,{
    headers:{
        token:`Bearer ${token}`
    }
   })
//    console.log(data.messages,"hh")
   if (data.messages) {
    const payload=data.messages
    dispatch(chatactions.msgSucces(payload))
    
   }else{
    const payload=data.message
    dispatch(chatactions.msgFaild(payload))
   }
        
    } catch (error) {
        const payload=error.response&&error.response.data.message?error.response.data.message:error.message
        dispatch(chatactions.msgFaild(payload))
        
    }
  



})


 export const sendmsgaction=(msginfo)=>(async(dispatch)=>{
     const id=msginfo.messages.find((x)=>x.from)
    dispatch(Msgreducer.actions.msgsendloads())
   
    try {
        const {data}=await Axios.post(`/postman/msg/${id.from}/m`,msginfo)
        if (data) {
            console.log(data,"ins")

            const payload=data
          dispatch(Msgreducer.actions.msgsendsucess(payload))
          
          
        }else{
            const payload=data.message
            dispatch(Msgreducer.actions.msgSensFaild(payload))
            
        }
        
    } catch (error) {
        const payload=error.response&& error.response.data.message?error.response.data.message:error.message
      dispatch(Msgreducer.actions.msgSensFaild(payload))
    
  }


})