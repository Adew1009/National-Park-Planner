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

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function JournalDialog({ id, updateVisits }) {
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

  useEffect(() => {
    UpdateJournalEntry();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline-light">Update Journal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Your Journal Entry Here</DialogTitle>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4"> */}
        <div>
          {/* <div className="grid grid-cols-4 items-center gap-4"> */}
          <div>
            <Form
              onSubmit={async (e) => [
                e.preventDefault(), // Prevent default form submission behavior
                UpdateJournalEntry(), // Call calcRouteDirection function
              ]}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
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
    </Dialog>
  );
}
export default JournalDialog;
