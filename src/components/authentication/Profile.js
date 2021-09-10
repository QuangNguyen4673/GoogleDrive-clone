import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CenteredContainer from "../CenteredContainer";

const Profile = () => {
  const { logOut, currentUser } = useAuth();
  const history = useHistory();
  const handleUpdate = () => {
    history.push("/update-profile");
  };
  return (
    <CenteredContainer>
      <div className="profile">
        <Card>
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
    </CenteredContainer>
  );
};

export default Profile;
