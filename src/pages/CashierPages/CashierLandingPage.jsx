import {
  Button,
  ButtonGroup,
  Card,
  Col,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Header } from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import { api } from "../../API/api";
import { SearchboxBootstrap } from "../../components/SearchboxBootstrap";
import { ProductCardCashier } from "../../components/ProductCard";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import "../Adminpages/style.css";
import { SVGtrash } from "../../components/SVG/SVGtrash";
import { SVGup } from "../../components/SVG/SVGup";
import { SVGdown } from "../../components/SVG/SVGdown";
import { SVGx } from "../../components/SVG/SVGx";
import { ModalConfirmationPayResetDeleteTransaction } from "../../components/ModalConfirmationPayResetDeleteTransaction";

export const CashierLandingPage = ({ search }) => {
  const toast = useToast();
  const [button, setButton] = useState(true);
  const [products, setProducts] = useState([]);
  const [showTransaction, setShowTransaction] = useState(0); // untuk show transaction
  const [showModal, setShowModal] = useState("");
  const [newTransaction, setNewTransaction] = useState(false);
  const [outstandingTransaction, setOutstandingTransaction] = useState([]);
  const [anyTransaction, setAnyTransaction] = useState({});
  const [totalOutstandingTransaction, setTotalOutstandingTransaction] =
    useState(0);
  const userSelector = useSelector((state) => state.auth);
  const fetchOutstandingTransaction = async () => {
    try {
      const { data } = await api.get("/transactions/outstanding", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("cs-token"),
          "api-key": userSelector?.username,
        },
      });
      setOutstandingTransaction(data.rows);
      setTotalOutstandingTransaction(data.count);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAnyTransaction = async (transactionId) => {
    try {
      if (transactionId) {
        const { data } = await api.get("/transactions/" + transactionId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("cs-token"),
            "api-key": userSelector?.username,
          },
        });
        setAnyTransaction(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const createNewTransaction = async (order_type) => {
    await api
      .post(
        "/transactions/",
        {
          order_type,
          staff: userSelector?.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("cs-token"),
            "api-key": userSelector?.username,
          },
        }
      )
      .catch((err) => console.log(err));
    fetchOutstandingTransaction();
    setNewTransaction(!newTransaction);
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await api.delete("/transactions/" + transactionId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("cs-token"),
          "api-key": userSelector?.username,
        },
      });
      fetchOutstandingTransaction();
    } catch (err) {
      console.log(err);
      if (typeof err?.response?.data === "string")
        toast({
          title: err?.response?.data,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      if (typeof err?.response?.data === "object") {
        toast({
          title: err?.response?.data[0],
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  useEffect(() => {
    fetchAnyTransaction(showTransaction);
  }, [showTransaction]);

  useEffect(() => {
    fetchOutstandingTransaction();
  }, [userSelector]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleReset = () => {
    const temp = { ...anyTransaction };
    temp?.Transaction_details?.forEach((val) => {
      val.qty = 0;
    });
    setAnyTransaction(temp);
  };
  const handleSave = async () => {
    try {
      setButton(false);
      const { data } = await api.post(
        `/transaction_details/insert_multi_value`,
        anyTransaction?.Transaction_details,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("cs-token"),
            "api-key": userSelector?.username,
          },
        }
      );
      await fetchAnyTransaction(showTransaction);
      toast({
        title: "Successfully update this transaction",
        position: "top",
        duration: 2500,
        isClosable: true,
        status: "success",
      });
      setButton(true);
    } catch (err) {
      toast({
        title: "Error",
        position: "top",
        description:
          typeof err?.response?.data === "string"
            ? err?.response?.data
            : err?.response?.data.errors[0],
        duration: 2500,
        isClosable: true,
        status: "error",
      });
      setButton(true);
    }
  };

  const handlePay = async () => {
    handleSave();
    console.log(anyTransaction);
    anyTransaction.isPaid = true;
    anyTransaction.total =
      (11 / 100) *
        anyTransaction?.Transaction_details?.reduce(
          (acc, val) => acc + val.price * val.qty,
          0
        ) +
      anyTransaction?.Transaction_details?.reduce(
        (acc, val) => acc + val.price * val.qty,
        0
      );
    try {
      await api
        .patch(`/transactions/` + anyTransaction.id, anyTransaction, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("cs-token"),
            "api-key": userSelector?.username,
          },
        })
        .then(
          toast({
            status: "success",
            title: "This transaction is complete",
            position: "top",
            duration: 2500,
            isClosable: true,
          })
        );
      fetchOutstandingTransaction();
      setShowTransaction(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <Row className="m-0">
        <Col className="xs-no-p-m">
          {/* <Container> */}
          <Row className="m-0">
            <SearchboxBootstrap />
          </Row>
          <Row className="m-0">
            <div>Category</div>
          </Row>
          <Row className="m-0">
            {products.length &&
              products.map((item, index) => {
                return (
                  <ProductCardCashier
                    products={products}
                    setProducts={setProducts}
                    currentTransaction={{ ...anyTransaction }}
                    setAnyTransaction={setAnyTransaction}
                    item={item}
                    index={index}
                    showTransaction={showTransaction}
                  />
                );
              })}
          </Row>
          {/* </Container> */}
        </Col>
        {showTransaction ? (
          <Col lg={4} xs={6} className="col">
            {/* <Container> */}
            <Button
              className="mb-2 d-xxs-smallfont"
              variant="info"
              onClick={() => {
                setShowTransaction(0);
                setAnyTransaction({});
              }}
            >
              Back to Transaction List
            </Button>
            <Card>
              <Card.Header
                className={
                  "" + anyTransaction?.Transaction_order_type?.order_type ===
                  "Dine In"
                    ? "d-flex flex-wrap bg-info"
                    : anyTransaction?.Transaction_order_type?.order_type ===
                      "Take Away"
                    ? "d-flex flex-wrap bg-success"
                    : anyTransaction?.Transaction_order_type?.order_type ===
                      "Catering"
                    ? "d-flex flex-wrap bg-warning"
                    : "d-flex flex-wrap"
                }
              >
                <span className="border border-secondary rounded px-1">
                  Order No. {anyTransaction?.id}
                </span>
                <span className="border border-secondary rounded px-1">
                  {anyTransaction?.Transaction_order_type?.order_type}
                </span>
                <span className="border border-secondary rounded px-1">
                  Table/Name{anyTransaction?.name}
                </span>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div>Current item(s):</div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="td-cashier-page">Item</th>
                        <th className="td-cashier-page">Qty</th>
                        <th className="td-cashier-page">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {anyTransaction?.Transaction_details?.map(
                        (val, index) => (
                          <TableTransaction
                            product={val}
                            index={index}
                            currentTransaction={{ ...anyTransaction }}
                            setAnyTransaction={setAnyTransaction}
                            handleSave={handleSave}
                          />
                        )
                      )}
                    </tbody>
                  </Table>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex w-100 justify-content-between">
                    <b className="td-cashier-page">Tax: </b>
                    <span className="td-cashier-page">
                      <b>
                        IDR
                        {(
                          (11 / 100) *
                          anyTransaction?.Transaction_details?.reduce(
                            (acc, val) => acc + val.price * val.qty,
                            0
                          )
                        ).toLocaleString(`id-ID`)}
                      </b>
                    </span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex w-100 justify-content-between">
                    <b className="td-cashier-page">Grand total: </b>
                    <span className="td-cashier-page">
                      <b>
                        IDR
                        {(
                          (11 / 100) *
                            anyTransaction?.Transaction_details?.reduce(
                              (acc, val) => acc + val.price * val.qty,
                              0
                            ) +
                          anyTransaction?.Transaction_details?.reduce(
                            (acc, val) => acc + val.price * val.qty,
                            0
                          )
                        ).toLocaleString(`id-ID`)}
                      </b>
                    </span>
                  </div>
                </ListGroup.Item>
                <ModalConfirmationPayResetDeleteTransaction
                  action={handleReset}
                  setShow={setShowModal}
                  show={showModal}
                  handleDeleteTransaction={handleDeleteTransaction}
                  handlePay={handlePay}
                />
                <ListGroup.Item>
                  <ButtonGroup className="w-100">
                    <Button
                      variant="info"
                      onClick={() => setShowModal("RESET TRANSACTION")}
                      className="d-xxs-smallfont"
                    >
                      Reset
                    </Button>
                    <Button
                      variant="info"
                      onClick={
                        button
                          ? handleSave
                          : () =>
                              toast({
                                title: "Your request is one process",
                                position: "top",
                                status: "warning",
                                isClosable: true,
                                duration: 2000,
                              })
                      }
                      className="d-xxs-smallfont"
                    >
                      Save
                    </Button>
                    <Button
                      variant="info"
                      className="d-xxs-smallfont"
                      onClick={() => setShowModal("PAY")}
                    >
                      Pay
                    </Button>
                  </ButtonGroup>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            {/* </Container> */}
          </Col>
        ) : (
          <Col xl={2} lg={3} xs={4} className="col">
            <Button
              variant="info"
              className="position-relative w-100"
              onClick={() => setNewTransaction(!newTransaction)}
            >
              New Transaction
            </Button>
            {newTransaction ? (
              <div className="d-flex flex-column gap-2 my-2">
                <Button variant="info" onClick={() => createNewTransaction(1)}>
                  Dine In
                </Button>
                <Button
                  variant="success"
                  onClick={() => createNewTransaction(2)}
                >
                  Take Away
                </Button>
                <Button
                  variant="warning"
                  onClick={() => createNewTransaction(3)}
                >
                  Cathering
                </Button>
              </div>
            ) : null}
            <ListGroup variant="flush" className="mt-2 text-center">
              <span>
                Outstanding Transaction: <b>{totalOutstandingTransaction}</b>
              </span>
              <ListGroup.Item key={`group-item`}>
                {outstandingTransaction.length &&
                  outstandingTransaction.map((val, index) => (
                    <div key={`transaction-${index}`} className="d-flex">
                      <span
                        className="d-flex align-items-center justify-content-center"
                        type="button"
                        onClick={() => {
                          setShowModal(val.id);
                        }}
                      >
                        <SVGtrash />
                      </span>
                      <ModalConfirmationPayResetDeleteTransaction
                        setShow={setShowModal}
                        show={showModal}
                        handleDeleteTransaction={handleDeleteTransaction}
                      />
                      <div
                        className={`d-flex px-2 text-center rounded-pill gap-1 w-100 ${
                          val.order_type === 1
                            ? "bg-info"
                            : val.order_type === 2
                            ? "bg-success"
                            : val.order_type === 3
                            ? "bg-warning"
                            : null
                        }`}
                        type="button"
                        onClick={() => {
                          if (!localStorage.getItem("cs-token"))
                            return toast({
                              status: "warning",
                              title: "Login first",
                              isClosable: true,
                              duration: 2000,
                              position: "top",
                              description: (
                                <a href="/login">Sign in Click Here!</a>
                              ),
                            });
                          setShowTransaction(val.id);
                        }}
                      >
                        <span>Order</span>
                        <span>{val.id}</span>
                        <span>{val.name}</span>
                      </div>
                    </div>
                  ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        )}
      </Row>
    </div>
  );
};

const TableTransaction = ({
  product,
  index,
  currentTransaction,
  setAnyTransaction,
}) => {
  const [showModal, setShowModal] = useState("");
  const [quantity, setQuantity] = useState(
    currentTransaction.Transaction_details[index].qty
  );
  const stock = useRef(product?.Product?.stock);
  const ref = useRef();

  const handleDeleteTransactionDetail = () => {
    currentTransaction.Transaction_details[index].qty = 0;
    setAnyTransaction(currentTransaction);
  };

  const handleAddQuantity = () => {
    if (stock.current === 0) return;
    ref.current = quantity;
    ref.current += 1;
    stock.current -= 1;
    setQuantity(ref.current);
  };
  const handleSubtractQuantity = () => {
    if (quantity === 0) return;
    ref.current = quantity;
    ref.current -= 1;
    stock.current += 1;
    setQuantity(ref.current);
  };

  useEffect(() => {
    setQuantity(currentTransaction.Transaction_details[index].qty);
  }, [currentTransaction.Transaction_details[index].qty]);

  useEffect(() => {
    currentTransaction.Transaction_details[index].qty = quantity;
    setAnyTransaction(currentTransaction);
  }, [quantity]);
  return product?.qty ? (
    <tr key={`transactionItem-` + product.id}>
      <td className="td-cashier-page max-702 position-relative align-middle w-50">
        <div className="position-relative d-flex align-items-center">
          <span
            type="button"
            className="float-start text-danger"
            style={{ right: "0" }}
            onClick={() => setShowModal("DELETE TRANSACTION")}
          >
            <SVGx />
          </span>
          <span
            className="w-100 d-flex align-items-center"
            style={{
              wordBreak: "break-word",
            }}
          >
            {product?.Product?.productName}
          </span>
        </div>
      </td>
      <td className="td-cashier-page position-relative text-center align-middle">
        <span
          className="d-flex w-100 justify-content-center"
          type="button"
          onClick={handleAddQuantity}
        >
          <SVGup />
        </span>
        <span>{quantity}</span>
        <span
          className="d-flex w-100 justify-content-center"
          type="button"
          onClick={handleSubtractQuantity}
        >
          <SVGdown />
        </span>
      </td>
      <td className="td-cashier-page align-middle text-center">
        <div>{(product?.price).toLocaleString("id-ID")}</div>
      </td>
      <ModalConfirmationPayResetDeleteTransaction
        action={handleDeleteTransactionDetail}
        show={showModal}
        setShow={setShowModal}
      />
    </tr>
  ) : null;
};