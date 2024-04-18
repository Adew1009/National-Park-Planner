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

export function WishlistAlert({
  parkCode,
  wishlist,
  setWishlist,
  updateWishlist,
}) {
  const addWishlist = async (parkCode) => {
    try {
      if (wishlist.some((wishlist) => wishlist.parkCode === parkCode)) {
        console.log("This park has already been added.");
        return; // Exit early if the parkCode already exists
      }

      let response = await api.post("wishlist/allwishlist/", {
        parkCode: parkCode,
      });

      setWishlist([...wishlist, response.data]);
      console.log(wishlist);
      updateWishlist();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleAddWishlist = async () => {
    await addWishlist(parkCode);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline-success"
          onClick={async () => handleAddWishlist(parkCode)}
        >
          Add to Park Wishlist
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>PARK WISHLIST</AlertDialogTitle>
          <AlertDialogDescription>
            This Park Has Been Added to Your Wishlist
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
