import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Adminpages/style.css";
import { Table } from "react-bootstrap";
import { SVGdone } from "../../components/SVG/SVGdone";
import { SVGnotDone } from "../../components/SVG/SVGnotdone";

export const ModalShowTransaction = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => props.setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Transaction-{props?.transactionData?.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Staff in Charge: {props?.transactionData?.User?.username}</h4>
        <h4>
          Date Transaction:{" "}
          {props?.transactionData?.createdAt?.split("T").join(" ").slice(0, 19)}
        </h4>
        <h4>Items:</h4>
        <Table striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {props?.transactionData?.Transaction_details ? (
              props?.transactionData?.Transaction_details.map(
                (product, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{product?.Product?.productName}</td>
                    <td>{product?.qty}</td>
                    <td className="text-end">
                      {Number(product?.price).toLocaleString(`id-ID`)}
                    </td>
                    <td className="text-end">
                      {Number(product?.qty * product?.price).toLocaleString(
                        `id-ID`
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>No item here</tr>
            )}
            <tr>
              <td colSpan={4}>Tax 11%</td>
              <td className="text-end">
                {props?.transactionData?.Transaction_details
                  ? Number(
                      (props?.transactionData?.Transaction_details.reduce(
                        (acc, val) => acc + val.price * val.qty,
                        0
                      ) *
                        11) /
                        100
                    ).toLocaleString(`id-ID`)
                  : 0}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>Grand total</td>
              <td className="text-end">
                {props?.transactionData?.Transaction_details
                  ? Number(
                      props?.transactionData?.Transaction_details.reduce(
                        (acc, val) => acc + val.price * val.qty,
                        0
                      ) +
                        (props?.transactionData?.Transaction_details.reduce(
                          (acc, val) => acc + val.price * val.qty,
                          0
                        ) *
                          11) /
                          100
                    ).toLocaleString(`id-ID`)
                  : 0}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>Status</td>
              <td className="float-right">
                {props?.transactionData?.isPaid ? <SVGdone /> : <SVGnotDone />}
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="light"
          className="bg-secondary"
          onClick={() => props.setShow(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
