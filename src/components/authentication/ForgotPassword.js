import { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import CenteredContainer from "../CenteredContainer";

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
    <CenteredContainer>
      <Card>
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
    </CenteredContainer>
  );
};

export default ForgotPassword;
