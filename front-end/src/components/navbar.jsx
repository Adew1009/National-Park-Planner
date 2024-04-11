import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { userLogOut } from "../utilities";
import LoginDialog from "./LoginDialog";
import SignupDialog from "./SignupDialog";
//! ADD DISPLAY NAME TO THE NAVBAR

const PageNavbar = ({ setUser, user }) => {
  return (
    <>
      <Navbar
        variant="success"
        className="sticky-top"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand className="display- text-success-emphasis" href="/">
            National Park Planner
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!user ? (
                <>
                  <SignupDialog setUser={setUser} />
                  <LoginDialog setUser={setUser} />
                  <Button variant="outline-warning" as={Link} to="/signup/">
                    Sign Up
                  </Button>
                  <h2>" "</h2>
                  <Button variant="outline-warning" as={Link} to="/login/">
                    Log In
                  </Button>
                  <h2>" "</h2>
                  <h3 className="text-warning">
                    Please Login or Sign Up for full site features
                  </h3>
                </>
              ) : (
                <>
                  <Button variant="outline-success" as={Link} to="/">
                    Home
                  </Button>
                  <h2>" "</h2>
                  <Button variant="outline-success" as={Link} to="/allparks">
                    National Parks
                  </Button>
                  <h2>" "</h2>
                  <Button
                    variant="outline-success"
                    as={Link}
                    to="/visitedparks"
                  >
                    Visited Parks
                  </Button>
                  <h2>" "</h2>
                  <Button variant="outline-success" as={Link} to="/wishparks">
                    Park Wish List
                  </Button>
                  <h2>" "</h2>
                  <Button variant="outline-success" as={Link} to="/about">
                    About
                  </Button>
                  <h2>" "</h2>

                  {/*FIX TO DISPLAY THE USER INFO  */}
                  <h3 className="text-info">Logged in as: {user}</h3>
                  <h2>" "</h2>
                  <Button
                    variant="outline-danger"
                    onClick={async () => setUser(await userLogOut())}
                  >
                    Log Out
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default PageNavbar;
