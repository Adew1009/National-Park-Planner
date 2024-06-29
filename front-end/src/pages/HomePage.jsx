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
                <Image
                  className="d-block mx-auto img-fluid w-75"
                  src="https://i.etsystatic.com/6408581/r/il/7fad77/2041264072/il_1588xN.2041264072_s7yt.jpg"
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
