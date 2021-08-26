import { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const hadleClick = async () => {
    setLoading(true);
    await resetPassword(emailRef.current.value);
    setLoading(false);
  };
  return (
    <div>
      <Card className="w-100 mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
          </Form>
          <Button type="button" disabled={loading} onClick={() => hadleClick()}>
            Send Email Reset
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword;
