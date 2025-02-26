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


module.exports = router;