import { Row } from "react-bootstrap";
import { CardTransaction } from "../pages/Adminpages/CardTransaction";
import { useState } from "react";
import { ModalShowTransaction } from "../pages/Adminpages/ModalShowTransaction";

export const DailySalesList = ({
  transactions = [],
  handleInputForQueryString,
}) => {
  const [transactionData, setTransactionData] = useState({});
  const [show, setShow] = useState(false);

  return (
    <>
      <form className="d-flex gap-2 mb-2">
        <label>Date from: </label>
        <input
          type="date"
          id="datefrom"
          onChange={handleInputForQueryString}
          className="border px-2 rounded border-secondary"
          style={{ fontSize: "calc(8px + 0.5vw)" }}
        />
        <label>Date to: </label>
        <input
          type="date"
          id="dateto"
          onChange={handleInputForQueryString}
          className="border px-2 rounded border-secondary"
          style={{ fontSize: "calc(8px + 0.5vw)" }}
        />
      </form>
      <ModalShowTransaction
        transactionData={transactionData}
        show={show}
        setShow={setShow}
      />
      <Row className="m-0 p-0 row-gap-2 flex-wrap">
        {transactions.length &&
          transactions.map((transaction, idx) => (
            <CardTransaction
              transaction={transaction}
              index={idx}
              setShow={setShow}
              setTransactionData={setTransactionData}
            />
          ))}
      </Row>
    </>
  );
};

{
  /* <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction</th>
              <th>Order Type</th>
              <th>Staff</th>
              <th>Total</th>
              <th className="d-none d-sm-table-cell">Details</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction) => (
              <tr>
                <td>{transaction.createdAt.slice(0, 10)}</td>
                <td>{transaction.id}</td>
                <td>{transaction.Transaction_order_type.order_type}</td>
                <td>{transaction.User.username}</td>
                <td>{transaction.total}</td>
                <td className="d-none d-sm-table-cell">
                  <Table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Tax</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transaction.Transaction_details.map((detail) => (
                        <tr>
                          <td>{detail.Product.productName}</td>
                          <td>{detail.qty}</td>
                          <td>{detail.price}</td>
                          <td>11%</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </td>
              </tr>
            ))}
          </tbody>
        </Table> */
}
