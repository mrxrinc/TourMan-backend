import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReportUserSchema = new Schema({
  userId: String,
  hostId: String,
  reportType: Number,
});

const ReportUser = mongoose.model("reportUser", ReportUserSchema);
export default ReportUser;
