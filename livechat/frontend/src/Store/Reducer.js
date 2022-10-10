import { createSlice } from "@reduxjs/toolkit";



const initialState={
    Userinfo:localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):{},
     isLoading:false,
     error:"",
    //  alluserLoading:false,
     Alluser:[],
    //  allusererror:""
    messages:[],
    Sucess:false
 }


export const UserinfoSlice=createSlice({
    name:"userinfo",
    initialState,
    
    reducers:{
        Useronfoloading:(state)=>{
            state.isLoading=true

        },
        UserinfoSucccs:(state,action)=>{
            console.log(action.payload)
            state.isLoading=false;
            state.Userinfo=action.payload.payload
            

        },
        Userinfofail:(state,action)=>{
            state.isLoading=false;
            state.error=action.payload.err

        }

    }

})


export const AllUserSlice=createSlice({
    name:"Alluser",
    initialState,
    
    reducers:{
        Userlistload:(state)=>{
            state.isLoading=true
            
        },
        UserlistSucccs:(state,action)=>{
           
            
            state.isLoading=false;
            state.Alluser=action.payload.payload
            
            

        },
        UserlistFail:(state,action)=>{
            state.isLoading=false;
            state.error=action.payload.err

        }

    }

})




export const Chatslice=createSlice({
    name:"Chatslice",
    initialState,
    
    reducers:{
        msgload:(state)=>{
            state.isLoading=true
            
        },
        msgSucces:(state,action)=>{
            console.log(action.payload)
            
            state.isLoading=false;
            state.messages=action.payload
            
            

        },
        msgFaild:(state,action)=>{
            state.isLoading=false;
            state.error=action.payload

        }

    }

})


export const Msgreducer=createSlice({
    name:"Msg",
    initialState,
    reducers:{
        msgsendloads:(state)=>{
            state.isLoading=true
        },
        msgsendsucess:(state,action)=>{
            
            state.isLoading=false
            state.Sucess=true
        },
        msgSensFaild:(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        },
        msgReset:(state)=>{
          state.Sucess=false    
        }



    }
})










export const actions=UserinfoSlice.actions
export const actionalluser=AllUserSlice.actions
export const chatactions= Chatslice.actions

