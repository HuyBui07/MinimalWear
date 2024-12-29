import { useState, useEffect } from "react";

// reudx
import { useDispatch } from "react-redux";
import { setCartSize } from "../redux/slices/userSlice";

// images
import productPic from "../assets/product-demo.png";

// utils
import { formatPrice } from "../utils";

import { FaTimes } from "react-icons/fa";
import { API_CONST } from "../constants";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

export default function Cart() {
  const dispatch = useDispatch();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(API_CONST + "/user/get-user-cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCart(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    setTotalPrice(
      cart.reduce(
        (acc: number, product: CartItem) =>
          acc + product.price * product.quantity,
        0
      )
    );
  }, [cart]);

  const handleRemoveProduct = async (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => {
    try {
      const response = await fetch(
        API_CONST + "/user/handle-cart?action=remove",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            productId: id,
            color: color,
            size: size,
            quantity: quantity,
          }),
        }
      );

      if (response.ok) {
        setCart(cart.filter((product) => product.productId !== id));
        dispatch(setCartSize(cart.length - 1));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = async (id: string, color: string, size: string, quantity: number) => {
    try {
      const response = await fetch(API_CONST + "/user/handle-cart?action=update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          productId: id,
          color: color,
          size: size,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }

    setCart(
      cart.map((product) =>
        product.productId === id ? { ...product, quantity } : product
      )
    );
    setTotalPrice(
      cart.reduce(
        (acc: number, product: CartItem) =>
          acc + product.price * product.quantity,
        0
      )
    );
  };

  const getQuantity = (id: string) => {
    const product = cart?.find((product) => product.productId === id);
    return product?.quantity || 1;
  };

  return (
    <>
      
      <div className="w-full px-36 p-10 mb-10">
        <h3 className="font-bold mb-10">GIỎ HÀNG</h3>

        <div className="flex flex-row w-full gap-10">
          <div className="flex flex-col w-2/3">
            {cart.map((product, index) => (
              <>
                <div className="flex flex-row mb-6">
                  <img
                    src={productPic}
                    alt="product"
                    className="w-52 h-64 mr-5"
                  />
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-row w-full justify-between">
                      <div className="flex flex-col gap-1">
                        <h4 className="font-semibold ">{product.name}</h4>
                        <p>Màu sắc: {product.color}</p>
                        <p>Kích cỡ: {product.size}</p>
                        <p>{formatPrice(product.price)}</p>
                      </div>

                      <FaTimes
                        className="ml-auto text-2xl cursor-pointer"
                        onClick={() =>
                          handleRemoveProduct(
                            product.productId,
                            product.color,
                            product.size,
                            product.quantity
                          )
                        }
                      />
                    </div>

                    <div className="flex flex-row w-full justify-between">
                      <div className="flex flex-col">
                        <p className="font-semibold text-xl">Số lượng</p>
                        <select
                          className="border border-gray-300 p-2 mt-4 bg-white w-24"
                          value={getQuantity(product.productId)}
                          onChange={(e) =>
                            handleQuantityChange(
                              product.productId,
                              product.color,
                              product.size,
                              Number(e.target.value)
                            )
                          }
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <p className="text-xl mt-auto">
                        Tổng:{" "}
                        <span className="font-bold">
                          {formatPrice(
                            product.price * getQuantity(product.productId)
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                {index !== cart.length - 1 && (
                  <div className="h-[2px] w-full bg-gray-100 mb-6"></div>
                )}
              </>
            ))}
          </div>

          <div className="flex flex-col w-1/3 h-fit sticky top-36">
            <div className="flex flex-col w-full border py-10 px-5">
              <p className="font-bold text-lg mb-10">
                TỔNG ĐƠN HÀNG| {cart.length} SẢN PHẨM
              </p>
              {cart.map((item) => (
                <div className="flex flex-row justify-between">
                  <p>- {item.name}</p>
                  <p>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              <div className="flex flex-row justify-between mt-2">
                <p className="font-bold text-xl">Tổng cộng</p>
                <p className="font-bold text-xl">{formatPrice(totalPrice)}</p>
              </div>
            </div>
            <button className="w-full h-12 font-semibold text-xl tracking-widest bg-black text-white rounded-none hover:opacity-70 mt-10 mb-5">
              THANH TOÁN
            </button>
            <button className="w-full h-12 font-semibold text-xl tracking-widest border-black border rounded-none hover:opacity-70">
              TIẾP TỤC MUA HÀNG
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
