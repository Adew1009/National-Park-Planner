import Alert from "react-bootstrap/Alert";
import { Image } from "react-bootstrap";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HomePage = () => {
  return (
    <>
      <div width="18rem">
        <Alert width="50" variant="success">
          <h1> National Park Planner</h1>
        </Alert>
      </div>{" "}
      <div className="text-center">
        <Container>
          <Row>
            <Col className="m-auto">
              {/* <Col xs={12} sm={4} md={4}> */}
              <Image
                className="d-block mx-auto img-fluid w-75"
                src="https://angelastaehling.com/cdn/shop/products/US-National-Parks-Map-Blue_1500x.png?v=1660134768"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
