import Participants from "../models/ParticipantsList.model.js";

export const ParticipantsList = async (req, res) => { // Added req, res
  try {
    const data = await Participants.getList();
    
    res.status(200).json(data); 
  } catch (error) {
    console.error("Error getting all the list of participants: ", error);
    res.status(500).json({ error: "Failed to get list of participants" });
  }
};