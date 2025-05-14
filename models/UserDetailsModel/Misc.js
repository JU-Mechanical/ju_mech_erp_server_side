import mongoose from "mongoose";

const miscellaneousSchema = new mongoose.Schema({
 
  keyLearnings: String,
  sop: String,
  vision: String,
});

export default miscellaneousSchema;
