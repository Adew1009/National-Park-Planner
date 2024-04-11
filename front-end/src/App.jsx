// import { useState } from "react";
import "./App.css";
import { useEffect, useState } from "react";
import PageNavbar from "./components/navbar";

import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(useLoaderData());
  const location = useLocation();
  const navigate = useNavigate();

  //? Code To Show An Alert
  //?  if (favorites.length >= 4) {
  //?     setShowAlert(true);
  useEffect(() => {
    let nullUserUrls = ["/login/", "/signup/"];
    let isAllowed = nullUserUrls.includes(location.pathname);
    if (user && isAllowed) {
      navigate("/");
    } else if (!user && !isAllowed) {
      navigate("/");
    }
  }, [location.pathname, user]);

  return (
    <main>
      {/* <Alert
        className="fixed-top"
        show={showAlert}
        variant="danger"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        <Alert.Heading>
          Oh Jeez! You did it now! You got an error!
        </Alert.Heading>
        <p>
          You can only have 4 four favorites! You will need to send some back to
          another dimension to pick this one.{" "}
        </p>
      </Alert> */}
      <div id="App">
        <PageNavbar setUser={setUser} user={user} />
        <div>
          <Outlet
            context={{
              user,
              setUser,
            }}
          />
        </div>
      </div>
    </main>
  );
}
export default App;
