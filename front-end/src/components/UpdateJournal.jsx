import Accordion from "react-bootstrap/Accordion";
import { useRef, useEffect, useState } from "react";
import { api } from "../utilities";

function UpdateJournal({ id, updateVisits, journal }) {
  const [journalEntry, setJournalEntry] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setJournalEntry(value);
  };

  const UpdateJournalEntry = async () => {
    try {
      let response = await api.put(`visited/visit/${id}/`, {
        journal: journalEntry,
      });
      updateVisits();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    UpdateJournalEntry();
  }, []);

  return (
    <form
      onSubmit={(e) => [
        e.preventDefault(), // Prevent default form submission behavior
        UpdateJournalEntry(), // Call calcRouteDirection function
      ]}
    >
      <input
        type="text"
        placeholder="Update your memory here"
        value={journal}
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <input type="submit" value="Update Journal" />
    </form>
  );
}

export default UpdateJournal;
