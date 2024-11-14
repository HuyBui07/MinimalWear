import { useState, useEffect } from "react";

// Components
import SortingBar from "../components/layouts/SortingBar";
import Product from "../components/Product";
import product from "../assets/product-demo.png";

function LowerWear() {
  const [products, setProducts] = useState([
    {
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
  ]);

  return (
    <div className="flex flex-col max-w-screen-xl mt-10 space-y-7">
      <SortingBar />
      <div className="grid grid-cols-4 w-full gap-x-20">
        {products.map((product, index) => (
          <Product
            key={index}
            image={product.image}
            productName={product.productName}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LowerWear;
