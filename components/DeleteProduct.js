import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const ButtonStyled = styled.button`
    cursor: pointer;
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteProduct))
}

function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
    update,
  });
  return (
    <ButtonStyled
    disabled={loading}
      type="button"
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          // delete item
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </ButtonStyled>
  );
}

export default DeleteProduct;
