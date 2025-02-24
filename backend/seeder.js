const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");

const doctors = [
    {
        name: "Dr. Smith",
        specialty: "Cardiology",
        experience: 10,
        contact: "9876543210",
        workingHours: { start: "09:00", end: "17:00" }
    },
    {
        name: "Dr. John Doe",
        specialty: "Neurology",
        experience: 8,
        contact: "9876543211",
        workingHours: { start: "10:00", end: "18:00" }
    },
    {
        name: "Dr. Emily Clark",
        specialty: "Pediatrics",
        experience: 12,
        contact: "9876543212",
        workingHours: { start: "08:00", end: "16:00" }
    }
];

const seedDoctors = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/appointmentBooking", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await Doctor.insertMany(doctors);
        console.log("✅ Doctors added successfully!");
    } catch (error) {
        console.error("❌ Error inserting doctors:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDoctors();
