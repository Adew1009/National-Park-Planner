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

export function RemoveWishlistAlert({
  parkCode,
  wishlist,
  setWishlist,
  updateWishlist,
  id,
}) {
  const removeWishList = async (id) => {
    try {
      let response = await api.delete(`wishlist/wishlist/${id}/`);
      let results = response.data;
      console.log(results);
      updateWishlist();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleRemoveParkwish = async () => {
    await removeWishList(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline-danger"
          onClick={async () => handleRemoveParkwish(id)}
        >
          Remove Park From Wishlist
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>PARK WISHLIST</AlertDialogTitle>
          <AlertDialogDescription>
            This Park Has Been Removed From Your Wishlist
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
