import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setDelivery, setAddress } from "../../redux/slices/orderSlice";

// utils
import { formatPrice } from "../../utils";

// icons
import { FaExclamationTriangle } from "react-icons/fa";

export default function Delivery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);
  const userPhone = user?.phone;
  const [userAddress, setUserAddress] = useState(user?.address);
  const cart = useSelector((state: RootState) => state.order.order?.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState("standard");

  useEffect(() => {
    const totalPrice = cart?.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalPrice(totalPrice || 0);
    if (userAddress != "NA") {
      dispatch(setAddress(userAddress));
    }
  }, [cart]);

  const handleNextStep = () => {
    if (userAddress == "NA" || userPhone == "NA") {
      navigate("/member/edit");
      return;
    }

    navigate("/checkout/payment");
    dispatch(setDelivery(selectedDelivery));
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
              {userAddress == "NA" || userPhone == "NA" ? (
                <p className="mb-5 flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  Bạn chưa đăng ký đầy đủ thông tin
                </p>
              ) : (
                <>
                  <p className="mb-2 flex items-center">
                    Địa chỉ đăng ký: {userAddress}
                  </p>
                  <p className="mb-5 flex items-center">
                    Số điện thoại: {userPhone}
                  </p>
                </>
              )}

              <button
                className="w-fit px-10 h-12 font-semibold text-lg tracking-widest border-black border rounded-none hover:opacity-70"
                onClick={handleNextStep}
              >
                {userAddress == "NA" || userPhone == "NA"
                  ? "ĐĂNG KÝ THÔNG TIN"
                  : "CHỌN PHƯƠNG THỨC THANH TOÁN"}
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

        <div className="flex flex-col w-1/3 h-fit sticky top-44">
          <div className="flex flex-col w-full border py-10 px-5">
            <p className="font-bold text-lg mb-10">
              TỔNG ĐƠN HÀNG| {cart?.length || 0} SẢN PHẨM
            </p>
            {cart?.map((item) => (
              <div className="flex flex-row justify-between">
                <p>
                  - {item.quantity} {item.name}
                </p>
                <p>{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
            <div className="flex flex-row justify-between">
              <p>- Phí vận chuyển</p>
              <p>
                {selectedDelivery == "standard"
                  ? formatPrice(30000)
                  : formatPrice(50000)}
              </p>
            </div>
            <div className="flex flex-row justify-between mt-2">
              <p className="font-bold text-xl">Tổng cộng</p>
              <p className="font-bold text-xl">
                {selectedDelivery == "standard"
                  ? formatPrice(totalPrice + 30000)
                  : formatPrice(totalPrice + 50000)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
