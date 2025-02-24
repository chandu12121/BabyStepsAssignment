const express = require("express");
const { getDoctors, getAvailableSlots } = require("../controllers/doctorController");
const router = express.Router();
router.get("/", getDoctors);
router.get('/doctors/:id/slots', getAvailableSlots);

module.exports = router;

