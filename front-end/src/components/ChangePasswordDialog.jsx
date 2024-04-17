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
import { userRegistration, userLogIn } from "../utilities";
import { Link } from "react-router-dom";
import { userConfirmation } from "../utilities";
import { api } from "../utilities";

const ChangePasswordDialog = ({ setUser }) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [password, setPassword] = useState("");
  // const { setUser } = useOutletContext();

  const UpdatePassword = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      try {
        let response = await api.put("users/", {
          password: password,
          new_password: newPassword,
        });
        console.log(response.data);
        return [response.data.display_name, response.data.password];
      } catch (error) {
        console.error("Error fetching user confirmation:", error);
      }
      delete api.defaults.headers.common["Authorization"];
    }
    return null;
  };

  const handleUpdatepassword = async () => {
    await UpdatePassword();
    await userConfirmation();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-sm" variant="outline-primary">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* <DialogTitle className="display-4"> Change Password </DialogTitle> */}
          <DialogTitle>Enter Current and New Password.</DialogTitle>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4"> */}
        <div>
          {/* <div className="grid grid-cols-4 items-center gap-4"> */}
          <div>
            <Form
              onSubmit={async (e) => {
                // e.preventDefault();
                await handleUpdatepassword();
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Current Password"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  type="password"
                  placeholder="Enter New Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  onChange={(e) => setNewPasswordAgain(e.target.value)}
                  value={newPasswordAgain}
                  type="password"
                  placeholder="Re-Enter New Password"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <div className="text-center">{/* ADD FINCTIONALITY */}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ChangePasswordDialog;
