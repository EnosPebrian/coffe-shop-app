import { Card, Col, Row } from "react-bootstrap";
import { SVGdone } from "../../components/SVG/SVGdone";
import { SVGnotDone } from "../../components/SVG/SVGnotdone";
import "../Adminpages/style.css";

export const CardTransaction = ({
  transaction,
  index,
  setShow,
  setTransactionData,
}) => {
  return (
    <Col sm={6} xs={12} key={`transaction-` + transaction.id}>
      <Card
        onClick={() => {
          setShow(true);
          setTransactionData(transaction);
        }}
        type="button"
      >
        <Card.Header
          className={
            transaction?.order_type === 1
              ? "bg-warning-subtle"
              : transaction?.order_type === 2
              ? "bg-danger-subtle"
              : transaction?.order_type === 3
              ? "bg-warning"
              : null
          }
        >
          <Row className="m-0 justify-content-between gap-1">
            <Col style={{ fontSize: "calc(10px + 0.3vw)" }} className="p-0">
              TransactionID-{transaction.id}
            </Col>
            <Col style={{ fontSize: "calc(10px + 0.3vw)" }} className="p-0">
              {transaction?.Transaction_order_type?.order_type}
            </Col>
            <Col style={{ fontSize: "calc(10px + 0.3vw)" }} className="p-0">
              {transaction.createdAt.split("T").join(" ").slice(0, 19)}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <Row className="m-0">
              <Col lg={6} xs={6} style={{ fontSize: "calc(10px + 0.3vw)" }}>
                Total: IDR{Number(transaction?.total).toLocaleString(`id-ID`)}
              </Col>
              <Col lg={6} xs={6} style={{ fontSize: "calc(10px + 0.3vw)" }}>
                Total Item: {transaction?.Transaction_details?.length}
              </Col>
              <Col lg={6} xs={6} style={{ fontSize: "calc(10px + 0.3vw)" }}>
                Staff: {transaction?.User?.username}
              </Col>
              <Col
                lg={6}
                xs={6}
                style={{ fontSize: "calc(10px + 0.3vw)" }}
                className="d-flex align-items-center gap-1"
              >
                Status: {transaction?.isPaid ? <SVGdone /> : <SVGnotDone />}
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
