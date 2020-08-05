const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketScema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    departDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    price: { type: Number },
}, {
    timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketScema);

module.exports = Ticket;