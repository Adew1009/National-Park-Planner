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

export function RemoveVisitAlert({
  parkCode,
  visits,
  setVisits,
  id,
  updateVisits,
}) {
  const removeParkVisit = async (id) => {
    try {
      let response = await api.delete(`visited/visit/${id}/`);
      let results = response.data;
      console.log(results);
      const newVisits = visits;
      setVisits(newVisits);
      updateVisits();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleRemoveParkVisit = async () => {
    await removeParkVisit(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline-danger"
          onClick={async () => handleRemoveParkVisit(id)}
        >
          Remove From Visited Parks
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>PARK WISHLIST</AlertDialogTitle>
          <AlertDialogDescription>
            This Park Has Been Removed From Your Visited Parks
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
