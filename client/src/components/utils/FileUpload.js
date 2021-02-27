import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function FileUpload(props) {
  // 이미지의 filePath를 저장하는 배열
  const [Images, setImages] = useState([]);

  // File을 업로드 했을 때
  const dropHandler = (files) => {
    let formData = new FormData();

    formData.append("file", files[0]);

    axios.post("/api/product/image", formData).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.filePath]);
        props.refreshFunction([...Images, response.data.filePath]);
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };

  // 이미지를 클릭하면 삭제
  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* 이미지 업로드 하는 곳 */}
      <Dropzone onDrop={dropHandler}>
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
            <button type="plus" style={{ fontSize: "0.5rem" }}>
              upload
            </button>
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
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
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
