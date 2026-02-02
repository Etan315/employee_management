// src/components/hooks/useParticipantsList.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function participantsList(query) {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const API_URL = 'http://localhost:5000/api';
    const fetchData = async () => {
      try {
        // Fetch all participants
        const response = await axios.get(`${API_URL}/participants`);
        let data = response.data;

        // Filter locally by name match if a query exists
        if (query && query.trim() !== "") {
          const lowerQuery = query.toLowerCase();
          data = data.filter(
            (item) =>
              item.first_name?.toLowerCase().includes(lowerQuery) ||
              item.last_name?.toLowerCase().includes(lowerQuery) ||
              item.username?.toLowerCase().includes(lowerQuery)
          );
        }

        setParticipants(data);
      } catch (err) {
        console.error("Error fetching participants:", err.message);
        setParticipants([]);
      }
    };

    fetchData();
  }, [query]);

  return participants;
}
