// src/components/hooks/useParticipantsList.js
import { useState, useEffect } from "react";
import getParticipantsList from "../../api/participantsList.api.js";

export default function participantsList(query) {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all participants
        const response = await getParticipantsList();
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
