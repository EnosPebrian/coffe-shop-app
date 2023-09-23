import { Center, useDisclosure } from "@chakra-ui/react";
import { ModalInputCategory } from "./categorym";
import { Table } from "react-bootstrap";

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
    <Center>
      <Table striped bordered hover style={{ maxWidth: "400px" }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Category</th>
            <th>Total Products</th>
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
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Center>
  );
};
