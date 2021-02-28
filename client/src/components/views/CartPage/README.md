# Cart Page

장바구니에 담은 상품을 보여준다.
Paypal을 통해 결제가 가능하다.

- CartPage.js
- Section
  - UserCardBlock.js
- Paypal.js

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

##### 1. redux의 cart 안에 상품이 들어있는지 확인

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

---

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

#### - paypal button

```
npm install react-paypal-express-checkout

yarn add react-paypal-express-checkout
```

#### - account와 app 만들기

[Account 생성](https://developer.paypal.com/developer/accounts/)

[App 생성](https://developer.paypal.com/developer/applications/)

- default가 아닌 account로 app을 생성한다.
- app을 생성한 account와 다른 account로 로그인 해야한다.

#### - 과정

##### 0. 기본구성

```
// CartPage.js
{ShowTotal && <Paypal total={Total} onSuccess={transactionSuccess} />}

// Paypal.js
const onSuccess = (payment) => {
  console.log("The payment was succeeded!", payment);
  this.props.onSuccess(payment);
  returned data
};

const onCancel = (data) => {
  ...
};

const onError = (err) => {
  ...
};

...

const client = {
  sandbox:
    "만든 app의 Client ID",
  production: "YOUR-PRODUCTION-APP-ID",
};

...

return (
  <PaypalExpressBtn
    env={env}
    client={client}
    currency={currency}
    total={total}
    onError={onError}
    onSuccess={onSuccess}
    onCancel={onCancel}
    style={{
      size: "large",
      color: "blue",
      shape: "rect",
      label: "checkout",
    }}
  />
);
```

---

##### 1. 결제 완료 후

- paymentData와 cartDetail을 post한다.
- 장바구니를 비우고 history, sold를 업데이트하는 등 후처리를 한다.

```
// user_actions.js
export function onSuccessBuy(data) {
  const request = axios
    .post(`/api/users/successBuy`, data)
    .then((response) => response.data);

  return {
    type: ON_SUCCESS_BUY,
    payload: request,
  };
}

// CartPage.js
const transactionSuccess = (data) => {
  dispatch(
    onSuccessBuy({
      paymentData: data,
      cartDetail: props.user.cartDetail,
    })
  ).then((response) => {
    if (response.payload.success) {
      setShowTotal(false);
      setShowSuccess(true);
    }
  });
};
```
