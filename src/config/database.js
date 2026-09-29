const mongoose = require("mongoose");


const dbconnect = async () => {
   try {
    await mongoose.connect(process.env.MONGODB_URL);
    
    console.log("connected to database");
    
   } catch (error) {
      console.log("database error", error);
   }
}

module.exports = dbconnect;