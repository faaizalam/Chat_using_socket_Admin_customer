import jwt from "jsonwebtoken"
export const  maketoken=((data)=>{
    return jwt.sign({
        name:data.name,
        email:data.email,
        _id:data._id,
        password:data.password

    },"secretkey",{expiresIn:"5min"})

})


export const tokencheck=((req,res,next)=>{
    const token = req.headers.token
    
    if (token) {
        const maintokenvalue=token.slice(7,token.length)
        jwt.verify(maintokenvalue,"secretkey",function(err,dec){
            if(err){
                res.send({message:"token expired"})
            }else{
                req.user=dec
                next()
            }

        })
        
    }else{
        res.send({message:"token is invalid"})
    }
})