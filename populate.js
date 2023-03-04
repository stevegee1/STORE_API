require("dotenv").config()

const connectDB= require("./MongoDB/connectDB")
const Product= require("./Models/storeAPI_Model")
const jsonProduct= require("./products.json")
const url = `mongodb+srv://steve:${process.env.password}@nodeexpressjs.qoawcx2.mongodb.net/SoreApi?retryWrites=true&w=majority`;
const start = async()=>{
 try {
     await connectDB(url)
  await Product.deleteMany()
  await Product.create(jsonProduct)
  console.log("success!!!")
  process.exit(0)
 } catch (error) {
    console.log(error)
    process.exit(1)
    
 }
   

 
}

start()