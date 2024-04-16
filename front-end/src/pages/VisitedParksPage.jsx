import { useEffect, useState } from "react"; // Import useEffect
// import { useOutletContext } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import VisitedParkCard from "../components/visited_parkcard";
import { api } from "../utilities";
import VisitMap from "../components/VisitMap";
import Spinner from "react-bootstrap/Spinner";
import { useParams, useOutletContext } from "react-router-dom";

const VisitedParksPage = () => {
  const { visits, setVisits, latlong, setLatlong, mapLoading, updateVisits } =
    useOutletContext();

  return (
    <>
      <main
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/1784577/pexels-photo-1784577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          // backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          backgroundAttachment: "fixed",
        }}
      >
        <h1>VISITED PARKS</h1>
        <h3>Map of Your Current Visited Parks</h3>
        {mapLoading ? (
          <div>
            <h1>
              <Spinner animation="border" variant="success" />
              <Spinner animation="grow" variant="success" />
              Loading ... <Spinner animation="grow" variant="success" />
              <Spinner animation="border" variant="success" />
            </h1>
          </div>
        ) : (
          <VisitMap latlong={latlong} />
        )}
        <Row className="d-flex justify-content-center align-content-between flex-wrap">
          {visits.map((park) => (
            <Col key={park.id}>
              <VisitedParkCard
                images={park.parkCode.images}
                name={park.parkCode.fullName}
                journal={park.journal}
                id={park.id}
                updateVisits={updateVisits}
              />
              <br></br>
            </Col>
          ))}
        </Row>
      </main>
    </>
  );
};

export default VisitedParksPage;
