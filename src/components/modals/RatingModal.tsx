import { useState } from "react";
import { FaTimes, FaStar } from "react-icons/fa";
import { formatPrice } from "../../utils";
import { API_CONST } from "../../constants";

type Rating = {
  productId: string;
  rating: number;
};

export default function RatingModal({
  setIsRatingModalOpen,
  orderId,
  products,
}: {
  setIsRatingModalOpen: (value: boolean) => void;
    orderId: string;
  products: any;
}) {
  const handleOverlayClick = async () => {
    try {
      const response = await fetch(API_CONST + "/order/rating/" + orderId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ ratings }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
    setIsRatingModalOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const [ratings, setRatings] = useState<Rating[]>([]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center py-10 z-50 h-screen w-screen"
      onClick={handleOverlayClick}
    >
      <div
        className="relative flex flex-col w-1/3 bg-white p-8 rounded-lg "
        onClick={handleModalClick}
      >
        <FaTimes
          className="absolute right-3 top-3 text-xl cursor-pointer"
          onClick={() => setIsRatingModalOpen(false)}
        />

        <p className="font-bold text-lg mb-6 leading-relaxed">
          Đánh giá sản phẩm
        </p>

        <div className="flex flex-col gap-4 w-full">
          {products.map((product: any) => (
            <>
              <div className="flex flex-row mb-6 border p-5">
                <img
                  src={product.productId.images[0]}
                  alt="product"
                  className="w-52 h-64 mr-5"
                />

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="font-semibold mb-2">
                    {product.productId.name}
                  </h4>
                  <p className="text-lg">
                    Giá: {formatPrice(product.productId.price)}
                  </p>
                  <p className="text-lg mt-10">Đánh giá:</p>
                  <div className="flex flex-row mt-3">
                    {[...Array(5)].map((_, i) => {
                      const existingRating = ratings.find(
                        (r) => r.productId === product.productId
                      );
                      return (
                        <FaStar
                          key={i}
                          size={30}
                          onClick={() =>
                            setRatings((prev) => {
                              const newRatings = prev.filter(
                                (r) => r.productId !== product.productId
                              );
                              return [
                                ...newRatings,
                                { productId: product.productId, rating: i + 1 },
                              ];
                            })
                          }
                          color={
                            i < (existingRating?.rating || 0)
                              ? "yellow"
                              : "gray"
                          }
                          className="cursor-pointer "
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
