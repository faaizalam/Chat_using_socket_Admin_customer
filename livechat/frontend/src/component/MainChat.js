import React, { useContext, useEffect, useRef, useState} from 'react'
import Col from 'react-bootstrap/esm/Col'

import Row from 'react-bootstrap/esm/Row'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { UsermsgAction } from '../Store/Action'
import { Providsdata } from './Usercontext'
import Alert from 'react-bootstrap/Alert';
import { Msgreducer } from '../Store/Reducer'
import socketclient from "socket.io-client"

const Endpoints=window.location.host.indexOf("localhost")>=0?"http://127.0.0.1:7000":window.location.host
// const Endpoints=window.location.host
console.log(Endpoints)



export const MainChat = () => {
    const {user}=useContext(Providsdata)
   const dispatch= useDispatch()
   const {Userinfo}=useSelector((state)=>state.UserSign)
   const {messages,isLoading,error }=useSelector((state)=>state.Chat)
   const {Sucess}=useSelector((state)=>state.Msgstate)
   const {socket,setsocket}=useContext(Providsdata)
   const {sockmsg,setsockmsg}=useContext(Providsdata)
  let [allmsg,setallmsg]=useState([])

   const Refcon=useRef(null)

    useEffect(()=>{
      if (messages) {
        setallmsg(messages)
   
  
        
      } 
      

    },[messages])
    useEffect(()=>{
      if (sockmsg.name) {
        console.log(sockmsg)
        setallmsg([...allmsg,sockmsg])
     
        setsockmsg({})
          
  
        
      } 
      

    },[allmsg, setsockmsg, sockmsg])




     
    useEffect(()=>{
      
      if ((user._id && Userinfo._id) ||Sucess ) {
          dispatch(UsermsgAction({senderid:Userinfo._id,reciverid:user._id},Userinfo.token))
          console.log(user._id,"reset")
          dispatch(Msgreducer.actions.msgReset())
          
        }
        
        
       
    
    },[Sucess, Userinfo._id, Userinfo.token, dispatch, user._id])
    useEffect(()=>{
      if(Refcon.current)
      Refcon.current.scrollBy({
        top:Refcon.current.scrollHeight,
        

      })
    })












  useEffect(()=>{
    const sk=socketclient(Endpoints)
    if(!socket){
      setsocket(sk)
     
        sk.emit("onlogin",(Userinfo))
    }
  
    
  
  },[Userinfo, setsocket, socket])
  
  






   
   
  return (

      
        
        <Col className='col2' ref={Refcon} xs={8}>
            <Row>{!user._id&&<div>Kindly select to start conversation</div>}</Row>
            <Row  className='mainchat1'>{user.email&& user.email}{user._id&&user._id}</Row>
            <Row>{isLoading&&<Spinner animation="grow" />}</Row>
              {/* {messages.length} */}
            <Row>{error&&(<Alert className='small'>{error}</Alert>)}</Row>
            <Row>{
             allmsg.length>0&&
            (allmsg.map((x,index)=>(
              <Row className='msg' key={x._id}>
                <Row className={x.from===Userinfo._id?"Activeuser":"none"} >{x.name}<Row className={x.from===Userinfo._id?"Activeuser idmsg":"msgnon"} >{x.msg}</Row></Row>
                
                </Row>
            )))
            
            }</Row>
  
            </Col>
        
        
        
        

   
    
       
       
     
  )
}
