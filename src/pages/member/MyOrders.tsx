import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_CONST } from "../../constants";
import { formatPrice } from "../../utils";
import RatingModal from "../../components/modals/RatingModal";

export default function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(API_CONST + "/order/get-all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.data);
          setOrders(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    try {
      const response = await fetch(API_CONST + "/order/cancel/" + orderId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status == "ERROR") {
          alert(data.message);
        } else {
          setOrders(orders.filter((order: any) => order._id !== orderId));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  return (
    <>
      {isRatingModalOpen && (
        <RatingModal
          setIsRatingModalOpen={setIsRatingModalOpen}
          orderId={selectedOrder._id}
          products={selectedOrder.products}
        />
      )}
      <div className="w-full px-36 p-10">
        <h3 className="font-bold mb-10">CÀI ĐẶT TÀI KHOẢN</h3>
        <div className="flex">
          <div className="w-1/3">
            <p
              className="mb-5 hover:underline cursor-pointer"
              onClick={() => navigate("/member")}
            >
              Hồ sơ
            </p>
            <p
              className="mb-5 hover:underline cursor-pointer"
              onClick={() => navigate("/member/edit")}
            >
              Chỉnh sửa hồ sơ
            </p>
            <p
              className="mb-5 font-bold hover:underline cursor-pointer"
              onClick={() => navigate("/member/my-orders")}
            >
              Đơn hàng của tôi
            </p>
            <p
              className="mb-5 hover:underline cursor-pointer"
              onClick={handleLogout}
            >
              Đăng xuất
            </p>
          </div>

          <div className="flex flex-col border-2 px-16 py-12 w-full">
            <h4 className="font-bold mb-10 ">ĐƠN HÀNG CỦA TÔI</h4>
            {orders.length == 0 && (
              <p className="text-gray-400">Bạn chưa có đơn hàng nào.</p>
            )}
            {orders.map((order: any) => (
              <div className="flex flex-col gap-1 border p-5 hover:bg-gray-100 cursor-pointer">
                <p className="text-gray-400 text-lg mb-2">
                  <span className="font-bold">Mã đơn hàng:</span> {order._id}
                </p>
                <p>
                  <span className="font-semibold">Ngày đặt hàng:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Trạng thái:</span>{" "}
                  <span
                    className={
                      order.status == "pending"
                        ? "text-yellow-500"
                        : order.status == "processing"
                        ? "text-blue-500"
                        : order.status == "delivering"
                        ? "text-purple-500"
                        : "text-green-500"
                    }
                  >
                    {order.status == "pending"
                      ? "Chưa xử lý"
                      : order.status == "processing"
                      ? "Đang xử lý"
                      : order.status == "delivering"
                      ? "Đang giao hàng"
                      : "Đã giao hàng"}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Sản phẩm:</span> {order.color}
                </p>
                {order.products.map((product: any) => (
                  <p className="ml-5">
                    - {product.productId.name} x {product.quantity}
                  </p>
                ))}
                <p className="mt-3 font-bold text-lg">
                  Tổng:{" "}
                  {formatPrice(
                    order.total + (order.delivery == "standard" ? 30000 : 50000)
                  )}
                </p>
                {order.status == "pending" && (
                  <button
                    className="mt-5 w-fit px-10 h-10 font-semibold text-xl tracking-widest border-red-500 text-red-500 bg-white border rounded-none hover:text-white hover:bg-red-500"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Hủy đơn hàng
                  </button>
                )}
                {order.status == "processing" && (
                  <p className="text-gray-400 font-light">
                    Bạn vui lòng gọi đến số hotline 1900 1000 để hủy đơn hàng
                    đang xử lý (phí: 10.000 đồng)
                  </p>
                )}
                {(order.status == "completed" && !order.rated) && (
                  <button
                    className="w-60 h-10 mt-2 font-semibold text-xl tracking-widest border-black border rounded-none hover:text-white hover:bg-black"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsRatingModalOpen(true);
                    }}
                  >
                    Đã nhận hàng
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
