const notFound= (req,res, next)=>{
    const error = Error ("notound")
   // console.log(error)
    //return res.send("what")
    next(error)
    
}

module.exports= notFound
