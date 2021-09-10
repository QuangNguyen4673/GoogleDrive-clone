import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

function File({ file }) {
  // console.log("file from file", file);
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="btn btn-outline-dark text-truncate"
      style={{ maxWidth: "150px" }}
      href={file.url}
    >
      <FontAwesomeIcon className="me-2" icon={faFile} />
      {file.name}
    </a>
  );
}

export default File;
