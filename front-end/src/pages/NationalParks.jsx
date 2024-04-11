import axios from "axios";
import { useEffect, useState } from "react";
import dict from "../data/park_list/";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import StateMenu from "../components/StateMenu";
import Accordion from "react-bootstrap/Accordion";

const NationalParksPage = () => {
  const parksArray = [];

  for (const [park, code] of Object.entries(dict)) {
    parksArray.push({
      name: park,
      code: code,
    });
  }
  return (
    <>
      <div>
        <h1> NATIONAL PARKS PAGE</h1>
      </div>
      <h2>National Parks and Monuments by State</h2>
      <StateMenu />
      <div>
        <h2>All National Parks and Monuments</h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header variant="success">
              All National Parks and Monuments by Name
            </Accordion.Header>
            {parksArray.map(
              (
                { name, code },
                index // Corrected map function syntax
              ) => (
                <Accordion.Body variant="success" key={index}>
                  <Link to={`/park/${name}/${code}`}>{name}</Link>
                </Accordion.Body>
              )
            )}
          </Accordion.Item>
        </Accordion>
        <ListGroup>
          {parksArray.map(
            (
              { name, code },
              index // Corrected map function syntax
            ) => (
              <ListGroup.Item variant="success" key={index}>
                <Link to={`/park/${name}/${code}`}>{name}</Link>
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </div>
    </>
  );
};

export default NationalParksPage;

// const [allparks, setAllparks] = useState([]);

// const getAllParks = async () => {
//   try {
//     let response = await axios.get(
//       "https://developer.nps.gov/api/v1/parks?limit=1&api_key=IeNCbfYIqnMxGbTQN2UiPI6gxBSWPXfIcqyYGnde"
//     );
//     let results = response.data.data;
//     setAllparks(results);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// };
// console.log(data);

// useEffect(() => {
//   getAllParks();
// }, []);
// if (!allparks) {
//   return <h1> Loading ...</h1>;
// }
