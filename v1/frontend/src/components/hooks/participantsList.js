import { useState, useEffect } from "react";
import getParticipantsList from "../api/participants.api"; 

export default function participantsList(query) { 
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await getParticipantsList();
        
        // Added optional chaining (?.) to prevent crashes if username is null
        const filtered = data.filter(user => 
          user.username?.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
      } catch (err) {
        console.error("Hook error:", err);
      }
    };

    fetchParticipants();
  }, [query]); 

  return suggestions;
}