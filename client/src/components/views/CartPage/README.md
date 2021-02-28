# Cart Page

장바구니에 담은 상품을 보여준다.
Paypal을 통해 결제가 가능하다.

- CartPage.js
- Section
  - UserCardBlock.js

---

## 주요 기능

### 1. show and remove items

#### - 과정

##### 0. 기본 구성

```
<div>
  <UserCardBlock
    products={props.user.cartDetail}
    removeItem={removeFromCart}
  />
</div>

<h2>Total Amount: ${Total}</h2>

<Paypal total={Total} onSuccess={transactionSuccess} />}
```

---

##### 1. redux User state cart 안에 상품이 들어있는지 확인

- 상품이 있다면 담은 수를 포함한 상품 정보를 담은 redux의 cartDetail를 만든다.
- 그 후, 가격의 총합을 계산한다.

```
let cartItems = [];
if (props.user.userData.cart.length > 0) {
  props.user.userData.cart.forEach((item) => {
    cartItems.push(item.id);
  });
  dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
    (response) => {
      calculateTotal(response.payload);
    }
  );
}

// redux action
export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then((response) => {
      userCart.forEach((cartItem) => {
        response.data.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data[index].quantity = cartItem.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}

// redux reducer
case GET_CART_ITEMS:
    return { ...state, cartDetail: action.payload };
```

##### 2. UserCardBlock

- 담은 상품을 보여주는 컴포넌트
- cartDetail을 전달받는다.

```
<UserCardBlock
  products={props.user.cartDetail}
  removeItem={removeFromCart}
/>

const renderItems = () =>
  props.products &&
  props.products.map((product, index) => (
    <tr key={index}>
      <td>
        <img src={renderCartImage(product.images)}
        />
      </td>
      <td>{product.quantity} EA</td>
      <td>$ {product.price}</td>
      <td>
        <button onClick={() => props.removeItem(product._id)}>Remove</button>
      </td>
    </tr>
  ));
```

---

##### 3. remove item

```
const removeFromCart = (productId) => {
  dispatch(removeCartItem(productId)).then((response) => {
    if (response.payload.productInfo.length <= 0) {
      setShowTotal(false);
    }
  });
};
```

---

### 2. Paypal
