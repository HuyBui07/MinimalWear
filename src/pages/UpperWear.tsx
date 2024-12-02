import { useState, useEffect } from "react";

// Components
import SortingBar from "../components/layouts/SortingBar";
import Product from "../components/Product";
import product from "../assets/product-demo.png";

function UpperWear() {
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
    <div className="flex flex-col w-full mt-10 space-y-7 px-28 mb-10">
      <SortingBar />
      <div className="grid grid-cols-4 w-full justify-items-center gap-x-20 gap-y-10">
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

export default UpperWear;
