import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

type Props = {
  refreshFunction: (newImages: string[]) => void;
};

function FileUpload({ refreshFunction }: Props) {
  // 이미지의 filePath를 저장하는 배열
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // File을 업로드 했을 때
  const handleDropImage = (files: File[]) => {
    const formData = new FormData();

    formData.append("file", files[0]);

    axios.post("/api/product/image", formData).then((response) => {
      if (response.data.success) {
        setUploadedImages([...uploadedImages, response.data.filePath]);
        refreshFunction([...uploadedImages, response.data.filePath]);
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };

  const handleDelete = (image: string) => {
    const currentIndex = uploadedImages.indexOf(image);
    let newuploadedImages = [...uploadedImages];
    newuploadedImages.splice(currentIndex, 1);
    setUploadedImages(newuploadedImages);
    refreshFunction(newuploadedImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* 이미지 업로드 하는 곳 */}
      <Dropzone onDrop={handleDropImage}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <button type="button" style={{ fontSize: "0.5rem" }}>upload</button>
          </div>
        )}
      </Dropzone>

      {/* 업로드한 이미지 보여주는 곳 */}
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {uploadedImages.map((image, index) => (
          <div onClick={() => handleDelete(image)} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
