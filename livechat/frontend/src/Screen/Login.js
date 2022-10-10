import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Userlogin } from '../Store/Action';


export const Login = () => {
const { isLoading ,error,Userinfo}=useSelector((state)=>state.UserSign)
const navigate=useNavigate()

const [email,setemail]=useState("")
const [pass,setpass]=useState("")

  const dispatch=useDispatch()
  
useEffect(()=>{
  // console.log(Userinfo.name)
  
  if(Userinfo.name){
    navigate("/Admin")

  }else{
    navigate("/")
  }

},[Userinfo, navigate])
useEffect(()=>{
  console.log(Userinfo)
 },[Userinfo])

const handleSubmit=((e)=>{
  e.preventDefault()
 dispatch(Userlogin({email,pass}))
})





  return (
    <Container className='logcon'>
      
       <Form className='loginform' onSubmit={handleSubmit}>
        {isLoading&&<Spinner animation="grow" />}
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=>setemail(e.target.value)}  type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control   onChange={(e)=>setpass(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    {error && <Alert className='small'>{error}</Alert>}
    </Form>
 
  </Container>
  )
}
