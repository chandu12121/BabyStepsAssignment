const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    contact: { type: String, required: true },
    workingHours: { 
        start: { type: Number, required: true }, 
        end: { type: Number, required: true },   
    }
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
