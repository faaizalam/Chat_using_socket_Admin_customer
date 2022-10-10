import React, { useContext, useEffect, useState } from 'react'

import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MainChat } from '../component/MainChat'
// import { Providsdata } from '../component/Usercontext'
import Userlist from '../component/Userlist'
import { UserlistAction } from '../Store/Action';
import Button from "react-bootstrap/esm/Button"

import Form from 'react-bootstrap/Form';
import { Providsdata } from '../component/Usercontext'
import { sendmsgaction } from "../Store/Action"

export const Admin = () => {
  const { Userinfo } = useSelector((state) => state.UserSign)
  const { Alluser, isLoading, error } = useSelector((state) => state.UserList)

  const [msg, setmsg] = useState("")
  const { socket, setsocket } = useContext(Providsdata)

  const navigate = useNavigate()

  const { user } = useContext(Providsdata)
  const {sockmsg,setsockmsg}=useContext(Providsdata)
  // .........







  // ............

  useEffect(() => {
    if (Userinfo.name) {
      navigate("/Admin")
    } else {
      navigate("/")
    }
  }, [Userinfo, navigate])


  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(UserlistAction())


  }, [dispatch])

  useEffect(() => {

  }, [Alluser])


  useEffect(()=>{
    if (socket) {
      socket.on("message",(data)=>{
        setsockmsg(data)
       
      })
      
    }

  },[setsockmsg, socket])











  const sendhandle = ((e) => {
    e.preventDefault()
    if (!msg.trim()) {
      alert("kindly write something to send msg")
    } else {


      dispatch(sendmsgaction({ messages: [{ from: Userinfo._id, to: user._id, msg, name: Userinfo.name }] }))
      setmsg(" ")

      setTimeout(() => {
        if (socket) {
        socket.emit("onmsg",({_id:Userinfo._id,msg:msg,name:Userinfo.name,to:user._id,from:Userinfo._id}))
        console.log({_id:Userinfo._id,msg:msg,name:Userinfo.name,to:user._id})

        }


      }, 1000)
    }


  })





  return (
    <Container className='con1'>
      <Row className='row1'>
        <Col className='col1'>

          <Userlist Alluser={Alluser} isLoading={isLoading} error={error} />

        </Col>
        <MainChat></MainChat>
      </Row>
      <Row className='chatfoot'>
        <Col className='colfoot'>
          <Form onSubmit={sendhandle}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

              <Form.Control as="textarea" onChange={(e) => setmsg(e.target.value)} value={msg} placeholder='Write something' rows={2} />
            </Form.Group>
            <Button type="submit"> Send</Button>
          </Form>
        </Col>
      </Row>



      {/* </Container> */}
    </Container>
  )
}
