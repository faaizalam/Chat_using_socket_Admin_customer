import React, { useEffect, useRef, useState } from 'react'

import socketIOClient from "socket.io-client"
const Endpoint=window.location.host.indexOf("localhost")>=0?"http://127.0.0.1:5000":window.location.host;


export const Chat = () => {

    const userefmessage=useRef(null);
    const [username,setusername]=useState(localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):"")
   
    const [messages,setmessages]=useState([])
 
    const [socket,setsocket]=useState(null)
const [isopen,setopen]=useState(false)
    const [messagebody,setmessagebody]=useState(" ")


    


   useEffect(()=>{
     
    if(socket){
        socket.emit("Onlogin",{name:username,id:"123"})
      


    }
 


   },[socket,username])




useEffect(()=>{
    if(userefmessage.current){
        userefmessage.current.scrollBy({
            top: userefmessage.current.scrollHeight,
      
            behavior:"smooth"
        })
      }
    if (socket) {
        socket.on("message",(data)=>{
            console.log(data,"j")
            setmessages([...messages,data])

        })
        
    }
},[messages, socket])









   


const submithandler=()=>{
    
setusername(prompt("name yoursel"))
setopen(true)

const sk= socketIOClient(Endpoint)
setsocket(sk)
  
    

}
const closehandler=(()=>{
    setopen()
})

const chatclintsubmit=(e)=>{
    e.preventDefault()
    if (!messagebody.trim()) {
        alert("please type something to start converstaion")
        
    }else{
     setmessages([...messages,{body:messagebody,from:username,to:"Admin"}])
     setTimeout(()=>{
         socket.emit("Onmessage",{
             body:messagebody,
             from:username,
             to:"Admin"
            })
        },1000)
        
        setmessagebody('')
    }
    
}


  return (




    <div className='chatbox'>
    {
       !isopen? (<button className='but' onClick={submithandler}>
            Chat with us <i className="fa fa-question-circle" aria-hidden="true"></i>
        </button>):(
            <div className='fix'>
                <div  onClick={closehandler}>X</div>
                <hr/>
                <ul  ref={userefmessage}>
                              
                    {  !messages.length&&(<div>no messages</div>)}
               {
               messages.map((x,index)=>(
              <div key={index}>

                <li >
                   {x.from}
                </li>
                   <li>

                   {x.body}
                   </li>
              </div>

               ))}
    
                   
                </ul>
                
                <form onSubmit={chatclintsubmit}>
                    <textarea type='text' value={messagebody}  onChange={(e)=>setmessagebody(e.target.value)} placeholder='type message'></textarea>
                    <button>Send</button>
                   

                </form>
                
                </div>
        )
        
    }
        
       


    </div>
  )
}
