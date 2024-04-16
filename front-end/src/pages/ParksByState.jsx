import axios from "axios";
import { useEffect, useState } from "react";
import dict from "../data/park_list/";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import StateMenu from "../components/StateMenu";
import { useParams, useOutletContext } from "react-router-dom";
import { api } from "../utilities";
import Spinner from "react-bootstrap/Spinner";

const ParksByStatePage = () => {
  const { statename, state } = useParams();
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const parksArray = [];

  //   for (const [park, code] of Object.entries(dict)) {
  //     parksArray.push({
  //       name: park,
  //       code: code,
  //     });
  //   }
  const getParks = async () => {
    try {
      let response = await api.get(`nps/parkbystate/${state}`);
      let results = response.data;
      setParks(results);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getParks();
  }, [state]);

  if (loading) {
    return (
      <div>
        <h1>
          {" "}
          <Spinner animation="border" variant="success" />
          <Spinner animation="grow" variant="success" />
          Loading ... <Spinner animation="grow" variant="success" />
          <Spinner animation="border" variant="success" />
        </h1>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-white">
          {" "}
          National Parks and Monuments in {statename}
        </h1>
      </div>
      {/* <StateMenu /> */}
      <div>
        <ListGroup>
          {parks.map((park, index) => (
            <ListGroup.Item variant="success" key={index}>
              <Link to={`/park/${park.fullName}/${park.parkCode}`}>
                {park.fullName}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
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
    </>
  );
};

export default ParksByStatePage;
