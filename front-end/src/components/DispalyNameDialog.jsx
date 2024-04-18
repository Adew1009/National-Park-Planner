// import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useOutletContext, useNavigate } from "react-router-dom";
import { api } from "@/utilities";
import { Link } from "react-router-dom";

const DisplayNameDialog = ({ user, setUser }) => {
  const [displayName, setDisplayName] = useState("");

  const UpdateDisplayName = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      try {
        let response = await api.put("users/", {
          display_name: displayName,
        });
        console.log("Made it to displayName", displayName);
        console.log(response.data);
        return [response.data.display_name];
      } catch (error) {
        console.error("Error fetching user confirmation:", error);
      }
      delete api.defaults.headers.common["Authorization"];
    }
    return null;
  };

  const handleUpdateDisplayName = async () => {
    await UpdateDisplayName();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-sm" variant="outline-primary">
          {" "}
          {user[1] === "email" ? "Add Display Name" : "Change Display Name"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Your Desired Display Name.</DialogTitle>
        </DialogHeader>

        <div>
          <div>
            <Form
              onSubmit={async (e) => {
                // e.preventDefault();
                await handleUpdateDisplayName();
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                  type="text"
                  placeholder="Enter Display Name"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <Form></Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DisplayNameDialog;
