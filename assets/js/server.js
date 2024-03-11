const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/wedding', { useNewUrlParser: true, useUnifiedTopology: true });

// Define attendee schema
const attendeeSchema = new mongoose.Schema({
  name: String,
  additionalNames: [String]
});

// Create attendee model
const Attendee = mongoose.model('Attendee', attendeeSchema);

// Create express app
const app = express();

// Parse JSON bodies
app.use(express.json());

// Handle RSVP form submission
app.post('/rsvp', async (req, res) => {
  const attendee = new Attendee({
    name: req.body.name,
    additionalNames: req.body.additionalNames
  });

  await attendee.save();

  res.send('Thank you for your RSVP!');
});

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));