const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");


const getAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate("doctorId");
  res.json(appointments);
};

const updateAppointment = async (req, res) => {
    const { id } = req.params; 
    const { patientName, date, time, appointmentType, duration } = req.body; 

    try {
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { patientName, date, time, appointmentType, duration },
            { new: true } 
        );

        res.status(200).json({
            message: "Appointment updated successfully",
            appointment: updatedAppointment,
        });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const detailAppointment= async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        else {
            res.send(appointment)
        }

        
    } catch (error) {
        console.error("Error detailed appointment:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const createAppointment = async (req, res) => {
    console.log("Received Data:", req.body);

    try {
        const { doctorId, patientName, date, time, appointmentType, duration } = req.body;
        if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ error: "Invalid or missing doctorId" });
        }
        if (!appointmentType) {
            return res.status(400).json({ error: "appointmentType is required" });
        }
        if (!duration) {
            return res.status(400).json({ error: "duration is required" });
        }
        if (!date || !time) {
            return res.status(400).json({ error: "Date and time are required" });
        }

        const existingAppointment = await Appointment.findOne({
            doctorId,
            date,
            time,
        });

        if (existingAppointment) {
            return res.status(400).json({error:"This slot is already booked, Please selected another slot"} );
        }
        const appointment = new Appointment({
            doctorId,
            patientName,
            date,
            time,
            appointmentType,
            duration,
        });

        await appointment.save();
        res.status(201).json({ message: "Appointment booked successfully", appointment });
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ error: error.message || "Server error" });
    }
};


const deleteAppointment = async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Appointment deleted" });
};

module.exports = { getAppointments, createAppointment, deleteAppointment ,updateAppointment, detailAppointment};
