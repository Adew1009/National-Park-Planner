import Alert from "react-bootstrap/Alert";
import { Image } from "react-bootstrap";
import React from "react";

const VeteranPage = () => {
  return (
    <main
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/957079/hintersee-ramsau-berchtesgaden-bavaria-957079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        width: "100%",
        height: "100vh",
      }}
    >
      <br></br>
      <h1 className="display-3 text-white"> Veteran Programs</h1>
      <br></br>
      <h1 className="text-white bg-success bg-opacity-75">
        Free Entrance to National Parks for Current Military, Veterans, and Gold
        Star Families
      </h1>
      <br></br>
      <h4 className="text-white bg-success bg-opacity-75">
        The Gold Star voucher and Military Lifetime Pass cover entrance fees at
        national parks and national wildlife refuges as well as standard amenity
        fees (day use fees) at national forests and grasslands and on lands
        managed by the National Park Service, US Fish and Wildlife Service, US
        Forest Service, Bureau of Land Management, Bureau of Reclamation and US
        Army Corps of Engineers.
      </h4>
      <br></br>
      <h4 className="text-white bg-success bg-opacity-75">
        Current members of the US Armed Forces and their dependents can enter
        national parks for free with an Interagency Military Annual Pass through
        the America the Beautiful – the National Parks and Federal Recreational
        Lands Pass (Interagency) Program.
      </h4>
      <br></br>
      <h4 className="text-white bg-success bg-opacity-75">
        For purposes of this program, a veteran is identified as an individual
        who has served in the US Armed Forces, including the National Guard and
        Reserves. There is no application or form to fill out to receive the
        Military Lifetime Pass. Simply present one of the following forms of
        identification to get the Interagency Military Lifetime Pass when
        entering a national park: Unexpired Department of Defense Identification
        Card (DD Form 2, DD Form 2765, or Next Generation USID replacement)
        Veteran Health Identification Card (VHIC) Veteran ID Card Veterans
        designation on a state-issued US driver’s license or identification card
      </h4>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <h4 className="text-warning bg-success bg-opacity-75">
        The pass does not cover expanded amenity fees such as camping, tours or
        special recreation permits; reservation fees and fees for organized
        groups or concession-operated facilities or activities.
      </h4>
    </main>
  );
};
export default VeteranPage;
