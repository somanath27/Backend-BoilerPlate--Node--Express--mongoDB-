const express = require("express");
const env = require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const userRoute=require("./routes/user.route")
app.use(express.json());

app.get("/", (req, res, next) => {
  res.end("Hello hyy");
});
app.use("/user",userRoute)
app.use((error,req,res,next)=>
{
    res.status(error.status).json({message:error.message})
})

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connection successful");
  })
  .then(() => {
    const port = env.PORT || 5001;
    app.listen(port, () => {
      console.log("Server is running successful");
    });
  });
