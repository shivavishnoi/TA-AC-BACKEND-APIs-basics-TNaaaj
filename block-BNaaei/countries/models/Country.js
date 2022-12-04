var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    continent: { type: String, required: true },
    population: { type: Number, required: true },
    ethnicity: { type: String, required: true },
    states: { type: [Schema.Types.ObjectId], default: [], ref: 'State' },
    neighbour_countries: { type: [Schema.Types.ObjectId], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Country', countrySchema);
