import { Button, Modal } from "react-bootstrap";

export const ModalConfirmationPayResetDeleteTransaction = ({
  show,
  setShow,
  action,
  handleDeleteTransaction,
  handlePay,
}) => {
  const handleClose = () => {
    setShow("");
  };

  return (
    <Modal show={show !== ""} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Action Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure want to{" "}
        {show === "DELETE TRANSACTION"
          ? "DELETE THIS ITEM?"
          : show === "RESET TRANSACTION"
          ? "RESET THIS TRANSACTION"
          : show === "PAY"
          ? "SETTLE THIS TRANSACTION"
          : "DELETE THIS TRANSACTION"}
        ?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            show === "RESET TRANSACTION" || show === "DELETE TRANSACTION"
              ? action()
              : show === "PAY"
              ? handlePay()
              : handleDeleteTransaction(show);
            handleClose();
          }}
        >
          YES
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
