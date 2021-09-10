import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Folder({ folder }) {
  //console.log("folder:", folder);
  return (
    <>
      <Button
        variant="outline-dark"
        as={Link}
        to={{ pathname: `/folder/${folder.id}`, state: { folder: folder } }}
      >
        <FontAwesomeIcon icon={faFolder} className="me-2" />
        {folder.name}
      </Button>
    </>
  );
}

export default Folder;
