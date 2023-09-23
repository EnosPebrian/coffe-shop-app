import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { SVGLogOut } from "./SVG/SVGLogOut";
import { userLogout } from "../redux/middlewares/auth-middleware";
import "../pages/Adminpages/style.css";

export const Header = () => {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = async () => {
    await dispatch(userLogout());
    window.location.reload();
  };
  return (
    <Navbar
      expand="lg"
      style={{ minHeight: "5vh" }}
      className="bg-[#D3A774] py-0"
    >
      <Navbar.Brand
        href="/TheCoffeeSpace"
        className="font-sans font-bold px-10"
      >
        Coffee Space <span className="pl-3"></span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="text-right">
        <Nav className="me-auto">
          <Nav.Link
            href={
              userSelector?.id === 1
                ? "/account_management"
                : userSelector?.id === 2
                ? "/TheCoffeeSpace"
                : null
            }
            className="font-sans font-bold text-black mr-3"
          >
            Home
          </Nav.Link>
          {userSelector.id === 1 ? (
            <NavDropdown
              className="font-sans font-bold text-black mr-3 z-100"
              title="Actions"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="/account_management"
                className="d-xxs-smallfont"
              >
                Cashier Account Management
              </NavDropdown.Item>
              <NavDropdown.Item href="/products" className="d-xxs-smallfont">
                Products
              </NavDropdown.Item>
              <NavDropdown.Item href="/categories" className="d-xxs-smallfont">
                Categories
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/dailysales/any"
                className="d-xxs-smallfont"
              >
                Daily Sales
              </NavDropdown.Item>

              <NavDropdown.Item href="/report" className="d-xxs-smallfont">
                Report
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/TheCoffeeSpace"
                className="d-xxs-smallfont"
              >
                CashierPage
              </NavDropdown.Item>
            </NavDropdown>
          ) : null}
        </Nav>
        <div
          onClick={logout}
          type="button"
          className="w-100 d-flex justify-content-end"
          style={{ marginRight: "8px" }}
        >
          <SVGLogOut />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};
