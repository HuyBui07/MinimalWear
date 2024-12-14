import { useState, useEffect } from "react";

// Components
import SortingBar from "../../components/layouts/SortingBar";
import Product from "../../components/Product";
import product from "../../assets/product-demo.png";

function UpperWear() {
  const [products, setProducts] = useState([
    {
      productId: "1",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "2",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "3",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "4",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "5",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "6",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "7",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "8",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "9",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "10",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
  ]);

  return (
    <div className="flex flex-col w-full mt-10 space-y-7 px-36 mb-10">
      <SortingBar />
      <div className="grid grid-cols-4 w-full justify-items-center gap-x-16 gap-y-10">
        {products.map((product, index) => (
          <Product
            key={index}
            productId={product.productId}
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
