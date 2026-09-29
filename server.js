require("dotenv").config();
const app = require("./src/app");
const dbconnect = require("./src/config/database");

// extract port number
const PORT = process.env.PORT || 3000;

// start server 
const start = async () => {
  await dbconnect();
  app.listen(PORT, () => {
    console.log("Server is running on Port ", PORT);
  });
};
 
start();