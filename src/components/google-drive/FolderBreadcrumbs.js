import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../hooks/useFolder";

function FolderBreadcrumbs({ currentFolder }) {
  // ROOT_FOLDER {id,name,path}
  // Nếu current là root thì path = rỗng
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) {
    path = [...path, ...currentFolder.path];
  }

  return (
    <Breadcrumb listProps={{ className: "m-0" }}>
      {path.map((folder, index) => {
        /* console.log("folder:", folder);
        console.log("path:", path); */
        return (
          <Breadcrumb.Item
            key={index}
            className="text-truncate text-capitalize"
            style={{ maxWidth: "150px" }}
            linkAs={Link}
            linkProps={{
              to: { pathname: folder.id ? `/folder/${folder.id}` : "/" },
            }}
          >
            {folder.name}
          </Breadcrumb.Item>
        );
      })}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate text-capitalize"
          style={{ maxWidth: "150px" }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}

export default FolderBreadcrumbs;
