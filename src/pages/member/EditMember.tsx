import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function EditMember() {
  const navigate = useNavigate();
  const [isEmailPasswordChange, setIsEmailPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailPasswordChange(event.target.checked);
  };

  const user = useSelector((state: RootState) => state.user.user);

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
          <p className="font-bold hover:underline cursor-pointer">
            Chỉnh sửa hồ sơ
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
                    value={user?.email}
                  />
                </div>

                <div className="flex flex-row w-full justify-between items-center mb-8">
                  <p className="font-bold">MẬT KHẨU</p>
                  <input
                    type="password"
                    className="bg-gray-200 border-b-2 border-gray-400 ml-4 p-2 w-4/5 text-black"
                    value={newPassword}
                  />
                </div>
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
                value={user?.email}
              />
            </div>

            <div className="flex flex-row w-full justify-between items-center mb-8">
              <p className="font-bold">ĐỊA CHỈ</p>
              <input
                type="email"
                className="bg-gray-200 border-b-2 border-gray-400 ml-4 p-2 w-4/5 text-black"
                value={user?.email}
              />
            </div>

            <button className="w-72 bg-black text-white h-10 font-bold">
              LƯU THAY ĐỔI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
