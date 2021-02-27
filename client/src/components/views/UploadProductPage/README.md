# Upload Product Page

상품을 업로드 하는 페이지

- UploadProductPage.js
  - FileUpload.js

---

## 주요 기능

### 1. image upload

- react-dropzone 이용.

```
npm install --save react-dropzone

yarn add react-dropzone
```

- 과정

#### 0. 기본 구성

```
{/* FileUpload.js */}
<div>
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
        <button type="plus">
          upload
        </button>
      </div>
    )}
  </Dropzone>

  {/* 업로드한 이미지 보여주는 곳 */}
  <div>
    {Images.map((image, index) => (
      <div onClick={() => deleteHandler(image)} key={index}>
        <img
          style={{ minWidth: "300px", width: "300px", height: "240px" }}
          src={`http://localhost:5000/${image}`}
        />
      </div>
    ))}
  </div>
</div>;
```

---

#### 1. image의 filePath를 저장하는 배열

- 부모 컴포넌트의 images를 업데이트하는데 이용한다.
- 업로드한 이미지를 보여주는 부분에서도 사용한다.

```
const [Images, setImages] = useState([]);
```

---

#### 2. image upload

- 반드시 formData를 전달해주어야 한다.
- post에 성공하면, setImages를 통해 업데이트해준다.

```
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
```

---

#### 3. show selected images

```
{
  Images.map((image, index) => (
    <div onClick={() => deleteHandler(image)} key={index}>
      <img src={`http://localhost:5000/${image}`}/>
    </div>
  ));
}
```

---

#### 4. delete selected image

```
const deleteHandler = (image) => {
  const currentIndex = Images.indexOf(image);
  let newImages = [...Images];
  newImages.splice(currentIndex, 1);
  setImages(newImages);
  props.refreshFunction(newImages);
};
```

---

### 2. 그 외

상품 정보들을 입력받아 함께 post.
