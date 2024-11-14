import { useNavigate } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

export default function AuthModal({setIsModalOpen} : {setIsModalOpen: (value: boolean) => void}) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/signin");
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-screen w-screen">
      <div className="flex flex-row w-1/3 bg-white p-5">
        <div className="flex flex-col  w-2/3 relative ">
          <p className="font-bold text-xl mb-6">YÊU CẦU ĐĂNG NHẬP</p>
          <p className="font-normal text-lg mb-6">
            Vui lòng đến trang đăng nhập.
          </p>
          <button
            onClick={handleNavigate}
            className="w-full bg-black text-white h-10 font-bold"
          >
            OK
          </button>
        </div>
        <FaTimes className="ml-auto text-2xl cursor-pointer" onClick={() => setIsModalOpen(false)}/>
      </div>
    </div>
  );
}
