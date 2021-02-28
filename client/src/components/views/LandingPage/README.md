# Landing Page

업로드한 상품들을 볼 수 있는 메인 화면.  
조건에 맞는 상품을 확인할 수 있다.

- LandingPage.js
- Sections
  - Datas.js
  - CheckBox.js
  - RadioBox.js
  - SearchFeature.js

---

## 주요 기능

### 1. products filter

checkbox, radiobox와 search로 조건에 맞는 상품만 불러온다.

- 과정

#### 0. 기본 구성

```
{/* CheckBox */}
<Checkbox
  list={continents}
  handleFilters={(filters) => handleFilters(filters, "continents")}
/>

{/* RadioBox */}
<Radiobox
  list={price}
  handleFilters={(filters) => handleFilters(filters, "price")}
/>

{/* Search */}
<SearchFeature refreshFunction={updateSearchTerm} />

{
  PostSize >= Limit && (
    <button onClick={loadMoreHanlder}>더보기</button>
  );
}

{/* Datas.js: filter의 옵션들을 담은 배열 */}
const continents = [
  {
    _id: 1,
    name: "Africa",
  },
  {
    _id: 2,
    name: "Europe",
  },
  ...
]

const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $199",
    array: [0, 199],
  },
  ...
]
```

---

#### 1. 필요한 state.

- 상품을 담는 배열 products : 배열 안에 담긴 상품들이 화면에 보인다.

```
const [Products, setProducts] = useState([]);
```

- 불러올 상품의 수를 정해주는 skip, limit : skip번째 상품부터 limit개를 불러온다.

```
const [Skip, setSkip] = useState(0);
const [Limit, setLimit] = useState(8);
```

- 불러온 상품의 갯수 postSize : postSize가 limit보다 작으면 불러올 수 있는 상품이 더이상 없음을 의미한다.

```
const [PostSize, setPostSize] = useState(0);
```

- 불러올 상품의 옵션을 담은 객체 filter : post할 때 함께 보낸다.

```
const [Filters, setFilters] = useState({
  continents: [],
  price: [],
});
```

- 검색한 문자열을 담는 searchTerm

```
const [SearchTerm, setSearchTerm] = useState("");
```

---

#### 2. CheckBox

- 체크된 옵션의 index를 담은 배열 checked

```
const [Checked, setChecked] = useState([]);
```

- 체크될 때 마다 checked와 부모 컴포넌트의 filters를 업데이트한다.

```
const handleToggle = (value) => {
  const currentIndex = Checked.indexOf(value);
  const newChecked = [...Checked];

  // 배열 안에 없으면 추가
  if (currentIndex === -1) {
    newChecked.push(value);
  }
  // 배열 안에 있으면 삭제
  else {
    newChecked.splice(currentIndex, 1);
  }
  setChecked(newChecked);
  props.handleFilters(newChecked);
};
```

---

#### 3. RadioBox

- 체크된 옵션의 id를 담는 value : 한가지 옵션만 선택될 수 있다.

```
const [Value, setValue] = useState(0);
```

- 체크될 때 마다 value와 부모 컴포넌트의 filters를 업데이트한다.

```
const handleChange = (event) => {
  setValue(event.target.value);
  props.handleFilters(event.target.value);
};
```

---

#### 4. Search

- 입력한 문자열을 부모 컴포넌트의 searchTerm에 전달한다.

```
const searchHandler = (event) => {
  props.refreshFunction(event.currentTarget.value);
};
```

---

#### 5. products를 불러오는 function

- mount 직후 모든 products를 불러온다.

```
useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
}, []);
```

- 조건(body)에 맞는 products를 불러온다.

```
const getProducts = (body) => {
  axios.post("/api/product/products", body).then((response) => {
    if (response.data.success) {
      if (body.loadMore) {
        setProducts([...Products, ...response.data.productInfo]);
      } else {
        setProducts(response.data.productInfo);
      }
      setPostSize(response.data.postSize);
    } else {
      alert(" 상품들을 가져오는데 실패 했습니다.");
    }
  });
};
```
