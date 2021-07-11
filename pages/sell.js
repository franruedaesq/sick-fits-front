import CreateProduct from "components/CreateProduct";
import { Head } from "next/document";

export default function Sell() {
  return (
    <div>
      <Head>
        <title>Sick Fits | Sell </title>
      </Head>
      <CreateProduct />
    </div>
  );
}
