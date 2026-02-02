const EventList = require("../models/EventList.model");

exports.getEventList = async (req, res) => {
  try {
    const events = await EventList.getAll();
    
    res.status(200).json(events);
  } catch (error) {
    console.error('Error in getEventList Controller:', error);
    res.status(500).json({ error: 'Failed to get the list of Events' });
  }
};