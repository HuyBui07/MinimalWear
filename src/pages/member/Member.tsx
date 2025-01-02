import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Member() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  return (
    <div className="w-full px-36 p-10 mb-10">
      <h3 className="font-bold mb-10">CÀI ĐẶT TÀI KHOẢN</h3>
      <div className="flex">
        <div className="w-1/3">
          <p className="mb-5 font-bold hover:underline cursor-pointer">Hồ sơ</p>
          <p
            className="mb-5 hover:underline cursor-pointer"
            onClick={() => navigate("/member/edit")}
          >
            Chỉnh sửa hồ sơ
          </p>
          <p
            className="mb-5 hover:underline cursor-pointer"
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
          <h4 className="font-bold mb-10 ">HỒ SƠ</h4>
          <div className="flex gap-60">

            <div className="flex flex-col">
              <p className="font-bold">ĐỊA CHỈ EMAIL</p>
              <p className="mb-10">{user?.email ?? "abc@gmail.com"}</p>

              

              <p className="font-bold">ĐỊA CHỈ</p>
              <p>{user?.address ?? "123 Nguyen Van Linh"}</p>
            </div>

            <div className="flex flex-col">
              <p className="font-bold">SỐ ĐIỆN THOẠI</p>
              <p className="mb-10">{user?.phone ?? "0123456789"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
