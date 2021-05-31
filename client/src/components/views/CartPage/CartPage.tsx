import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Empty, Result } from "antd";
import Paypal from "../../../utils/Paypal";
import { CartDetail, Payload, UserState } from "_reducers/user_reducer";

function CartPage() {
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  const getAllCartItems = async () => {
    let cartItems: string[] = [];
    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        const result = await dispatch(
          getCartItems(cartItems, user.userData.cart)
        ).payload;
        calculateTotal(result);
      }
    }
  };

  useEffect(() => {
    getAllCartItems();
  }, [user.userData]);

  const calculateTotal = (cartDetail: CartDetail[]) => {
    let total = 0;

    cartDetail?.map((item) => {
      total += item.price * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  const removeFromCart = async (productId: string) => {
    const result = await removeCartItem(productId);
    dispatch(result);
    const productInfo = (result.payload as Payload).productInfo;
    console.log(productInfo);
    if (productInfo!.length <= 0) {
      setShowTotal(false);
    }
  };

  const transactionSuccess = async (data: string) => {
    const result = await dispatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: user.cartDetail,
      })
    ).payload;
    if (result.success) {
      setShowTotal(false);
      setShowSuccess(true);
    }
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>

      <div>
        <UserCardBlock
          products={user.cartDetail!}
          removeItem={removeFromCart}
        />
      </div>

      {ShowTotal ? (
        <div style={{ marginTop: "3rem" }}>
          <h2>Total Amount: ${Total}</h2>
        </div>
      ) : ShowSuccess ? (
        <Result status="success" title="Successfully Purchased Items" />
      ) : (
        <>
          <br />
          <Empty description={false} />
        </>
      )}

      {/* {ShowTotal && <Paypal total={Total} onSuccess={transactionSuccess} />} */}
    </div>
  );
}

export default CartPage;
