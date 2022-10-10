
import express from "express"
import http from "http"

import path from 'path'
import mongoose from "mongoose"

import expressAsynhandler from 'express-async-handler'
import cors from "cors"
import UserRouter from "./Routes/User.js"

import { Server } from "socket.io"
const app = express()
app.use(cors())

const port = 7000


const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const working = mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/convertry", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("working")
}).catch((error) => {
    console.log(error)
})


const io = new Server(server, { cors: { origin: "*" } })



let users = []


io.on("connection", (socket) => {

    socket.on("onlogin", (data) => {
        // console.log(users)
      
       
        console.log("connected")
        let newuser = {
            ...data,
            Online: true,
            socketId:socket.id
 }
        const exitsuser = users.find((x) => x._id === data._id)
        if (exitsuser) {
            exitsuser.Online = true
            exitsuser.socketId=socket.id
}else{
    users=[...users,newuser]
}
    })

    socket.on("onmsg",(msg)=>{
        
        const userstatus=users.find((x)=>x._id===msg.to)
        if (userstatus) {
           console.log("in",userstatus)
           io.to(userstatus.socketId).emit("message",msg)  
           
        }else{
        console.log("double")
           io.to(socket.id).emit("message",{form:"Rebort",body:`i am  sorry ${msg.name}, user is not online but msg has been sent`})  

       }

    })







})

app.use((err, req, res, next) => {
    res.send({ err: err.message })
})

app.use('/postman/msg', UserRouter)

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))