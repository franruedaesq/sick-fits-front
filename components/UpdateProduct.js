import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  const [updateProduct, mutationResponse] = useMutation(
    UPDATE_PRODUCT_MUTATION
  );

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(id)
    const resp = await updateProduct({
        variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
        }
    }).catch(console.error) ;
    console.log(resp);
    // TODO: HANDLE SUBMIT
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error || mutationResponse.error} />
      <fieldset
        disabled={mutationResponse.loading}
        aria-busy={(mutationResponse, loading)}
      >
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="number"
            name="description"
            id="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}

export default UpdateProduct;
