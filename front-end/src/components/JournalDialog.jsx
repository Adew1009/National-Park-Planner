import Accordion from "react-bootstrap/Accordion";
import { useRef, useEffect, useState } from "react";
import { api } from "../utilities";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { ScrollAreaJournal } from "./newScroll-area";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function JournalDialog({ id, updateVisits, currentJournal }) {
  const [journal, setJournal] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setJournal(value);
  };

  const UpdateJournalEntry = async () => {
    try {
      let response = await api.put(`visited/visit/${id}/`, {
        journal: journal,
      });
      updateVisits();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleJournalEntry = async () => {
    await UpdateJournalEntry(id);
  };

  return (
    <Dialog style={{ width: "100%", maxHeight: "none" }}>
      <DialogTrigger asChild>
        <Button variant="outline-light">Update Journal</Button>
      </DialogTrigger>
      <div style={{ width: "100%", maxHeight: "none" }}>
        <DialogContent
          style={{ overflow: "auto", width: "100%", maxHeight: "none" }}
        >
          <DialogHeader>
            <DialogTitle>Update Your Journal Entry Here</DialogTitle>
          </DialogHeader>
          <div>
            <div>
              <Form
                onSubmit={async (e) => [
                  e.preventDefault(),
                  handleJournalEntry(),
                ]}
              >
                <Form.Group className="mb-3">
                  <Textarea
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    value={journal}
                    type="text"
                    placeholder="Update Your Journal here"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              <Form></Form>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
export default JournalDialog;
