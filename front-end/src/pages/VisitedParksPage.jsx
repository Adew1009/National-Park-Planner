import { useEffect, useState } from "react"; // Import useEffect
// import { useOutletContext } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import VisitedParkCard from "../components/visited_parkcard";
import { api } from "../utilities";
import VisitMap from "../components/VisitMap";
import Spinner from "react-bootstrap/Spinner";

const VisitedParksPage = () => {
  const [visits, setVisits] = useState([]);
  const [latlong, setLatlong] = useState([]);
  const [mapLoading, setMapLoading] = useState(true);

  //! get the visits from the database and set the visits useState
  const getVisits = async () => {
    try {
      let response = await api.get(`visited/all-visits/`);
      let results = response.data;
      console.log("results", results);
      setVisits(results);
      // setLoading(false);
      const latlonglist = [];
      results.map((park) =>
        latlonglist.push([
          [park.parkCode.longitude, park.parkCode.latitude],
          park.parkCode.fullName,
        ])
      );
      setLatlong(latlonglist);
      console.log("latlonglist", latlonglist);
      setMapLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // const getLatLongs = () => {
  //   visits.map(
  //     (park) =>
  //       latlonglist.push([park.parkCode.longitude, park.parkCode.latitude])
  //     // console.log(park.parkcode)
  //   );
  console.log("latlong", latlong);

  // };

  // useEffect(() => {
  //   getLatLongs();
  // }, []);

  useEffect(() => {
    getVisits();
  }, []);

  const updateVisits = () => {
    getVisits();
    setMapLoading(true);
  };

  return (
    <>
      <h1>VISITED PARKS</h1>
      {/* <VisitMap latlong={latlong} /> */}
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
              images={park.parkCode.images} // Use state variable directly
              name={park.parkCode.fullName} // Use state variable directly
              journal={park.journal}
              id={park.id}
              updateVisits={updateVisits} // Pass updateVisits function to VisitedParkCard
            />
            <br></br>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default VisitedParksPage;
