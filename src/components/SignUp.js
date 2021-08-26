import React, { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as faker from "faker/locale/en";
import FormAutoFill from "./FormAutoFill";
const SignUp = () => {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [loading, setLoading] = useState(false);
  const { signUp, currentUser } = useAuth();

  const history = useHistory();

  const handleClick = async () => {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return;
    }
    setLoading(true);
    await signUp(
      userNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    setLoading(false);
    history.push("/login");
  };

  return (
    <>
      <FormAutoFill
        refs={{ userNameRef, emailRef, passwordRef, passwordConfirmRef }}
      />
      <Card className="w-100 mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          {currentUser && currentUser.email}
          <Form>
            <Form.Group id="username">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" ref={userNameRef} />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="passwordConfirm">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Button
              disabled={loading}
              onClick={handleClick}
              type="button"
              className="w-100 text-center mt-2"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
