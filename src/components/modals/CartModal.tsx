import { useNavigate } from "react-router-dom";

import { FaTimes } from "react-icons/fa";
import PartyPopper from "../../assets/party-popper.png";

export default function CartModal({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    setIsModalOpen(false);
    navigate("/checkout");
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-screen w-screen">
      <div className="flex flex-row w-1/3 bg-white p-5">
        <div className="flex flex-col  w-5/6 relative ">
          <div className="flex flex-row gap-5">
            <p className="font-bold text-lg mb-6 leading-relaxed">
              <span className="">Sản phẩm đã được thêm vào giỏ hàng</span>

              <img
                src={PartyPopper}
                alt="party-popper"
                className="w-8 h-8 ml-3 mb-4 inline"
              />
            </p>
          </div>

          <div className="flex flex-row gap-5">
            <button
              onClick={() => {
                setIsModalOpen(false);
                navigate(-1);
              }}
              className="w-full h-10  border-black border rounded-none hover:text-white hover:bg-black"
            >
              TIẾP TỤC MUA SẮM
            </button>
            <button
              onClick={handleNavigate}
              className="w-full bg-black text-white h-10 font-bold"
            >
              THANH TOÁN
            </button>
          </div>
        </div>
        <FaTimes
          className="ml-auto text-2xl cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
