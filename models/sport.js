const mongoose =  require('mongoose');

const sportSchema = mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Sport', sportSchema);