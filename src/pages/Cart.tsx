import { useState, useEffect } from "react";

// images
import productPic from "../assets/product-demo.png";

// utils
import { formatPrice } from "../utils";

import { FaTimes } from "react-icons/fa";

export default function Cart() {
  const [cart, setCart] = useState([
    {
      id: "1",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
      quantity: 1,
    },
    {
      id: "2",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
      quantity: 1,
    },
    {
      id: "3",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
      quantity: 1,
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPrice = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, [cart]);

  const propProductList = [
    {
      id: "1",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
    },
    {
      id: "2",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
    },
    {
      id: "3",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
    },
  ];

  const handleRemoveProduct = (id: string) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart(
      cart.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const getQuantity = (id: string) => {
    const product = cart.find((product) => product.id === id);
    return product?.quantity || 1;
  };

  return (
    <div className="w-full px-36 p-10 mb-10">
      <h3 className="font-bold mb-10">GIỎ HÀNG</h3>

      <div className="flex flex-row w-full gap-10">
        <div className="flex flex-col w-2/3">
          {propProductList.map((product, index) => (
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
                      onClick={() => handleRemoveProduct(product.id)}
                    />
                  </div>

                  <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-col">
                      <p className="font-semibold text-xl">Số lượng</p>
                      <select
                        className="border border-gray-300 p-2 mt-4 bg-white w-24"
                        onChange={(e) =>
                          handleQuantityChange(
                            product.id,
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
                        {formatPrice(product.price * getQuantity(product.id))}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {index !== propProductList.length - 1 && (
                <div className="h-[2px] w-full bg-gray-100 mb-6"></div>
              )}
            </>
          ))}
        </div>

        <div className="flex flex-col w-1/3 h-fit sticky top-36">
          <div className="flex flex-col w-full border py-10 px-5">
            <p className="font-bold text-lg mb-10">
              TỔNG ĐƠN HÀNG| {propProductList.length} SẢN PHẨM
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
  );
}
