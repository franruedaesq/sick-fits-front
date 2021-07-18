import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./User";

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;

  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const DECREES_CART_ITEM = gql`
  mutation DECREES_CART_ITEM($id: ID!) {
    removeFromCart(productId: $id) {
      id
    }
  }
`;

function RemoveFromCart({ id, quantity }) {

  const [decreesCartItem, { loading }] = useMutation(
    DECREES_CART_ITEM,
    {
      variables: { id },
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    }
  );

  return (
    <BigButton
      type="button"
      onClick={decreesCartItem}
      disabled={loading}
      title="remove this item from cart"
    >
      &times;
    </BigButton>
  );
}

export default RemoveFromCart;
