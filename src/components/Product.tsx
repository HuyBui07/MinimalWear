import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addFavorite, removeFavorite } from "../redux/slices/userSlice";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { API_CONST } from "../constants";

interface ProductProps {
  productId: string;
  image: string;
  productName: string;
  price: number;
}

function Product({ productId, image, productName, price }: ProductProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  const favorite = user?.favorite || [];

  useEffect(() => {
    if (favorite.includes(productId)) {
      setIsFavorite(true);
    }

  }, [favorite]);

  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = new Intl.NumberFormat("de-DE").format(price);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      try{
        const response = await fetch(API_CONST + "/user/handle-favorite?action=remove&productId=" + productId, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          setIsFavorite(false);
          dispatch(removeFavorite(productId));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try{
        const response = await fetch(API_CONST + "/user/handle-favorite?action=add&productId=" + productId, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          setIsFavorite(true);
          dispatch(addFavorite(productId));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="relative flex flex-col w-64 cursor-pointer"
      onClick={() => navigate("/products/" + productId)}
    >
      <img src={image} className="h-64 w-64" />

      <button
        onClick={handleFavorite}
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
