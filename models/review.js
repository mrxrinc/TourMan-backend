import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  parent: String,
  userId: String,
  userFullName: String,
  avatar: String,
  date: String,
  rate: Number,
  comment: String,
});

const Review = mongoose.model('review', ReviewSchema);
export default Review;
