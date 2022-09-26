
import  express  from "express"
import http from 'http'
import path from 'path'
import mongoose from "mongoose"
import {Server} from "socket.io"
const app = express()
const server = http.createServer(app);
const port = 5000


const working=mongoose.connect(process.env.MONGODB_URL||"mongodb://localhost/convertry")
try {
    if (working) {
    
        
    }
    
} catch (error) {
    console.log(error)
    
}

const __dirname=path.resolve()
app.use(express.static(path.join(__dirname,'../frontend/build')))
app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})


// const httpServer = http.Server(app);
const io=new Server(server,{cors:{origin:'*'}})
// const io = new Server(httpServer, { cors: { origin: "*" } });

let users=[];
console.log(users)
io.on('connection',(socket)=>{

   
    

    
    socket.on('Onlogin',(newUser)=>{
        // console.log(newUser)
        console.log("connected")
        const updateduser={
            ...newUser,
            online:true,
            socketId:socket.id,
            messages:[]
            
        }
       
        const existuser=users.find((x)=>x.name===newUser.name)
         console.log(existuser)
        if (existuser) {
            
    console.log("working")
            existuser.socketId=socket.id;
            existuser.online=true
            io.to(existuser.socketId).emit("message",existuser.messages)
            
        }else{
            // console.log(updateduser)
            users=[...users,updateduser]
          
        }
        const admin=users.find((x)=>x.name==="Admin"&& x.online)     
        if(admin){
            io.to(admin.socketId).emit("updateduser",updateduser)
        }   

        if(updateduser.name==="Admin"){
            io.to(admin.socketId).emit('listuser',users)
        }
    })

    socket.on('disconnect',()=>{
        const userlogout=users.find((x)=>x.socketId===socket.id)
        if (userlogout) {
            userlogout.online=false
            const adminaware=users.find((x)=>x.name==='Admin'&& x.online)
            if (adminaware) {
                io.to(adminaware.socketId).emit('updateduser',users)
                
            }
            
        }

    })
    socket.on('OnUserSelected',(selecteduser)=>{
      
        const Admin=users.find((x)=>x.name==="Admin"&&x.online)
        if (Admin) {
            const selecteuser=users.find((x)=>x.name===selecteduser.name)
            io.to(Admin.socketId).emit('selecteduser',selecteuser)
            
        }

        
        
    })
    socket.on('Onmessage',(message)=>{
      
        console.log(message)
         
        if(message.from==="Admin"){
            const usersendTo =users.find((x)=>x.name===message.to && x.online)

            console.log(usersendTo)

            if(usersendTo){
                io.to(usersendTo.socketId).emit("message",message)
                usersendTo.messages.push(message)
                 console.log("user")

            }else{
               io.to(socket.id).emit('message',{
                from:"System",
                to:"Admin",
                body:"User is not online"
               })
            }
        }else{
            // console.log(message)
          const Admin=users.find((x)=>x.name==="Admin" && x.online)
            if(Admin){
                console.log("this")
                io.to(Admin.socketId).emit('message',message)

                const userTostore=users.find((x)=>x.name===message.from&& x.online)
                
                if (userTostore) {
                
                    userTostore.messages.push(message)
                    
                  
                }
            }else{
                io.to(socket.id).emit('message',{
                    from:"system",
                    to:message.from,
                   body:"sorry ! admin is not online " 
                })
              




            }

        }
        
    })


})



app.get('/', (req, res) => res.send('Hello World!'))


server.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`)
})

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))