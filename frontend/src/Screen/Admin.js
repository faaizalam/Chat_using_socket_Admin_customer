import React, { useEffect, useRef, useState } from 'react'
import socketclient from "socket.io-client"
// const Endpoint =window.location.host.indexOf('localhost')>=0?'localhost://127.0.0.1:5000':window.location.host
const Endpoint=window.location.host.indexOf("localhost")>=0?"http://127.0.0.1:5000":window.location.host;


export const Admin = () => {
  // const {search,pathname}=useLocation()

  const [messagebody,setmessagebody]=useState('')
  const [messages,setmessages]=useState([])
  const [users,setusers]=useState([])
  const [socket,setsocket]=useState(null)
  const [selecteduser,setselecteduser]=useState({})
  const uimessage=useRef(null);
  const [truefalse,settrue]=useState(false)
  useEffect(()=>{
    console.log(truefalse)
  },[truefalse])

useEffect(()=>{

  const sk=socketclient(Endpoint)
  if (!socket) {
    setsocket(sk)
    sk.emit("Onlogin",({
      name:"Admin"
    }))

    
  }
  
  
  
},[socket])








  useEffect(()=>{
    if (uimessage.current) {
      uimessage.current.scrollBy({
        top:uimessage.current.scrollHeight,
        behavior:"smooth"
      })
      
    }
    if (socket) {
    
     
      

  socket.on("listuser",(data)=>{
    setusers(data)
  })


      
   

    socket.on("message",(msg)=>{
      if (msg.name===selecteduser.name) {

        setmessages([...messages,msg])
        // setselecteduser({...selecteduser,unread:false})
        
      }else{

        const usercheck=users.find((x)=>x.name===msg.name)
        if (usercheck) {
          const changestatus=users.map((x)=>x.name===usercheck.name?{...x,unread:true}:x)
          // const newsetuser= users.map((x)=>x.name===usercheck.name?{...x,unread:true}:x)
          // setusers([...users,newsetuser])
          setusers(changestatus)
          
        }
   



      }
    })

    socket.on("selecteduser",(data)=>{
      console.log(data.messages)
        setmessages(data.messages)

    })
  }
      
  },[messages, selecteduser.name, socket, users,setmessages])


  const selectionprocess=((user)=>{
    console.log(user)
     setselecteduser(user)
     settrue(true)
     if (socket) {
      
       socket.emit("OnUserSelected",user)
     }


  })








const submithandler=((e)=>{
  e.preventDefault()
 if(!messagebody){
  alert("please write text")
 }else{
setmessages([...messages,{body:messagebody,from:"Admin",to:selecteduser.name}])


setTimeout(()=>{

socket.emit("Onmessage",{
     body:messagebody,
     from:"Admin",
     to:selecteduser.name
})

},1000)




 }




})







  return (
    <div className='mainAdmin'>

      <div>
        <h1>Users</h1>
        {
          users.filter((x)=>x.name!=="Admin").map((x,index)=>(
            <li  className='arrow'onClick={()=>selectionprocess(x)} key={index}>{x.name}</li>

          ))
        }
      </div>
      <div>
        <ul className='names' ref={uimessage}>
          {
            messages.map((x,index)=>(
              <li  key={index}>
                {x.body}
                </li>
            ))
          }
        </ul>
      

   <form onSubmit={submithandler}>
    
   <input onChange={(e)=>setmessagebody(e.target.value)}></input>
  <button>Send</button>

   </form>
      </div>
      




    </div>
  )
}
