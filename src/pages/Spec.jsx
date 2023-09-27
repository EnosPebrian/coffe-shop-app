import { Button, Container, Table } from "react-bootstrap";
import { Header } from "../components/Header";
import SpecImage from "../assets/miniproject 3.png";
import "../pages/Adminpages/style.css";

const dataUser = [
  {
    id: 1,
    role: 1,
    username: "admin",
    email: null,
    password: "1adminCoffeeShop@",
    phone: null,
    fullname: "admin",
    image_url: null,
    gender: "male",
    isActive: 1,
    createdAt: "2023-09-12 11:45:08",
    updatedAt: "2023-09-12 20:44:43",
  },
  {
    id: 15,
    role: 2,
    username: "CSH-Bante",
    email: null,
    password: "CSH-Bante",
    phone: null,
    fullname: "Bante",
    image_url: null,
    gender: "male",
    isActive: 0,
    createdAt: "2023-09-12 17:59:40",
    updatedAt: "2023-09-13 11:18:13",
  },
  {
    id: 17,
    role: 2,
    username: "CSH-Gaje",
    email: null,
    password: "CSH-Bante",
    phone: null,
    fullname: "Gaje",
    image_url: null,
    gender: "male",
    isActive: 1,
    createdAt: "2023-09-12 18:02:46",
    updatedAt: "2023-09-13 14:09:33",
  },
  {
    id: 18,
    role: 2,
    username: "CSH-Coco",
    email: null,
    password: "CSH-Coco",
    phone: null,
    fullname: "Coco",
    image_url: null,
    gender: "male",
    isActive: 1,
    createdAt: "2023-09-12 18:03:49",
    updatedAt: "2023-09-12 18:03:49",
  },
];

export const Spec = () => {
  return (
    <>
      <Header />
      <Container style={{ minHeight: "94vh" }}>
        <div className="d-flex flex-column align-items-center justify-content-center gap-4 text-center">
          <h1 style={{ fontSize: "24px" }}>The Coffee Space App</h1>
          <h2 style={{ fontSize: "20px" }}>Application spesification</h2>
          <img src={SpecImage} />
          <h2 style={{ fontSize: "20px" }}>Trial Login</h2>
          <p>You can try to use the app using account below</p>
          <Button className="bg-[#D3A774]" variant="warning">
            <a href="/login">Sign in</a>
          </Button>
          <Table hover bordered>
            <thead>
              <tr>
                <th className="td-cashier-page">No</th>
                <th className="td-cashier-page">Username</th>
                <th className="td-cashier-page">Password</th>
                <th className="td-cashier-page">Status Account</th>
                <th className="td-cashier-page">Role</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.map((user, index) => (
                <tr key={`user` + index}>
                  <td className="td-cashier-page">{index + 1}</td>
                  <td className="td-cashier-page">{user.username}</td>
                  <td className="td-cashier-page">{user.password}</td>
                  <td
                    className={
                      user.isActive
                        ? "td-cashier-page"
                        : "bg-danger-subtle td-cashier-page"
                    }
                  >
                    {user.isActive ? "Active" : "Disabled"}
                  </td>
                  <td
                    className={
                      user.role === 1
                        ? "bg-warning-subtle td-cashier-page"
                        : "td-cashier-page"
                    }
                  >
                    {user.role === 1 ? "admin" : "cashier"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
