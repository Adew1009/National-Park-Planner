import { useEffect, useState } from "react"; // Import useEffect
// import { useOutletContext } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import WishListCard from "../components/wishlist_parkcard";
import { api } from "../utilities";
import VisitMap from "../components/VisitMap";
import Spinner from "react-bootstrap/Spinner";

const ParkWishListPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [latlong, setLatlong] = useState([]);
  const [mapLoading, setMapLoading] = useState(true);
  // const [loading, setLoading] = useState(true);

  //! get the visits from the database and set the visits useState
  const getWishlist = async () => {
    try {
      let response = await api.get(`wishlist/allwishlist/`);
      let results = response.data;
      console.log("results", results);
      setWishlist(results);
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

  useEffect(() => {
    getWishlist();
  }, []);

  const updateWishlist = () => {
    getWishlist();
    setMapLoading(true);
  };

  return (
    <>
      <h1>Park Wishlist</h1>
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
      <Row>
        {wishlist.map((park) => (
          <Col key={park.id}>
            <WishListCard
              images={park.parkCode.images} // Use state variable directly
              name={park.parkCode.fullName} // Use state variable directly
              id={park.id}
              updateWishlist={updateWishlist} // Pass updateVisits function to VisitedParkCard
              code={park.parkCode.parkCode}
            />
            <br></br>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ParkWishListPage;
