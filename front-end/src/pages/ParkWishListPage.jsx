import { useEffect, useState } from "react"; // Import useEffect
// import { useOutletContext } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import WishListCard from "../components/wishlist_parkcard";
import { api } from "../utilities";
import VisitMap from "../components/VisitMap";
import Spinner from "react-bootstrap/Spinner";
import { useParams, useOutletContext } from "react-router-dom";

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
  //   const [wishlist, setWishlist] = useState([]);
  //   const [wishlatlong, setWishLatlong] = useState([]);
  //   const [wishmapLoading, setWishMapLoading] = useState(true);
  //   // const [loading, setLoading] = useState(true);

  //   //! get the visits from the database and set the visits useState
  //   const getWishlist = async () => {
  //     try {
  //       let response = await api.get(`wishlist/allwishlist/`);
  //       let results = response.data;
  //       console.log("results", results);
  //       setWishlist(results);
  //       // setLoading(false);
  //       const latlonglist = [];
  //       results.map((park) =>
  //         latlonglist.push([
  //           [park.parkCode.longitude, park.parkCode.latitude],
  //           park.parkCode.fullName,
  //         ])
  //       );
  //       setWishLatlong(latlonglist);
  //       console.log("latlonglist", latlonglist);
  //       setWishMapLoading(false);
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     getWishlist();
  //   }, []);

  //   const updateWishlist = () => {
  //     getWishlist();
  //     setWishMapLoading(true);
  //   };

  return (
    <>
      <main
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/10329447/pexels-photo-10329447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          width: "100%",

          // height: "100%",
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
          <VisitMap latlong={wishlatlong} />
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
                setVisits={setVisits}
                visits={visits}
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

export default ParkWishListPage;
