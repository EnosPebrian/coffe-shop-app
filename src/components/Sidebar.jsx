import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../pages/Adminpages/style.css";
import { background } from "@chakra-ui/styled-system";

function Sidebar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="warning"
        className="d-lg-none bg-[#D3A774]"
        onClick={handleShow}
        style={{ position: "fixed", bottom: "0", zIndex: 2, left: 0 }}
      >
        Menu
      </Button>
      <div style={{ position: "sticky", top: "3vh" }}>
        <Offcanvas
          show={show}
          onHide={handleClose}
          responsive="lg"
          className="bg-[#D3A774] text-dark"
        >
          <Offcanvas.Header closeButton className="bg-[#D3A774] text-dark">
            <Offcanvas.Title className="d-xxs-smallfont">
              Administrator Sidebar
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column gap-3">
            <Offcanvas.Title className="d-xxs-smallfont mt-3">
              Links:
            </Offcanvas.Title>
            <a
              href="/account_management"
              className={
                window.location.pathname === "/account_management"
                  ? "bg-warning-subtle rounded-md p-1 font-semibold"
                  : null
              }
            >
              Cashier Account Management
            </a>
            <a
              href="/products"
              className={
                window.location.pathname === "/products"
                  ? "bg-warning-subtle rounded-md p-1 font-semibold"
                  : null
              }
            >
              Product
            </a>
            <a
              href="/categories"
              className={
                window.location.pathname === "/categories"
                  ? "bg-warning-subtle rounded-md p-1 font-semibold"
                  : null
              }
            >
              Categories
            </a>
            <a
              href="/dailysales/any"
              className={
                window.location.pathname === "/dailysales"
                  ? "bg-info-subtle"
                  : null
              }
            >
              Daily Sales
            </a>
            <a
              href="/report"
              className={
                window.location.pathname === "/report"
                  ? "bg-warning-subtle rounded-md p-1 font-semibold"
                  : null
              }
            >
              Report
            </a>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default Sidebar;
