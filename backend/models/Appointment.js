const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    appointmentType: { type: String, required: true },  
    duration: { type: Number, required: true }  
});

appointmentSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
