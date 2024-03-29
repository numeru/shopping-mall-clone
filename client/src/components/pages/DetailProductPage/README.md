# Detail Product Page

선택한 상품의 세부 정보를 볼 수 있는 페이지.
장바구니에 담을 수 있다.

- DetailProductPage.js
- Sections
  - ProductImage.js
  - ProductInfo.js

---

## 주요 기능

### 1. image slide

#### - react-image-gallery 이용.

```
npm install react-image-gallery

# SCSS
@import "~react-image-gallery/styles/scss/image-gallery.scss";

# CSS
@import "~react-image-gallery/styles/css/image-gallery.css";
```

#### - 과정

##### 0. 기본 구성

```
<ProductImage product={Product} />
<ProductInfo product={Product} />
```

---

##### 1. 보여줄 product를 담은 state

```
const [Product, setProduct] = useState({});
```

---

##### 2. product ID로 정보를 가져온다.

- product id는 match를 이용하여 url에서 가져온다.

```js
const productId = props.match.params.productId;

useEffect(() => {
  axios
    .get(`/api/product/products_by_id?id=${productId}&type=single`)
    .then((response) => {
      setProduct(response.data[0]);
    })
    .catch((err) => alert(err));
}, []);
```

---

##### 3. ImageGallery에 image들의 정보를 전달한다.

```js
useEffect(() => {
  if (props.product.images && props.product.images.length > 0) {
    let images = [];

    props.product.images.map((item) => {
      images.push({
        original: `http://localhost:5000/${item}`,
        thumbnail: `http://localhost:5000/${item}`,
      });
    });
    setImages(images);
  }
}, [props.product]);

<ImageGallery items={Images} />;
```

---

### 2. add to cart button

#### - redux에서 product id를 받아 post한다.

```js
<Button onClick={clickHandler}>Add to Cart</Button>;

const clickHandler = () => {
  dispatch(addToCart(props.product._id));
};

export function addToCart(id) {
  let body = {
    productId: id,
  };
  const request = axios
    .post(`${USER_SERVER}/addToCart`, body)
    .then((response) => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}
```

---

### 3. product info

```html
<Descriptions title="Product Info">
  <Descriptions.Item label="Price">{props.product.price}</Descriptions.Item>
  <Descriptions.Item label="Sold">{props.product.sold}</Descriptions.Item>
  <Descriptions.Item label="View">{props.product.views}</Descriptions.Item>
  <Descriptions.Item label="Description">
    {props.product.description}
  </Descriptions.Item> </Descriptions
>;
```
