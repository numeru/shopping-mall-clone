import React, { useState } from "react";
import NavMenu from "./Sections/NavMenu";
import { Drawer, Button } from "antd";
import "./Sections/Navbar.css";
import { Link } from "react-router-dom";

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
      <div className="menu__logo">
        <Link to="/" className="menu__logo-link">
          Logo
        </Link>
      </div>
      <div className="menu__container">
        <Button className="menu__button" type="primary" onClick={showDrawer}>
          Menu
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={handleClose}
          visible={visible}
        >
          <NavMenu />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
