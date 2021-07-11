import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "lib/useForm";
import Router from "next/router";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";
import Form from "./styles/Form";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? and types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: "",
    name: "Nice Shoes",
    price: 4123,
    description: "These are the best shoes!",
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
    }
  );
  async function handleSubmit(e) {
    e.preventDefault();
    // Submit the inoutfield to the backend
    console.log(inputs)
    const res = await createProduct();
    clearForm();
    console.log(res)
    Router.push({
        pathname: `/product/${res.data.createProduct.id}`
    })
}

  return (
    <Form
    onSubmit={handleSubmit} 
    >
    <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading} >
        <label htmlFor="image">
          Image
          <input type="file" name="image" id="image" onChange={handleChange} />
        </label>
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
        <button type="submit">
          + Add Product
        </button>
      </fieldset>
    </Form>
  );
}
