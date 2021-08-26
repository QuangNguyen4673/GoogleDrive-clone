import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const UpdateInfo = () => {
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const handleClick = async () => {
    setError("");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    let promises = [];

    setLoading(true);

    if (currentUser.email !== emailRef.current.value) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        console.log("update successfully");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className="w-100 mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <Card.Body>
        <h2 className="text-center mb-4">Update Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              ref={emailRef}
              defaultValue={currentUser.email}
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="leave blank if you dont want to change"
              ref={passwordRef}
            />
          </Form.Group>
          <Form.Group id="passwordConfirm">
            <Form.Label>Password Confirm</Form.Label>
            <Form.Control
              type="password"
              placeholder="leave blank if you dont want to change"
              ref={passwordConfirmRef}
            />
          </Form.Group>

          <Button
            disabled={loading}
            onClick={handleClick}
            type="button"
            className="w-100 text-center mt-2"
          >
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpdateInfo;
