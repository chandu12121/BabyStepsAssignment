import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./index.css";

const BookAppointment = () => {
    const location = useLocation();
    const selectedDate = location.state?.date || "";
    const selectedDoctor = location.state?.doctor || null;
    const appointmentId = location.state?.appointmentId || null;

    const [formData, setFormData] = useState({
        doctorId: selectedDoctor?._id || "",
        patientName: "",
        date: selectedDate,
        time: "",
        appointmentType: "",
        duration: "",
    });

    const [bookedSlots, setBookedSlots] = useState([]);
    const appointmentTypes = [
        "Consultation", "Follow-up", "Routine Checkup",
        "Emergency", "Surgery", "Health Screening"
    ];

    useEffect(() => {
        if (appointmentId) {
            axios.get(`http://localhost:5004/appointments/${appointmentId}`)
                .then(response => {
                    console.log("Fetched Appointment Details:", response.data);
                    setFormData({
                        doctorId: response.data.doctorId || "",
                        patientName: response.data.patientName || "",
                        date: response.data.date ? response.data.date.split("T")[0] : "",
                        time: response.data.time || "",
                        appointmentType: response.data.appointmentType || "",
                        duration: response.data.duration || "",
                    });
                })
                .catch(error => {
                    console.error("Error fetching appointment details:", error);
                });
        }
    }, [appointmentId]);
    

    useEffect(() => {
        if (selectedDate && selectedDoctor) {
            axios
                .get(`http://localhost:5004/doctors/${selectedDoctor._id}/slots?date=${selectedDate}`)
                .then((response) => {
                    setBookedSlots(response.data.bookedSlots);
                })
                .catch((error) => {
                    console.error("Error fetching booked slots:", error);
                });
        }
    }, [selectedDate, selectedDoctor]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "date") {
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (bookedSlots.includes(formData.time)) {
            alert("This time slot is already booked. Please select a different time.");
            return;
        }

        try {
            if (appointmentId) {
                await axios.put(`http://localhost:5004/appointments/${appointmentId}`, formData);
                alert("Appointment updated successfully!");
            } else {
                await axios.post("http://localhost:5004/appointments", formData);
                alert("Appointment booked successfully!");
            }
            setFormData({
                doctorId: "",
                patientName: "",
                date: "",
                time: "",
                appointmentType: "",
                duration: "",
            });
        } catch (error) {
            alert("Error: " + (error.response?.data?.error || "Something went wrong"));
        }
    };

    const getAvailableTimeSlots = () => {
        const slots = [];
        for (let i = 9; i < 18; i++) {
            slots.push(`${i}:00`);
            slots.push(`${i}:30`);
        }
        return slots;
    };

    const isSlotBooked = (timeSlot) => {
        return bookedSlots.includes(timeSlot);
    };

    return (
        <div className="container">
            <div className="form-box">
                <h2>Book an Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Doctor ID:</label>
                        <input type="text" name="doctorId" value={formData.doctorId} readOnly onFocus={(e) => e.target.blur()} />
                    </div>

                    <div className="input-group">
                        <label>Patient Name:</label>
                        <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <label>Appointment Type:</label>
                        <select
                            name="appointmentType"
                            value={formData.appointmentType}
                            onChange={handleChange}
                            required
                            className="appointment-type"
                        >
                            <option value="">Select Appointment Type</option>
                            {appointmentTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Date:</label>
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            readOnly
                            onFocus={(e) => e.target.blur()}
                        />
                    </div>

                    <div className="input-group">
                        <label>Time:</label>
                        <select
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Time</option>
                            {getAvailableTimeSlots().map((timeSlot, index) => (
                                <option key={index} value={timeSlot} disabled={isSlotBooked(timeSlot)}>
                                    {timeSlot} {isSlotBooked(timeSlot) && "(Booked)"}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Duration (minutes):</label>
                        <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="submit-btn" disabled={!formData.time || isSlotBooked(formData.time)}>
                        Book Now
                    </button>
                </form>
                
            </div>
        </div>
    );
};

export default BookAppointment;
