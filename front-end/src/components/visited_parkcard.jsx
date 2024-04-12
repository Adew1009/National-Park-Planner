import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react"; // Import useEffect
import { api } from "../utilities";
import UpdateJournal from "./UpdateJournal";
import JournalDialog from "./JournalDialog";

function VisitedParkCard({ images = [], name, journal, id, updateVisits }) {
  // Initialize images as an empty array
  const removeParkVisit = async (id) => {
    try {
      let response = await api.delete(`visited/visit/${id}/`);
      let results = response.data;
      console.log(results);
      updateVisits();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    removeParkVisit();
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
      <Card.Body>
        <Card.Title className="display-8 text-info">Memory Journal</Card.Title>
        <p>{journal}</p>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {/* <UpdateJournal id={id} updateVisits={updateVisits} /> */}

        <span>
          <Button variant="danger" onClick={async () => removeParkVisit(id)}>
            Remove From Visited parks
          </Button>
          <JournalDialog id={id} updateVisits={updateVisits} />
        </span>
      </ListGroup>
    </Card>
  );
}

export default VisitedParkCard;
