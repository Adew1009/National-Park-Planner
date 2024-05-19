import { useEffect, useState } from "react";
import axios from "axios";
import data from "../data/data.json";
import { useParams, useOutletContext } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Carousel from "react-bootstrap/Carousel";
import { api } from "../utilities";
import Spinner from "react-bootstrap/Spinner";
import Map from "../components/map";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import { WishlistAlert } from "@/components/WishlistAlert";
import { AddVisitAlert } from "@/components/AddVisitAlert";
import { RemoveVisitAlert } from "@/components/RemoveVisitAlert";
import { RemoveWishlistAlert } from "@/components/RemoveWishlistAlert";

const AParkPage = () => {
  const { name, code } = useParams();
  const {
    visits,
    setVisits,
    latlong,
    setLatlong,

    updateVisits,
    wishlist,
    setWishlist,
    updateWishlist,
  } = useOutletContext();

  const [parkAlerts, setParkAlerts] = useState([]);
  const [parkBoundary, setParkBoundary] = useState([]);
  const [parkData, setParkData] = useState({});

  const [loading, setLoading] = useState(true);
  const [parkImages, setParkImages] = useState([]);
  // const [parkName, setParkName] = useState([]);
  const [parkLatLong, setParkLatLong] = useState({});
  const [mapLoading, setMapLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [directionsInfo, setDirectionsInfo] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [designation, setDesignation] = useState("");

  const getParkData = async () => {
    try {
      let response = await api.get(`parks/${code}/`);
      let results = response.data;
      setParkData(results);
      setParkLatLong({
        longitude: results.park.longitude,
        latitude: results.park.latitude,
      });
      setParkImages(results.images);
      setDescription(results.park.description);
      setDirectionsInfo(results.park.directionsInfo);
      setWeatherInfo(results.park.weatherInfo);
      setDesignation(results.park.designation);
      console.log("description", results);
      // if (results) {
      //   setParkData(results);
      // } else {
      //   console.error("An error occurred: Invalid response data");
      // }
    } catch (error) {
      // Handle errors
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getParkData();
  }, []);

  //! This function grabs alerts for a park from the NPS API
  const getParkAlerts = async () => {
    try {
      let response = await api.get(`nps/alert/${code}`);
      let results = response.data;
      // console.log("bparkpage", parkLatLong);
      if (results === "There are no current alerts for this park.") {
        setParkAlerts([]);
      } else setParkAlerts(results);
      setLoading(false);
      // console.group(results);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getParkAlerts();
  }, []);

  //! get the visits from the database and set the visits useState
  const getVisits = async () => {
    try {
      let response = await api.get(`visited/all-visits/`);
      let results = response.data;
      // console.log(results);
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

  const getParkBoundary = async () => {
    try {
      let pbresponse = await api.get(`nps/parkboundary/${code}`);
      let pbresults = pbresponse.data;
      if (pbresults == []) {
        setParkBoundary(null);
      } else {
        setParkBoundary(pbresults);
      }
      console.log(parkBoundary);
      setMapLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setMapLoading(false);
    }
  };

  useEffect(() => {
    getParkBoundary();
  }, []);

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
    <>
      <main
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/957079/hintersee-ramsau-berchtesgaden-bavaria-957079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          // backgroundAttachment: "fixed",
        }}
      >
        <div>
          <div className="display-1  shadow-lg-sucess text-info bg-success bg-opacity-75  roundedsticky-top text-success-emphasis">
            {" "}
            {name}
          </div>
          <h3 className="p-1 fs-2">{designation} </h3>
          <span
            style={{ width: "25%" }}
            className="bg-white opacity-100 rounded d-block mx-auto border-green"
          >
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
            <span>
              {" "}
              <> </>
            </span>

            <> </>
            {wishlist.some((wish) => wish.parkCode.parkCode === code) ? (
              <RemoveWishlistAlert
                id={getID(code, wishlist)}
                wishlist={wishlist}
                setWishlist={setWishlist}
                updateWishlist={updateWishlist}
              />
            ) : (
              <WishlistAlert
                parkCode={code}
                wishlist={wishlist}
                setWishlist={setWishlist}
                updateWishlist={updateWishlist}
              />
            )}
          </span>
        </div>
        <div className="bg-light">
          <Card
            className=" bg-success bg-opacity-25"
            style={{
              width: "100%",
            }}
          >
            <ListGroup>
              {parkAlerts.length === 0 ? (
                <ListGroup.Item
                  className="p-3 text-success bg-light-subtle border border-success-subtle d-block mx-auto  rounded-3 w-30"
                  interval={4000}
                >
                  <h2>{"There Are No Current Alerts For This Park."}</h2>
                </ListGroup.Item>
              ) : (
                <>
                  <ListGroup.Item className="p-2 fs-3 fw-bolder text-danger-emphasis bg-danger-subtle border border-danger rounded-3">
                    {" "}
                    PARK ALERTS
                  </ListGroup.Item>
                  {parkAlerts.map((alert, index) => (
                    <ListGroup.Item
                      className="p-2 text-danger-emphasis bg-danger-subtle border border-danger rounded-1"
                      interval={4000}
                      key={index}
                    >
                      {alert.description}
                    </ListGroup.Item>
                  ))}
                </>
              )}
            </ListGroup>
            <Container>
              <Row>
                <Col className="d-flex flex-column justify-content-start border rounded">
                  <h3 className="primary-title text-center rounded mb-3">
                    Pictures of {name}
                  </h3>
                  <Carousel>
                    {parkImages.map((image, index) => (
                      <Carousel.Item interval={4000} key={index}>
                        <img
                          src={image.url}
                          alt={image.title}
                          style={{ width: "100%" }}
                        />
                        <Carousel.Caption>
                          <h3 className="text-info bg-success bg-opacity-50">
                            {image.title}
                          </h3>
                        </Carousel.Caption>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>

                <Col className="d-flex flex-column justify-content-around border rounded">
                  {mapLoading ? (
                    <div>
                      <h1>
                        <Spinner animation="border" variant="success" />
                        <Spinner animation="grow" variant="success" />
                        Loading ...{" "}
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="border" variant="success" />
                      </h1>
                    </div>
                  ) : (
                    <Map
                      parkLatLong={parkLatLong}
                      parkBoundary={
                        parkBoundary.length === 0 ? null : parkBoundary
                      }
                      parkName={name}
                    />
                  )}
                </Col>
              </Row>
            </Container>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group">
              <Card.Body>
                <Card.Title>Park Weather Information</Card.Title>
                <Card.Text>{weatherInfo}</Card.Text>
              </Card.Body>
            </ListGroup>
            <Card.Body>
              <Card.Title>Visiting the Park</Card.Title>
              <Card.Text>{directionsInfo}</Card.Text>
              <Card.Link href={`https://www.nps.gov/${code}/index.htm`}>
                {name} Website
              </Card.Link>
              <Card.Link
                href={`https://www.nps.gov/${code}/planyourvisit/directions.htm`}
              >
                Directions to {name}
              </Card.Link>
            </Card.Body>
            {/* </ListGroup> */}
          </Card>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </main>
    </>
  );
};

export default AParkPage;
