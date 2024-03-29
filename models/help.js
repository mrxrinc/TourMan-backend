import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HelpSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
  },
});

const Help = mongoose.model('help', HelpSchema);
export default Help;
