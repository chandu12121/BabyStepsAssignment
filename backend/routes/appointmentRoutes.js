const express = require("express");
const { getAppointments, createAppointment, deleteAppointment , updateAppointment,detailAppointment } = require("../controllers/appointmentController");

const router = express.Router();

router.get("/", getAppointments);
router.get("/:id", detailAppointment);
router.put("/:id", updateAppointment);
router.post("/", createAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
