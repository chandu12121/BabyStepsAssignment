const Doctor = require("../models/Doctor");
const Appointment = require('../models/Appointment');
const moment = require('moment');

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const isSlotBooked = async (doctorId, date, time) => {
    try {
        const appointment = await Appointment.findOne({
            doctorId,
            date,
            time,
        });

        return !!appointment;
    } catch (error) {
        console.error("Error checking slot availability:", error);
        throw new Error("Error checking slot availability");
    }
};

const getAvailableSlots = async (req, res) => {
    const { id } = req.params; 
    const { date } = req.query;

    // Validate date
    if (!date) {
        return res.status(400).json({ error: 'Date parameter is required' });
    }
    if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Expected YYYY-MM-DD' });
    }

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        const { start, end } = doctor.workingHours;
        const availableSlots = [];
        let currentTime = moment(start, "HH:mm"); 
        const endTime = moment(end, "HH:mm");
        while (currentTime.isBefore(endTime)) {
            const slotTime = currentTime.format("HH:mm"); 
            const isTaken = await isSlotBooked(id, date, slotTime);
            if (!isTaken) {
                availableSlots.push(slotTime); 
            }

            currentTime.add(30, 'minutes');
        }

        res.json({ 
            doctor: doctor.name,
            date,
            availableSlots 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching available slots' });
    }
};

module.exports = { getDoctors, getAvailableSlots };