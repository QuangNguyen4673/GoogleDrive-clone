import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashBoard = () => {
  const { logOut, currentUser } = useAuth();
  const history = useHistory();
  const handleUpdate = () => {
    history.push("/updateinfo");
  };
  return (
    <div className="profile">
      <Card className="w-100 mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <div className="email-info">
            <span>Email:</span>
            <div>{currentUser && currentUser.email}</div>
          </div>
          <Button type="button" onClick={() => handleUpdate()}>
            Update Profile
          </Button>
        </Card.Body>
      </Card>
      <a className="logout-link" href="/#" onClick={() => logOut()}>
        Log Out
      </a>
    </div>
  );
};

export default DashBoard;
