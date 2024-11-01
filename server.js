// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Appointment = require("./models/Appointment");

const app = express();
app.use(cors());
app.use(express.json());

// Replace this with your MongoDB URI
const MONGODB_URI = "mongodb+srv://abhijeetsteam:9ULGS3VZOr1Op0Ol@cluster0.otjdq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes start //

// Get all appointments
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

// Add a new appointment
app.post("/appointments", async (req, res) => {

  const newAppointment = new Appointment(req.body);

  try {
    await newAppointment.save();
    res.json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment" });
  }
});

// Delete an appointment by ID
app.delete("/appointments/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment" });
  }
});

// Update an appointment by ID (for drag-and-drop or date change)
app.put("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { start, end } = req.body; // Expecting start and end times for updates

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { start, end },
      { new: true } // Return the updated document
    );
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment" });
  }
});

// Routes end //

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
