import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import PartyPopper from "../../assets/party-popper.png";

import { useDispatch } from "react-redux";
import { resetOrder } from "../../redux/slices/orderSlice";
import { setCartSize } from "../../redux/slices/userSlice";

export default function SuccessModal({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = () => {
    setIsModalOpen(false);
    dispatch(resetOrder());
    dispatch(setCartSize(0));
    navigate("/member/my-orders");
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-screen w-screen">
      <Confetti className="fixed top-0 w-full h-full" />
      <div className="flex flex-row w-1/3 bg-white p-5">
        <div className="flex flex-col  w-5/6 relative ">
          <div className="flex flex-row gap-5">
            <p className="font-bold text-lg mb-6 leading-relaxed">
              <span className="">Bạn đã đặt hàng thành công</span>

              <img
                src={PartyPopper}
                alt="party-popper"
                className="w-8 h-8 ml-3 mb-4 inline"
              />
            </p>
          </div>

          <button
            onClick={handleNavigate}
            className="w-full bg-black text-white h-10 font-bold"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
