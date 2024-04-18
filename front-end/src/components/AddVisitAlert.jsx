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

export function AddVisitAlert({ parkCode, visits, setVisits, updateVisits }) {
  // ! add a visit to the database
  const addParkVisit = async (parkCode, visits, setVisits) => {
    try {
      if (visits.some((visit) => visit.parkCode === parkCode)) {
        console.log("This park has already been visited.");
        return; // Exit early if the parkCode already exists
      }

      let response = await api.post("visited/all-visits/", {
        parkCode: parkCode,
        journal: "Record a memory here",
      });

      setVisits([...visits, response.data]);
      console.log(visits);
      updateVisits();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleAddParkVisit = async () => {
    await addParkVisit(parkCode, visits, setVisits);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline-secondary"
          onClick={async () => handleAddParkVisit(parkCode)}
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
