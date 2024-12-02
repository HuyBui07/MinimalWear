import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaHeart, FaRegHeart } from "react-icons/fa";

interface ProductProps {
  image: string;
  productName: string;
  price: number;
}

function Product({ image, productName, price }: ProductProps) {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = new Intl.NumberFormat("de-DE").format(price);

  return (
    <div className="relative flex flex-col w-64 cursor-pointer" onClick={() => navigate("/products")}>
      <img src={image} className="h-64 w-64" />

      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 text-black"
      >
        {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
      </button>

      <span className="mt-3 text-lg font-medium w-fit">{productName}</span>
      <span className="mt-3 text-3xl font-semibold">{formattedPrice} VND</span>
    </div>
  );
}

export default Product;
