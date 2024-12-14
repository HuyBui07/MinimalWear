import { useState, useEffect } from "react";

// images
import productPic from "../../assets/product-demo.png";

// utils
import { formatPrice } from "../../utils";

import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

export default function Delivery() {
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
  const [selectedDelivery, setSelectedDelivery] = useState("standard");

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
      <h3 className="font-bold mb-10">THANH TOÁN</h3>

      <div className="flex flex-row w-full gap-10">
        <div className="flex flex-col w-2/3">
          <div className="flex flex-col w-full border mb-8">
            <p className="font-bold text-2xl my-8 mx-5">
              1. TÙY CHỌN GIAO HÀNG
            </p>

            <div className="h-[2px] w-full bg-gray-100 mb-6"></div>

            <div className="flex flex-col px-5 mb-5">
              <div
                className={`flex flex-col border rounded-lg p-5 mb-5 gap-2 hover:cursor-pointer hover:bg-gray-50 ${
                  selectedDelivery == "standard" && "bg-gray-200"
                }`}
                onClick={() => setSelectedDelivery("standard")}
              >
                <p className="font-semibold text-2xl">Giao hàng tiêu chuẩn</p>
                <p>
                  Phí vận chuyển:{" "}
                  <span className="text-cyan-800 font-semibold">30.000 đ</span>
                </p>
                <p className="font-semibold">
                  [Thời gian giao hàng dự kiến] TP. Hồ Chí Minh: 2 ngày, các
                  tỉnh miền Nam khác: 3 ngày, Hà Nội: 3 ngày, các tỉnh miền Bắc
                  khác: 4 ngày, các tỉnh miền Trung: 4 ngày.
                </p>{" "}
              </div>

              <div
                className={`flex flex-col border rounded-lg p-5 gap-2 hover:cursor-pointer hover:bg-gray-50 ${
                  selectedDelivery == "express" && "bg-gray-200"
                }`}
                onClick={() => setSelectedDelivery("express")}
              >
                <p className="font-semibold text-2xl">Giao hàng nhanh</p>
                <p>
                  Phí vận chuyển:{" "}
                  <span className="text-cyan-800 font-semibold">50.000 đ</span>
                </p>
                <p className="font-semibold">
                  [Thời gian giao hàng dự kiến] TP. Hồ Chí Minh: 1 ngày, các
                  tỉnh miền Nam khác: 2 ngày, Hà Nội: 2 ngày, các tỉnh miền Bắc
                  khác: 3 ngày, các tỉnh miền Trung: 3 ngày.
                </p>{" "}
              </div>

              <div className="h-[2px] w-full bg-gray-100 my-6"></div>
              <p className="mb-5 flex items-center">
                <FaExclamationTriangle className="mr-2" />
                Bạn chưa đăng ký địa chỉ
              </p>
              <button className="w-80 h-12 font-semibold text-lg tracking-widest border-black border rounded-none hover:opacity-70">
                ĐĂNG KÝ ĐỊA CHỈ MỚI
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full border opacity-30 bg-gray-300 mb-8">
            <p className="font-bold text-2xl my-8 mx-5">
              2. PHƯƠNG THỨC THANH TOÁN
            </p>
          </div>
          <div className="flex flex-col w-full border opacity-30 bg-gray-300">
            <p className="font-bold text-2xl my-8 mx-5">3. XÁC NHẬN ĐƠN HÀNG</p>
          </div>
        </div>

        <div className="flex flex-col w-1/3 h-fit sticky top-48">
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
        </div>
      </div>
    </div>
  );
}
