import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const response = await axios.get("http://localhost:5004/appointments");
                console.log("Fetched Appointments:", response.data);
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        getAppointments();
    }, []);

    const onDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5004/appointments/${id}`);
            console.log("Appointment deleted:", response.data);
            
            setAppointments(appointments.filter(appointment => appointment._id !== id));
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    const onEdit = (appointment) => {
        navigate("/appointment-form", { state: { appointmentId: appointment._id } });
    };

    return (
        <div className="appointment-container">
            <h2>Appointment List</h2>
            {appointments.length === 0 ? (
                <p className="no-appointments">No appointments available.</p>
            ) : (
                <ul className="appointment-list">
                    {appointments.map((each) => (
                        <li key={each._id} className="appointment-card">
                            <p><strong>Doctor ID:</strong> {each.doctorId?._id || "N/A"}</p>
                            <p><strong>Patient Name:</strong> {each.patientName || "N/A"}</p>
                            <p><strong>Date:</strong> {each.date ? new Date(each.date).toLocaleDateString() : "N/A"}</p>
                            <p><strong>Time:</strong> {each.time || "N/A"}</p>
                            <p><strong>Appointment Type:</strong> {each.appointmentType || "N/A"}</p>
                            <p><strong>Duration:</strong> {each.duration ? `${each.duration} minutes` : "N/A"}</p>
                            <button onClick={() => onDelete(each._id)}>Delete</button>
                            <button onClick={() => onEdit(each)}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppointmentList;
