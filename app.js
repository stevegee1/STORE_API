

require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();


//importing module
const notFound = require("./Middleware/notFoundMiddleware");//notFound error module
const errorHand = require("./Middleware/ErrorHandler"); //errorHandler module
const connecting = require("./MongoDB/connectDB"); //Connecting to database module
const task = require("./Models/storeAPI_Model");  //StoreAPI_model module
const productRouter = require("./Route/route_model");//route module
PORT = 5000;

const connectionString = `mongodb+srv://steve:${process.env.password}@nodeexpressjs.qoawcx2.mongodb.net/SoreApi?retryWrites=true&w=majority`;


//middleware
app.use(express.json())
app.use("/api/v", productRouter);
app.use(errorHand);
app.use(notFound);

//Connecting to the database and connecting to the server
const start = async () => {
  await connecting(connectionString);

  app.listen(PORT, console.log(`connected to port ${PORT}`));

};
start();
