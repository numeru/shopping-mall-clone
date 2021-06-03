import React from "react";
import { Menu, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, logoutUser } from "_actions/user_actions";
import { UserState } from "_reducers/user_reducer";

function NavMenu() {
  const history = useHistory();
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    logoutUser()
      .then((result) => {
        dispatch(result);
        auth().then((result) => {
          dispatch(result);
        });
        history.push("/login");
      })
      .catch(() => alert("Log Out Failed"));
  };

  if (!user.userData?.isAuth) {
    return (
      <Menu mode="inline">
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode="inline">
        <Menu.Item key="upload">
          <Link to="/product/upload">Upload</Link>
        </Menu.Item>
        <Menu.Item key="cart">
          <Badge count={user.userData?.cart?.length}>
            <Link to="/user/cart">Cart</Link>
          </Badge>
        </Menu.Item>
        <Menu.Item key="history">
          <Link to="/history">History</Link>
        </Menu.Item>
        <Menu.Item key="logout" onClick={logoutHandler}>
          Logout
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavMenu;
