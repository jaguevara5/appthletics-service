const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = mongoose.Schema({
    homeTeam: { type: Schema.Types.ObjectID, ref: 'Team' },
    awayTeam: { type: Schema.Types.ObjectID, ref: 'Team' },
    district: { type: Schema.Types.ObjectID, ref: 'District' },
    category: { type: Schema.Types.ObjectID, ref: 'Category' },
    stadium: { type: Schema.Types.ObjectID, ref: 'Stadium' },
    sport: { type: Schema.Types.ObjectID, ref: 'Sport' }
});

module.exports = mongoose.model('Game', gameSchema);