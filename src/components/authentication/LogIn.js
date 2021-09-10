import React, { useRef, useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "../CenteredContainer";

const LogIn = () => {
  const { logIn, currentUser } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    await logIn(emailRef.current.value, passwordRef.current.value);
    setLoading(false);
  };
  console.log("current user from login", currentUser);
  return (
    <CenteredContainer>
      <div className="login">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {currentUser && currentUser.email}
            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} />
              </Form.Group>
              <Button
                disabled={loading}
                onClick={handleClick}
                type="submit"
                className="w-100 text-center mt-2"
              >
                Sign in
              </Button>
            </Form>
            <Link to="/forgotpassword">Forgot password</Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </CenteredContainer>
  );
};

export default LogIn;
