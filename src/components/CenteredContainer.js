import React from "react";
import { Container } from "react-bootstrap";

function CenteredContainer({ children }) {
  return (
    <Container className="d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {children}
      </div>
    </Container>
  );
}

export default CenteredContainer;
