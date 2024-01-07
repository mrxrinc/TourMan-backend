import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const GeneralSchema = new Schema({
  specialOffers: [String],
  promotedCities: [
    {
      name: String,
      image: String,
      province: String,
    },
  ],
});

const General = mongoose.model('general', GeneralSchema);
export default General;
