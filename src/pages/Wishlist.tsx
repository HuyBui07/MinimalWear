import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

// utils
import { formatPrice } from "../utils";

// constants
import { API_CONST } from "../constants";

// icons
import { FaHeart } from "react-icons/fa";

type FavoriteProduct = {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
};

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteProduct[]>();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(API_CONST + "/user/get-user-favorites", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setFavorites(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavorites();
  }, []);

  const handleUnfavorite = async (productId: string) => {
    try {
      const response = await fetch(
        API_CONST +
          "/user/handle-favorite?action=remove&productId=" +
          productId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        setFavorites((prev) =>
          prev?.filter((product) => product.productId !== productId)
        );
        dispatch(removeFavorite(productId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full px-36 p-10 mb-10">
      <h3 className="font-bold mb-10">YÊU THÍCH</h3>
      <div className="flex flex-col border-2 px-5 py-5 w-full">
        <p>{favorites?.length} Sản phẩm</p>

        <div className="flex flex-col mt-5 cursor-pointer">
          {favorites?.map((product, index) => (
            <>
              <div className="flex flex-row mb-6" onClick={() => {
                navigate(`/products/${product.productId}`);
              }}> 
                <div className="relative">
                  <img
                    src={product.image}
                    alt="product"
                    className="w-52 h-64 mr-5"
                  />
                  <button
                    onClick={() => handleUnfavorite(product.productId)}
                    className="absolute top-4 right-8 text-black"
                  >
                    {<FaHeart size={24} />}
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <p className="text-gray-400">
                    Mã sản phẩm: {product.productId}
                  </p>
                  <p>Màu sắc: {product.color}</p>
                  <p>Kích cỡ: {product.size}</p>
                  <p className="mt-6 font-bold text-2xl">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
              {index !== favorites.length - 1 && (
                <div className="h-[2px] w-full bg-gray-100 mb-6"></div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
