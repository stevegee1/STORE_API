//Connect to MongoDB 

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectMongoDB = async (url) => {
  try {
    await mongoose.connect(url, {
     // useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      //useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectMongoDB;
