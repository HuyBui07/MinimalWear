import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";

// images
import product from "../assets/product-demo.png";

// utils
import { getBackgroundColor, formatPrice } from "../utils";

// icons
import { FaPlus, FaMinus } from "react-icons/fa";
import { API_CONST } from "../constants";

import CartModal from "../components/modals/CartModal";

type ProductDetails = {
  name: string;
  images: string[];
  price: number;
  variants: {
    color: string;
    sizes: {
      size: string;
      stock: number;
    }[];
  }[];
  rating: number;
  description: string;
  material: string;
};

export default function ProductDetails() {
  const dispatch = useDispatch();

   const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Selected product's attributes
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalStock, setTotalStock] = useState(0);

  // Side information open state
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);

  // Product details
  const { productId } = useParams<{ productId: string }>();
  const [productDetails, setProductDetails] = useState<ProductDetails>();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        await fetch(API_CONST + "/product/get-detail/" + productId)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.data);
            setProductDetails(data.data);
            setSelectedColor(data.data.variants[0].color);
            setSelectedSize(data.data.variants[0].sizes[0].size);
            setTotalStock(data.data.variants[0].sizes[0].stock);
          });
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };
    fetchProductDetails();
  }, []);

  const handleAddToCart = async () => {
    try {
      const response = await fetch(API_CONST + "/user/handle-cart?action=add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          productId,
          color: selectedColor,
          size: selectedSize,
          quantity: selectedQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (response.ok) {
        setIsCartModalOpen(true);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <>
      {isCartModalOpen && <CartModal setIsModalOpen={setIsCartModalOpen} />}
      <div className="flex flex-row justify-between w-full px-36 mb-10">
        <div className="flex flex-col w-3/5 mt-8">
          <div className="grid grid-cols-2 mb-10 w-full">
            {productDetails?.images.map((image) => {
              return (
                <img
                  src={image}
                  className="h-96 w-full object-cover"
                  key={image}
                />
              );
            })}
          </div>

          <p className="text-2xl mb-2">Mô tả</p>
          <div className="h-[2px] w-full bg-gray-100"></div>

          <div
            className="h-12 flex flex-row items-center justify-between cursor-pointer"
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          >
            {isDescriptionOpen ? (
              <>
                <p className="font-bold">Chi tiết</p>
                <button className="text-gray-400">
                  <FaMinus size={12} />
                </button>
              </>
            ) : (
              <>
                <p>Chi tiết</p>
                <button className="text-gray-400">
                  <FaPlus size={12} />
                </button>
              </>
            )}
          </div>

          {isDescriptionOpen && (
            <div className="whitespace-pre-line my-4">
              <p>{productDetails!.description}</p>
            </div>
          )}

          <div className="h-[2px] w-full bg-gray-100"></div>

          <div
            className="h-12 flex flex-row items-center justify-between cursor-pointer"
            onClick={() => setIsMaterialOpen(!isMaterialOpen)}
          >
            {isMaterialOpen ? (
              <>
                <p className="font-bold">Chất liệu/ Cách chăm sóc</p>
                <button className="text-gray-400">
                  <FaMinus size={12} />
                </button>
              </>
            ) : (
              <>
                <p>Chất liệu/ Cách chăm sóc</p>
                <button className="text-gray-400">
                  <FaPlus size={12} />
                </button>
              </>
            )}
          </div>

          {isMaterialOpen && (
            <div className="whitespace-pre-line my-4">
              <p>{productDetails!.material}</p>
            </div>
          )}

          <div className="h-[2px] w-full bg-gray-100"></div>
        </div>

        <div className="w-1/3 h-fit sticky top-36">
          <h1 className="font-bold text-4xl mb-10">
            {productDetails?.name || ""}
          </h1>

          <p className="text-gray-500 mb-2">Màu sắc: {selectedColor}</p>
          <div className="flex flex-row mb-7">
            {productDetails?.variants.map((variant) => {
              return (
                <div
                  className={`flex h-9 w-9 items-center justify-center mr-2 p-0.5 border-2 ${
                    selectedColor == variant.color
                      ? "border-black"
                      : "border-white"
                  }`}
                >
                  <div
                    className={`h-7 w-7 ${getBackgroundColor(variant.color)}`}
                    onClick={() => {
                      setSelectedColor(variant.color);
                      setSelectedSize(variant.sizes[0].size);
                      setTotalStock(variant.sizes[0].stock);
                    }}
                  ></div>
                </div>
              );
            })}
          </div>

          <p className="text-gray-500 mb-2">Kích cỡ: {selectedSize}</p>
          <div className="flex flex-row mb-10">
            {productDetails?.variants
              .find((variant) => variant.color === selectedColor)
              ?.sizes.map((size) => {
                return (
                  <div
                    className={`flex h-9 w-9 items-center justify-center mr-2 p-0.5 border-2 ${
                      selectedSize == size.size
                        ? "border-black"
                        : "border-white"
                    }`}
                    key={size.size}
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center ${
                        selectedSize == size.size
                          ? "bg-black text-white"
                          : "bg-white border border-black"
                      }`}
                      onClick={() => {
                        setSelectedSize(size.size);
                        setTotalStock(size.stock);
                      }}
                    >
                      <p>{size.size}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          <p className="font-bold text-3xl mb-7">
            {formatPrice(productDetails?.price || 0)}
          </p>

          <div className="w-28 h-10 bg-gray-100 rounded-3xl flex flex-row items-center justify-between px-5">
            <button
              className={`${selectedQuantity == 1 ? "text-gray-300" : ""} h-5`}
              onClick={() => {
                if (selectedQuantity > 1) {
                  setSelectedQuantity(selectedQuantity - 1);
                }
              }}
            >
              {<FaMinus size={10} />}
            </button>
            <p>
              {selectedQuantity <= totalStock ? selectedQuantity : totalStock}
            </p>
            <button
              onClick={() => {
                if (selectedQuantity < totalStock) {
                  setSelectedQuantity(selectedQuantity + 1);
                }
              }}
              className={`${
                selectedQuantity >=
                productDetails?.variants
                  .find((variant) => variant.color === selectedColor)
                  ?.sizes.find((size) => size.size === selectedSize)?.stock!
                  ? "text-gray-300"
                  : ""
              } h-5`}
            >
              {<FaPlus size={10} />}
            </button>
          </div>
          {totalStock <= 10 && (
            <p className="text-red-500 text-sm mt-2">Còn ít hàng</p>
          )}

          <button
            className="w-full h-12 bg-black text-white rounded-3xl font-bold mt-10"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </>
  );
}
