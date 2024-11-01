// server/models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    title: String,
    name: String,
    start: Date,
    end: Date,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
