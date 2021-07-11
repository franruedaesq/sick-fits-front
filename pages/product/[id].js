import SingleProduct from "components/SingleProduct";

function SingleProductPage({ query: { id } }) {
  return <SingleProduct id={id} />
}

export default SingleProductPage;
