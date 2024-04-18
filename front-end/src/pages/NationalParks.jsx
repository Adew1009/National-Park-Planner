import axios from "axios";
import { useEffect, useState } from "react";
import dict from "../data/park_list/";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import StateMenu from "../components/StateMenu";
import Accordion from "react-bootstrap/Accordion";
// import { ScrollAreaParks } from "@/components/newScroll-area";
import { AddVisitAlert } from "@/components/AddVisitAlert";
import { WishlistAlert } from "@/components/WishlistAlert";
import { useParams, useOutletContext } from "react-router-dom";
import { RemoveVisitAlert } from "@/components/RemoveVisitAlert";
import { RemoveWishlistAlert } from "@/components/RemoveWishlistAlert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StateMap from "@/components/stateMap";
const NationalParksPage = () => {
  const {
    visits,
    setVisits,
    latlong,
    setLatlong,
    mapLoading,
    updateVisits,
    wishlist,
    setWishlist,
    wishlatlong,
    setWishLatlong,
    wishmapLoading,
    setWishMapLoading,
    updateWishlist,
  } = useOutletContext();
  const parksArray = [];

  for (const [park, code] of Object.entries(dict)) {
    parksArray.push({
      name: park,
      code: code,
    });
  }

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

  // const handleGetID = async (parkCode, list) => {
  //   await getID(parkCode, list);
  // };
  console.log(wishlist.some((wish) => wish.parkCode.parkCode === "afam"));
  console.log(getID("afam", wishlist));
  console.log(wishlist);
  return (
    <>
      <main
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/2452241/pexels-photo-2452241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="d-flex align-items-center justify-content-center">
          <div className="display-4 text-border "> Find A National Park</div>
        </div>
        <br></br>
        <div className=" d-flex align-items-center justify-content-center">
          <h3 className="text-white bg-success bg-opacity-50 w-75 d-flex align-items-center justify-content-center ">
            Click on the Map to Find Parks Located in that State
          </h3>
        </div>
        <div className="rounded">
          <StateMap />
        </div>{" "}
        <Container className="d-block rounded mx-auto img-fluid w-40">
          <Row>
            <Col className="rounded-md mx-auto border  bg-success bg-opacity-50">
              <h2 className="bg-success bg-opacity-50">
                National Parks and Monuments by State
              </h2>
              <StateMenu />
              <br></br>
            </Col>
            <Col className="rounded-md mx-auto border bg-success bg-opacity-50">
              <div className="bg-success bg-opacity-50">
                <h2>All National Parks and Monuments</h2>

                <Accordion
                  className="mx-auto img-fluid w-90 rounded-md border bg-success bg-opacity-75"
                  defaultActiveKey="1"
                  flush
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header
                      variant="success"
                      className="text-center img-fluid w-100 rounded-md border bg-success bg-opacity-75"
                    >
                      Click For All National Parks and Monuments by Name
                    </Accordion.Header>
                    {parksArray.map(({ name, code }, index) => (
                      <Accordion.Body
                        className=" bg-success bg-opacity-25"
                        variant="success"
                        key={index}
                      >
                        <Link to={`/park/${name}/${code}`}>{name}</Link>
                        <br></br>
                        {visits.some(
                          (visit) => visit.parkCode.parkCode === code
                        ) ? (
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
                        {wishlist.some(
                          (wish) => wish.parkCode.parkCode === code
                        ) ? (
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
                      </Accordion.Body>
                    ))}
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>
          </Row>
        </Container>
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

export default NationalParksPage;
