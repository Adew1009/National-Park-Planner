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
  // const [wishlist, setWishlist] = useState([]);

  // const getWishlist = async () => {
  //   try {
  //     let response = await api.get(`wishlist/allwishlist/`);
  //     let results = response.data;
  //     // console.log(results);
  //     setWishlist(results);
  //     // setLoading(false);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  // useEffect(() => {
  //   getWishlist();
  // }, []);

  const addWishlist = async (parkCode) => {
    try {
      // console.log("Add Park Function", parkCode);
      // Check if the parkCode already exists in the visits array
      if (wishlist.some((wishlist) => wishlist.parkCode === parkCode)) {
        console.log("This park has already been added.");
        return; // Exit early if the parkCode already exists
      }

      let response = await api.post("wishlist/allwishlist/", {
        parkCode: parkCode,
      });
      // If the visit was added successfully, update the visits state
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
