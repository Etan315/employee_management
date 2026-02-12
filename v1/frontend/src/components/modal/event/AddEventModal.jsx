import { useState, useEffect } from "react";
import { useSuggestions } from "../../hooks/useSuggestions.js";
import participantsList from "../../hooks/participantsList.js";
import Modal from "../Modal";
import IcPlus from "../../../icons/ic-plus.svg";
import IcEvent from "../../../icons/ic-event.svg";
import "./addEventModal.css";
import DropdownInput from "../../inputs/DropdownInput.jsx";
import ParticipantsInput from "../../inputs/ParticipantsInput.jsx";
import { addEvent } from "../../../api/Event.api.js";

export default function AddEventModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    municipality: "",
    participantsId: null,
    participantsName: "",
    month: "",
    day: "",
    year: "",
    timefrom: "",
    timeto: "",
    attachment: null,
  });

  const [cityQuery, setCityQuery] = useState("");
  const [municipalityQuery, setMunicipalityQuery] = useState("");
  const [participantsQuery, setParticipantsQuery] = useState("");

  // Auto-fill empty fields (optional safeguard)
  useEffect(() => {
    if (!formData.city) setFormData((prev) => ({ ...prev, city: "" }));
    if (!formData.municipality)
      setFormData((prev) => ({ ...prev, municipality: "" }));
  }, []);

  // Fetch suggestions using your hook
  const citySuggestions = useSuggestions(cityQuery, "cities");
  const municipalitySuggestions = useSuggestions(
    municipalityQuery,
    "municipalities",
  );

  const participantSuggestions = participantsList(participantsQuery);

  const handleParticipantChange = (user) => {
    if (user && user.user_id) {
      setFormData({
        ...formData,
        participantsId: user.user_id,
        participantsName: user.username,
      });
    } else {
      setFormData({
        ...formData,
        participantsId: null, // important to be null, not object
        participantsName: user ? user.username : "",
      });
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === "attachment") {
      setFormData((prev) => ({ ...prev, attachment: files })); // store FileList
    } else {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };


  // Handle adding of event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "attachment") {
        if (value) {
          Array.from(value).forEach((file) => data.append("attachment", file));
        }
      } else {
        data.append(key, value !== null ? value : "");
      }
    });

    try {
      const res = await addEvent(data);

      // CHECK IF THE SERVER ACTUALLY SUCCEEDED
      if (res.ok) {
        alert("Event added successfully!");
        onClose();
        setFormData({
          title: "",
          description: "",
          city: "",
          municipality: "",
          participantsId: "",
          month: "",
          day: "",
          year: "",
          attachment: null,
        });
      } else {
        // If the server returned 401, 403, 500, etc.
        const errorData = await res.json();
        alert(`Error: ${errorData.error || "Failed to add event"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please check your connection.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="modal-header">
        <div className="left">
          <img src={IcEvent} alt="event" />
          <div className="header-text">
            <h2>Create Event</h2>
            <p>Fill in the data below to add event</p>
          </div>
        </div>
        <button onClick={onClose}>
          <img src={IcPlus} alt="close" className="btn-close" />
        </button>
      </header>

      <form className="form-event" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="input-textarea"
          placeholder="Type description for the upcoming event."
          role="textbox"
          rows="4"
          cols="50"
          maxLength={500}
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <DropdownInput
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          query={cityQuery}
          setQuery={setCityQuery}
          suggestions={citySuggestions}
        />

        <DropdownInput
          label="Municipality"
          name="municipality"
          value={formData.municipality}
          onChange={handleChange}
          query={municipalityQuery}
          setQuery={setMunicipalityQuery}
          suggestions={municipalitySuggestions}
        />

        <ParticipantsInput
          label="Participant"
          value={formData.participantsName}
          onChange={(user) => handleParticipantChange(user)}
          query={participantsQuery}
          setQuery={setParticipantsQuery}
          suggestions={participantSuggestions}
        />

        <fieldset className="event-date-and-time">
          <legend>Date and Time</legend>

          <div className="date">
            <input
              type="number"
              name="month"
              placeholder="MM"
              aria-label="Month"
              value={formData.month}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="day"
              placeholder="DD"
              aria-label="Day"
              value={formData.day}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="year"
              placeholder="YYYY"
              aria-label="Year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="time">
            <div className="timefrom">
              <label htmlFor="timefrom">From: </label>
              <input
                id="timefrom"
                type="time"
                name="timefrom"
                step="60"
                value={formData.timefrom}
                onChange={handleChange}
                min="00:00"
                max="23:59"
                required
              />
            </div>

            <div className="timeto">
              <label htmlFor="timeto">To: </label>
              <input
                id="timeto"
                type="time"
                name="timeto"
                step="60"
                value={formData.timeto}
                onChange={handleChange}
                min="00:00"
                max="23:59"
                required
              />
            </div>
          </div>
        </fieldset>

        <label htmlFor="attachment">Attachment (PDF)</label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          multiple
          accept="application/pdf"
          title="Upload PDF file"
          onChange={handleChange}
        />

        <div className="toggleBtn">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
