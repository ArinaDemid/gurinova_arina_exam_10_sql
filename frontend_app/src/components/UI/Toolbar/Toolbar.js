import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand } from "reactstrap";

const Toolbar = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={RouterNavLink} to="/">
        News
      </NavbarBrand>
      <Nav className="ml-auto" navbar></Nav>
    </Navbar>
  );
};

export default Toolbar;
