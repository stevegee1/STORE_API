require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const notFound = require("./Middleware/notFoundMiddleware");
const errorHand = require("./Middleware/ErrorHandler");
const connecting = require("./MongoDB/connectDB");
const task = require("./Models/storeAPI_Model");
PORT = 5000;
//middleware
const connectionString = `mongodb+srv://steve:${process.env.password}@nodeexpressjs.qoawcx2.mongodb.net/SoreApi?retryWrites=true&w=majority`;
const productRouter = require("./Route/route_model");
// app.get("/", (req, res) => {

//   res.status(200).send("<h1>hel</> <a href='/api/v1'>product route</>");
// });
 //app.use(notFound);
app.use(express.json())
app.use("/api/v", productRouter);
app.use(errorHand);
app.use(notFound);
const start = async () => {
  await connecting(connectionString);

  //throw new Error ("you failedd us")
  app.listen(PORT, console.log(`connected to port ${PORT}`));

  //throw Error("you failed us");
  // try {
  //   await connecting(connectionString);
  //   console.log("connected");
  //   await task.create({name:"segun", completed: true})

  //   app.listen(PORT, console.log(`app listening on port ${PORT}`));
  // } catch (error) {
  //   console.log(error);
  // }
};
start();
