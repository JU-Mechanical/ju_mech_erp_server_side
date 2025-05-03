import mongoose from "mongoose";

const academicBackgroundSchema = new mongoose.Schema({
  secondaryMarks: String,
  secondaryYear: String,
  higherSecondaryMarks: String,
  higherSecondaryYear: String,
  mediumOfEducation: String,
  entranceExamName: String,
  entranceExamRank: String,
  entranceExamYear: String,
  rankcard:String
});

export default academicBackgroundSchema;
