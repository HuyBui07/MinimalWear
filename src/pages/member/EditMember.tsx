import { useState } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import { API_CONST } from "../../constants";

export default function EditMember() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEmailPasswordChange, setIsEmailPasswordChange] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailPasswordChange(event.target.checked);
  };

  const user = useSelector((state: RootState) => state.user.user);
  const [newEmail, setNewEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);

  const [error, setError] = useState("");

  const handleChangeInformation = async () => {
    let body: any = {
      phone: phone,
      address: address,
    };

    if (isEmailPasswordChange) {
      if (newEmail !== user?.email) {
        body = {
          ...body,
          email: newEmail,
        };
      }

      if (oldPassword && newPassword) {
        body = {
          ...body,
          oldPassword: oldPassword,
          password: newPassword,
        };
      }
    }

    try {
      const response = await fetch(API_CONST + "/user/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      if (response.ok) {
        dispatch(
          updateUserInfo({
            email: newEmail,
            phone: phone,
            address: address,
          })
        );
        navigate("/member");
      }
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  return (
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
          <p className="mb-5 font-bold hover:underline cursor-pointer">
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
          <h4 className="font-bold mb-10 ">CHỈNH SỬA HỒ SƠ</h4>
          <div className="flex flex-col">
            {isEmailPasswordChange ? (
              <>
                <div className="flex flex-row w-full justify-between items-center mb-8">
                  <p className="font-bold">ĐỊA CHỈ EMAIL</p>
                  <input
                    type="email"
                    className="bg-gray-200 border-b-2 border-gray-400 ml-4 p-2 w-4/5 text-black"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-row w-full justify-between items-center mb-8">
                  <p className="font-bold">MẬT KHẨU CŨ</p>
                  <input
                    type="password"
                    className="bg-gray-200 border-b-2 border-gray-400 ml-4 p-2 w-4/5 text-black"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-row w-full justify-between items-center mb-8">
                  <p className="font-bold">MẬT KHẨU MỚI</p>
                  <input
                    type="password"
                    className="bg-gray-200 border-b-2 border-gray-400 ml-4 p-2 w-4/5 text-black"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}
              </>
            ) : (
              <div className="flex flex-row w-full justify-between items-center mb-6">
                <p className="font-bold">ĐỊA CHỈ EMAIL</p>
                <p className="w-4/5">{user?.email ?? "abc@gmail.com"}</p>
              </div>
            )}

            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                className="mr-2 h-5 w-5"
                checked={isEmailPasswordChange}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="subscribe">
                Thay đổi địa chỉ email và password
              </label>
            </div>

            <hr className="border-gray-300 mb-8" />

            <div className="flex flex-row w-full justify-between items-center mb-8">
              <p className="font-bold">SỐ ĐIỆN THOẠI</p>
              <input
                type="email"
                className="bg-gray-200 border-b-2 border-gray-400 ml-4 p-2 w-4/5 text-black"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex flex-row w-full justify-between items-center mb-8">
              <p className="font-bold">ĐỊA CHỈ</p>
              <input
                type="email"
                className="bg-gray-200 border-b-2 border-gray-400 ml-4 p-2 w-4/5 text-black"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button
              className="w-72 bg-black text-white h-10 font-bold"
              onClick={handleChangeInformation}
            >
              LƯU THAY ĐỔI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
