const express = require('express');
const router = express.Router();
const QuestionSchema = require('../Model/Question_schema.js')
const connectDb = require('../db');
connectDb();

router.get("/fetchQuestion", async (req,res)=>{
  try {
      const images = await QuestionSchema.find({});
      res.json(images);
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Server Error"})
  }
})

router.get("/fetchQuestion/location", async (req,res)=>{
  location = req.query.location
 
  try {
      const images = await QuestionSchema.find({"location":location});
      res.json(images);
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Server Error"})
  }
})


module.exports = router;