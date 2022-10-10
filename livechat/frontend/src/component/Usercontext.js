import React, { createContext, useEffect, useState } from 'react'



export const Providsdata=createContext(null)
export const Usercontext = ({children}) => {
const [user,setuser]=useState({})
const [socket,setsocket]=useState(null)
const [sockmsg,setsockmsg]=useState({})
 

useEffect(()=>{
    if(user){
        console.log(user)
    }
},[user])


  return (
   <Providsdata.Provider value={{user,setuser,socket,setsocket,sockmsg,setsockmsg}}>
       {children}
   </Providsdata.Provider>
  )
}
