import Event from "../models/Event.model.js";
import { generateId } from "../utils/generateId.util.js";

export const getEventList = async (req, res) => {
  try {
    const events = await Event.getAll();

    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getEventList Controller:", error);
    res.status(500).json({ error: "Failed to get the list of Events" });
  }
};

export const addEvent = async (req, res) => {
  const data = req.body;

  try {
    const event_id = generateId();
    const event_date = `${data.year}-${data.month}-${data.day}`;

    const attachment_url =
      req.files && req.files.length > 0
        ? `/pdf/${req.files[0].filename}`
        : null;

    await Event.insertEvent({
      event_id: event_id,
      title: data.title,
      description: data.description,
      city: data.city,
      municipality: data.municipality,
      participants: JSON.stringify(data.participantsId || []),
      event_date: event_date,
      time_start: data.timefrom,
      time_end: data.timeto,
      attachment_url: attachment_url,
    });

    res.status(201).json({
      message: "Event added successfully",
      event_id,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Failed to add event" });
  }
};
