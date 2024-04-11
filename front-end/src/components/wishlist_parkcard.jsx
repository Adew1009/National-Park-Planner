import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react"; // Import useEffect
import { api } from "../utilities";

function WishListCard({ images = [], name, id, updateWishlist, code }) {
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

  useEffect(() => {
    removeWishList();
  }, []);

  //! get the visits from the database and set the visits useState
  const getVisits = async () => {
    try {
      let response = await api.get(`visited/all-visits/`);
      let results = response.data;
      console.log(results);
      setVisits(results);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getVisits();
  }, []);

  // ! add a visit to the database
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  const addParkVisit = async (parkCode) => {
    try {
      console.log("Add Park Function", parkCode);
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
    <Card style={{ width: "30rem", height: "50rem" }} data-bs-theme="dark">
      <Card.Body>
        <Card.Title className="display-6 text-info">{name}</Card.Title>
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
                  <h5 className="text-success bg-info">{image.title}</h5>
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
          <Button onClick={async () => addParkVisit(code)}>
            Add to Visited Parks
          </Button>
        </span>
      </ListGroup>
    </Card>
  );
}

export default WishListCard;
