import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCart";
import { Empty, Result } from "antd";
import Paypal from "../../../utils/Paypal";
import { CartDetail, Payload, UserState } from "_reducers/user_reducer";

function CartPage() {
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    getAllCartItems();
  }, [user.userData]);

  const getAllCartItems = async () => {
    if (user.userData?.cart?.length > 0) {
      const cartItems: string[] = user.userData.cart.map((item) => item.id);
      const result = await getCartItems(cartItems, user.userData.cart);
      dispatch(result);
      calculateTotal(result.payload);
    }
  };

  const calculateTotal = (cartDetail: CartDetail[]) => {
    const newTotal = cartDetail.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );

    setTotal(newTotal);
    setShowTotal(true);
  };

  const removeFromCart = async (productId: string) => {
    const result = await removeCartItem(productId);
    dispatch(result);
    const productInfo = (result.payload as Payload).productInfo;
    if (productInfo!.length <= 0) {
      setShowTotal(false);
    }
  };

  // const transactionSuccess = async (data: string) => {
  //   const result = await dispatch(
  //     onSuccessBuy({
  //       paymentData: data,
  //       cartDetail: user.cartDetail,
  //     })
  //   ).payload;
  //   if (result.success) {
  //     setShowTotal(false);
  //     setShowSuccess(true);
  //   }
  // };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>

      <div>
        <UserCardBlock products={user.cartDetail} removeItem={removeFromCart} />
      </div>

      {showTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <h2>Total Amount: ${total}</h2>
        </div>
      ) : showSuccess ? (
        <Result status="success" title="Successfully Purchased Items" />
      ) : (
        <>
          <br />
          <Empty description={false} />
        </>
      )}

      {/* {showTotal && <Paypal total={total} onSuccess={transactionSuccess} />} */}
    </div>
  );
}

export default CartPage;
