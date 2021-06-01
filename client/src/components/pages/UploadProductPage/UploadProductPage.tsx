import React, { useState } from "react";
import FileUpload from "../../../utils/file-upload";
import Axios from "axios";
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

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.currentTarget.value);
  };

  const continentChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setContinent(parseInt(event.currentTarget.value));
  };

  // refreshFunction
  const updateImages = (newImages: string[]) => {
    console.log(newImages);
    setImages(newImages);
  };

  // submit
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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

    //서버에 채운 값들을 request로 보낸다.

    const body = {
      //로그인 된 사람의 ID
      writer: user.userData._id,
      title,
      description,
      price: parseInt(price),
      images,
      continents,
    };

    Axios.post("/api/product", body).then((response) => {
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

      <form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>이름</label>
        <input onChange={titleChangeHandler} value={title} />
        <br />
        <br />
        <label>설명</label>
        <textarea onChange={descriptionChangeHandler} value={description} />
        <br />
        <br />
        <label>가격($)</label>
        <input onChange={priceChangeHandler} value={price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={continents}>
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
