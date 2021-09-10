import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { database, storage, timeStamp } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidv4 } from "uuid";
import reactDom from "react-dom";
import { ProgressBar, Toast } from "react-bootstrap";

function AddFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const { currentUser } = useAuth();
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const id = uuidv4();
    setUploadingFiles((prev) => [
      ...prev,
      { id: id, name: file.name, progress: 0, error: false },
    ]);

    let filePath = "";
    if (currentFolder === ROOT_FOLDER) {
      filePath = file.name;
    } else {
      const currentFolderPathname = currentFolder.path.map((item) => item.name);
      filePath = [...currentFolderPathname, currentFolder.name].join("/");
      filePath = `${filePath}/${file.name}`;
    }
    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadingFiles((prev) => {
          return prev.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, percentage: percentage };
            }
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prev) => {
          return prev.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }
            return uploadFile;
          });
        });
      },
      async () => {
        const url = await uploadTask.snapshot.ref.getDownloadURL();
        // add to collection "files"
        database.files
          .where("userId", "==", currentUser.uid)
          .where("folderId", "==", currentFolder.id)
          .where("name", "==", file.name)
          .get()
          .then((existingFiles) => {
            const existingFile = existingFiles.docs[0];
            if (existingFile) {
              console.log("top");
              existingFile.ref.update({ url: url });
            } else {
              console.log("bottom");
              database.files.add({
                url: url,
                name: file.name,
                folderId: currentFolder.id,
                createdAt: timeStamp(),
                userId: currentUser.uid,
              });
            }
          });

        setUploadingFiles((prev) => {
          return prev.filter((uploadFiles) => uploadFiles.id !== id);
        });
      }
    );
  };
  console.log(uploadingFiles);
  return (
    <>
      <label className="btn btn-outline-success">
        <input type="file" className="d-none" onChange={handleChange} />
        <FontAwesomeIcon icon={faFileUpload} />
      </label>

      {uploadingFiles.length > 0 &&
        reactDom.createPortal(
          <div
            className="bs-toast"
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "170px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                onClose={() =>
                  setUploadingFiles((prev) => {
                    return prev.filter(
                      (uploadFile) => uploadFile.id !== file.id
                    );
                  })
                }
              >
                <Toast.Header closeButton={file.error}>
                  <div className="text-truncate d-block mb-1">{file.name}</div>
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.percentage}
                    label={
                      file.error
                        ? "Error"
                        : `${(file.percentage * 1).toFixed(0)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

export default AddFileButton;
