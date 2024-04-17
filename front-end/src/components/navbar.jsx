import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { userLogOut } from "../utilities";
import LoginDialog from "./LoginDialog";
import SignupDialog from "./SignupDialog";
import DisplayNameDialog from "./DispalyNameDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
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
          <Navbar.Brand className="display- text-success" href="/">
            National Park Planner
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!user ? (
                <>
                  <SignupDialog setUser={setUser} />
                  <h2>" "</h2>
                  <LoginDialog setUser={setUser} user={user} />

                  <h2>" "</h2>
                  <h3 className="text-warning">
                    Please Login or Sign Up for full site features
                  </h3>
                </>
              ) : (
                <>
                  {/* <Button size="sm" variant="outline-success" as={Link} to="/">
                    Home
                  </Button>
                  <h2>" "</h2> */}
                  <Button variant="outline-success" as={Link} to="/allparks">
                    Find A National Park
                  </Button>
                  <h2>" "</h2>
                  <Button
                    variant="outline-success"
                    as={Link}
                    to="/visitedparks"
                  >
                    Your Visited Parks
                  </Button>
                  <h2>" "</h2>
                  <Button variant="outline-success" as={Link} to="/wishparks">
                    Your Park Wish List
                  </Button>
                  <h2>" "</h2>
                  <Button variant="outline-success" as={Link} to="/about">
                    About
                  </Button>
                  <h2>" "</h2>

                  {/*FIX TO DISPLAY THE USER INFO  */}
                  <div>
                    <h5 className="text-primary">
                      Logged in as: {user[1] === "email" ? user[0] : user[1]}
                      <br></br>
                    </h5>
                    <ChangePasswordDialog setUser={setUser} />
                    <DisplayNameDialog user={user} setUser={setUser} />
                  </div>
                  <h5>""</h5>
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
