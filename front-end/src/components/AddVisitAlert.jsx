import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { api } from "../utilities";
import axios from "axios";

export function AddVisitAlert({ parkCode }) {
  const [visits, setVisits] = useState([]);

  //! get the visits from the database and set the visits useState
  const getVisits = async () => {
    try {
      let response = await api.get(`visited/all-visits/`);
      let results = response.data;
      // console.log(results);
      setVisits(results);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getVisits();
  }, []);

  // ! add a visit to the database
  const addParkVisit = async (parkCode) => {
    try {
      // console.log("Add Park Function", parkCode);
      // Check if the parkCode already exists in the visits array
      if (visits.some((visit) => visit.parkCode === parkCode)) {
        console.log("This park has already been visited.");
        return; // Exit early if the parkCode already exists
      }

      let response = await api.post("visited/all-visits/", {
        parkCode: parkCode,
        journal: "Record a memory here",
      });
      // If the visit was added successfully, update the visits state
      setVisits([...visits, response.data]);
      console.log(visits);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    addParkVisit();
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline-danger"
          onClick={async () => addParkVisit(parkCode)}
        >
          Add to Visited Parks
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>PARK WISHLIST</AlertDialogTitle>
          <AlertDialogDescription>
            This Park Has Been Added to Your Visited Parks
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
