const express = require('express');
const dictionaryRoutes =  require('./routes/dictionary.routes');

const app =  express();
app.use(express.json());

app.use("/api/v1/dictionary", dictionaryRoutes);

//  default route
app.get("/", (req,res) =>{
   res.json({
     message: "Welcome to the Dictionary"
   });
});


module.exports = app;