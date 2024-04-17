import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react"; // Import useEffect
import { api } from "../utilities";
import { AddVisitAlert } from "./AddVisitAlert";
import { RemoveVisitAlert } from "./RemoveVisitAlert";

function WishListCard({
  images = [],
  name,
  id,
  updateWishlist,
  code,
  visits,
  setVisits,
  updateVisits,
}) {
  // Initialize images as an empty array
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

  const getID = (parkCode, list) => {
    if (!list) {
      return null;
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].parkCode.parkCode === parkCode) {
        return list[i].id;
      }
    }
    return null;
  };

  return (
    <Card style={{ width: "30rem", height: "39rem" }} data-bs-theme="dark">
      <Card.Body>
        <Card.Title className="display-6 text-success bg-info bg-opacity-25">
          {name}
        </Card.Title>
      </Card.Body>
      <Carousel>
        {images &&
          images.map(
            (
              image,
              index // Add a check to ensure images is not undefined before mapping
            ) => (
              <Carousel.Item interval={10000} key={index}>
                <img
                  src={image.url}
                  style={{ width: "100%", height: "400px" }}
                />
                <Carousel.Caption>
                  <h5 className="text-info bg-success bg-opacity-75">
                    {image.title}
                  </h5>
                </Carousel.Caption>
              </Carousel.Item>
            )
          )}
      </Carousel>
      <ListGroup className="list-group-flush">
        <span>
          <Button variant="danger" onClick={async () => removeWishList(id)}>
            Remove From Wish List
          </Button>
          {visits.some((visit) => visit.parkCode.parkCode === code) ? (
            <RemoveVisitAlert
              id={getID(code, visits)}
              visits={visits}
              setVisits={setVisits}
              updateVisits={updateVisits}
            />
          ) : (
            <AddVisitAlert
              parkCode={code}
              visits={visits}
              setVisits={setVisits}
              updateVisits={updateVisits}
            />
          )}
          {/* <Button onClick={async () => addParkVisit(code)}>
            Add to Visited Parks
          </Button> */}
        </span>
      </ListGroup>
    </Card>
  );
}

export default WishListCard;
