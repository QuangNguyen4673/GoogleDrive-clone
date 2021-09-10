import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { database, timeStamp } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

function AddFolderButton({ currentFolder }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { currentUser } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentFolder === null) return;
    console.log(currentFolder);
    let path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    database.folders.add({
      name: name,
      createdAt: timeStamp(),
      userId: currentUser.uid,
      parentId: currentFolder.id,
      path: path,
    });
    setName("");
    handleClose();
  };

  return (
    <>
      <Button type="button" variant="outline-success" onClick={handleShow}>
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="folder-name">
              <Form.Label>Folder name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter folder name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddFolderButton;
