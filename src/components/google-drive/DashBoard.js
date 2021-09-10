import React, { useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import NavBar from "./NavBar";
import AddFolderButton from "./AddFolderButton";
import useFolder from "../../hooks/useFolder";
import Folder from "./Folder";
import File from "./File";
import { useLocation, useParams } from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddFileButton from "./AddFileButton";

function DashBoard() {
  const { state = {} } = useLocation();
  const [progress, setProgress] = useState(null);
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  return (
    <>
      <NavBar />
      <div className="my-dashboard">
        <Container className="main-dashboard">
          <div className="path-and-addbtns">
            <div className="path">
              <FolderBreadcrumbs currentFolder={folder} />
            </div>
            <div className="addbtns">
              <AddFileButton currentFolder={folder} setProgress={setProgress} />
              <AddFolderButton currentFolder={folder} />
            </div>
          </div>

          <div className="user-belongings">
            <div className="user-belongings-folders">
              {childFolders.length > 0 &&
                childFolders.map((childFolder) => {
                  return (
                    <div key={childFolder.id} className="mb-2">
                      <Folder folder={childFolder} />
                    </div>
                  );
                })}
            </div>
            {childFolders.length > 0 && childFiles.length > 0 && <hr />}
            {progress && (
              <ProgressBar
                now={progress}
                className="mx-auto"
                style={{ maxWidth: "50%" }}
              />
            )}
            <div className="user-belongings-files">
              {childFiles.length > 0 &&
                childFiles.map((childFile) => {
                  return (
                    <div key={childFile.id} className="mb-2">
                      <File file={childFile} />
                    </div>
                  );
                })}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default DashBoard;
