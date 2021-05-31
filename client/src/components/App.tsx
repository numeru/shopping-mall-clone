import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import CartPage from "./views/CartPage/CartPage";
import HistoryPage from "./views/HistoryPage/HistoryPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "_actions/user_actions.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth().then((result) => {
      dispatch(result);
    });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/product/upload" component={UploadProductPage} />
          <Route
            exact
            path="/product/:productId"
            component={DetailProductPage}
          />
          <Route exact path="/user/cart" component={CartPage} />
          <Route exact path="/history" component={HistoryPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
