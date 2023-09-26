import { useDisclosure } from "@chakra-ui/react";
import { ModalInputCategory } from "./categorym";
import { Table } from "react-bootstrap";
import "../pages/Adminpages/style.css";

export const CategoryCard = ({ category, fetchCategories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <h2 style={{ marginBottom: "8px" }} onClick={onOpen} type="button">
        {category.category_name}
      </h2>
      <ModalInputCategory
        isOpen={isOpen}
        onClose={onClose}
        fetchCategories={fetchCategories}
        id={category.id}
      />
    </>
  );
};

export const CategoryList = ({ categories = [], fetchCategories }) => {
  return (
    <Table
      striped
      bordered
      hover
      style={{ maxWidth: "300px", marginTop: "24px" }}
    >
      <thead>
        <tr>
          <th className="text-center align-middle">No.</th>
          <th className="text-center align-middle">Category</th>
          <th className="text-center align-middle">Total Products</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((category, idx) => (
          <tr key={idx}>
            <td style={{ width: "4px" }}>{idx + 1}</td>
            <td>
              <CategoryCard
                category={category}
                fetchCategories={fetchCategories}
              />
            </td>
            <td className="text-right">{category?.Products?.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
