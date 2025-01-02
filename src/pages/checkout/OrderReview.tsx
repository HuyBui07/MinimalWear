import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// images
import productPic from "../../assets/product-demo.png";

// utils
import { formatPrice } from "../../utils";

import { FaCheck } from "react-icons/fa";
import { API_CONST } from "../../constants";
import SuccessModal from "../../components/modals/SuccessModal";

import LoadingScreen from "../../components/LoadingScreen";

export default function OrderReview() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const order = useSelector((state: RootState) => state.order.order);
  const cart = order?.products;
  const deliveryPrice = order?.delivery == "standard" ? 30000 : 50000;

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPrice =
      cart?.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ) || 0;
    setTotalPrice(totalPrice + deliveryPrice);
  }, [cart]);

  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_CONST + "/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        console.log(data);
        
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {isSuccessModalOpen && (
        <SuccessModal setIsModalOpen={setIsSuccessModalOpen} />
      )}
      {loading && <LoadingScreen />}
      <div className="w-full px-36 p-10">
        <h3 className="font-bold mb-10">THANH TOÁN</h3>

        <div className="flex flex-row w-full gap-10">
          <div className="flex flex-col w-2/3">
            <div className="flex flex-row items-center justify-between w-full border opacity-30 bg-gray-300 mb-8 px-5">
              <p className="font-bold text-2xl my-8">1. TÙY CHỌN GIAO HÀNG</p>
              <FaCheck color="green" />
            </div>

            <div className="flex flex-row items-center justify-between w-full border opacity-30 bg-gray-300 mb-8 px-5">
              <p className="font-bold text-2xl my-8">
                2. PHƯƠNG THỨC THANH TOÁN
              </p>
              <FaCheck color="green" />
            </div>

            <div className="flex flex-col w-full border mb-8">
              <p className="font-bold text-2xl my-8 mx-5">
                3. XÁC NHẬN ĐƠN HÀNG
              </p>

              <div className="h-[2px] w-full bg-gray-100 mb-6"></div>

              <p className="font-bold text-xl mx-5">SẢN PHẨM ĐẶT HÀNG</p>
              <div className="flex flex-col w-full p-5">
                {cart?.map((product, index) => (
                  <>
                    <div className="flex flex-row mb-6">
                      <img
                        src={product.image || productPic}
                        alt="product"
                        className="w-52 h-64 mr-5"
                      />
                      <div className="flex flex-col h-1/2 justify-between w-full">
                        <h4 className="font-semibold ">{product.name}</h4>
                        <p>Màu sắc: {product.color}</p>
                        <p>Kích cỡ: {product.size}</p>
                        <p>Số lượng: {product.quantity}</p>
                      </div>
                    </div>
                    {index !== cart?.length - 1 && (
                      <div className="h-[2px] w-full bg-gray-100 mb-6"></div>
                    )}
                  </>
                ))}
              </div>

              <div className="h-[2px] w-full bg-gray-100 mb-6"></div>

              <div className="flex items-center px-5 ">
                <input
                  type="checkbox"
                  id="invoiceCheckbox"
                  className="mr-2"
                  onChange={(e) => {
                    if (e.target.checked) {
                      // Handle the logic for sending invoice through Gmail
                    }
                  }}
                />
                <label htmlFor="invoiceCheckbox" className="text-lg">
                  Gửi hóa đơn qua Gmail
                </label>
              </div>
              <button
                className="w-80 h-12 font-semibold text-xl tracking-widest ml-5  bg-black text-white rounded-none hover:opacity-70 mt-2 mb-10"
                onClick={() => handleOrder()}
              >
                ĐẶT HÀNG
              </button>
            </div>
          </div>

          <div className="flex flex-col w-1/3 h-fit sticky top-44">
            <div className="flex flex-col w-full border py-10 px-5">
              <p className="font-bold text-lg mb-10">
                TỔNG ĐƠN HÀNG| {cart?.length} SẢN PHẨM
              </p>
              {cart?.map((item) => (
                <div className="flex flex-row justify-between">
                  <p>- {item.name}</p>
                  <p>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              <div className="flex flex-row justify-between">
                <p>- Phí vận chuyển</p>
                <p>{formatPrice(deliveryPrice)}</p>
              </div>
              <div className="flex flex-row justify-between mt-2">
                <p className="font-bold text-xl">Tổng cộng</p>
                <p className="font-bold text-xl">{formatPrice(totalPrice)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
