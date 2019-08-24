const mongoose =  require('mongoose');

const stadiumSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true }
});

module.exports = mongoose.model('Stadium', stadiumSchema, 'stadiums');