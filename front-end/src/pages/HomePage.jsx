import Alert from "react-bootstrap/Alert";
import { Image } from "react-bootstrap";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HomePage = () => {
  return (
    <>
      <main
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/5480728/pexels-photo-5480728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
          backgroundAttachment: "fixed",
        }}
      >
        <div width="18rem">
          <Alert width="50" variant="success">
            <h1> Welcome to the National Park Planner</h1>
            <h3>
              {" "}
              The best place to find up date information about US National Parks
              and Memorials
            </h3>
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
      </main>
    </>
  );
};

export default HomePage;
