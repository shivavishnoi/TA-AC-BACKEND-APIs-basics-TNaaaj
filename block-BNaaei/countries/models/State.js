var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, required: true },
    neighbour_states: { type: [Schema.Types.ObjectId], default: [] },
    population: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('State', stateSchema);
