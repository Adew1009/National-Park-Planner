import { useEffect, useState } from "react"; // Import useEffect
// import { useOutletContext } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import WishListCard from "../components/wishlist_parkcard";
import { api } from "../utilities";
import VisitMap from "../components/VisitMap";
import Spinner from "react-bootstrap/Spinner";
import { useParams, useOutletContext } from "react-router-dom";
import Stack from "react-bootstrap/Stack";

const ParkWishListPage = () => {
  const {
    wishlist,
    setWishlist,
    wishlatlong,
    setWishLatlong,
    wishmapLoading,
    setWishMapLoading,
    updateWishlist,
    visits,
    setVisits,
    updateVisits,
  } = useOutletContext();

  return (
    <>
      <main
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/10329447/pexels-photo-10329447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          width: "100%",
        }}
      >
        <h1>Park Wishlist</h1>
        <h3>Map of Your Current Wishlist Parks</h3>
        {wishmapLoading ? (
          <div>
            <h1>
              <Spinner animation="border" variant="success" />
              <Spinner animation="grow" variant="success" />
              Loading ... <Spinner animation="grow" variant="success" />
              <Spinner animation="border" variant="success" />
            </h1>
          </div>
        ) : (
          <VisitMap latlong={wishlatlong} color={"lightgreen"} />
        )}
        <Row>
          {wishlist.map((park) => (
            <Col key={park.id}>
              <WishListCard
                images={park.parkCode.images}
                name={park.parkCode.fullName}
                id={park.id}
                updateWishlist={updateWishlist}
                code={park.parkCode.parkCode}
                setVisits={setVisits}
                visits={visits}
              />
              <br></br>
            </Col>
          ))}
        </Row>
      </main>
    </>
  );
};

export default ParkWishListPage;
