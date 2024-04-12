import axios from "axios";
import { useEffect, useState } from "react";
import dict from "../data/park_list/";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import StateMenu from "../components/StateMenu";
import Accordion from "react-bootstrap/Accordion";
import { ScrollAreaParks } from "@/components/newScroll-area";

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
      <br></br>
      <div>
        <h2>All National Parks and Monuments</h2>
        <ScrollAreaParks parksArray={parksArray} />
        <br></br>
        <br></br>
        <Accordion
          className="w-50 rounded-md border bg-light"
          defaultActiveKey="1"
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header variant="success">
              All National Parks and Monuments by Name
            </Accordion.Header>
            {parksArray.map(
              (
                { name, code },
                index // Corrected map function syntax
              ) => (
                <Accordion.Body
                  className=" bg-light"
                  variant="success"
                  key={index}
                >
                  <Link to={`/park/${name}/${code}`}>{name}</Link>
                </Accordion.Body>
              )
            )}
          </Accordion.Item>
        </Accordion>
        <br></br>
        <br></br>
        <ListGroup className="w-50 rounded-md border bg-light">
          <ListGroup.Item className="text-lg bg-info">
            All National Parks and Monuments by Name
          </ListGroup.Item>
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
