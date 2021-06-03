import React, { useState } from "react";
import FileUpload from "./Sections/FileUpload";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserState } from "_reducers/user_reducer";
import { useHistory } from "react-router";

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];
const UploadProductPage = () => {
  const user = useSelector((state: { user: UserState }) => state.user);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [continents, setContinent] = useState(1);
  const [images, setImages] = useState<string[]>([]);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.currentTarget.value);
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.currentTarget.value);
  };

  const handleChangeContinents = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setContinent(parseInt(event.currentTarget.value));
  };

  const updateImages = (newImages: string[]) => {
    setImages(newImages);
  };

  const handleSubmitUploadForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !title ||
      !description ||
      !price ||
      !continents ||
      images.length === 0
    ) {
      return alert(" 모든 값을 넣어주셔야 합니다.");
    }

    const body = {
      writer: user.userData._id,
      title,
      description,
      price: parseInt(price),
      images,
      continents,
    };

    axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공 했습니다.");
        history.push("/");
      } else {
        alert("상품 업로드에 실패 했습니다.");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2> 여행 상품 업로드</h2>
      </div>

      <form onSubmit={handleSubmitUploadForm}>
        {/* DropZone */}
        <FileUpload updateImages={updateImages} />

        <br />
        <br />
        <label>이름</label>
        <input onChange={handleChangeTitle} value={title} />
        <br />
        <br />
        <label>설명</label>
        <textarea onChange={handleChangeDescription} value={description} />
        <br />
        <br />
        <label>가격($)</label>
        <input onChange={handleChangePrice} value={price} />
        <br />
        <br />
        <select onChange={handleChangeContinents} value={continents}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {" "}
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default UploadProductPage;
