import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReserveSchema = new Schema({
  homeId: String,
  hostId: String,
  guestId: String,
  homeTitle: String,
  hostName: String,
  guestName: String,
  adults: Number,
  children: Number,
  pets: Boolean,
  reservedDays: [Array],
  price: Number,
  totalNights: Number,
  totalPrice: Number,
  reservedDate: String,
  message: String,
});

const Reserve = mongoose.model('reserve', ReserveSchema);
export default Reserve;
