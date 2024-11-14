import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthModal from "../AuthModal";

// Icons
import men from "../../assets/men.png";
import cart from "../../assets/shopping-cart.png";
import user from "../../assets/user.png";
import search from "../../assets/search.png";
import heart from "../../assets/heart.png";

function Header() {
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.user.user
  );

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserIconClick = () => {
    if (isUserAuthenticated) {
      navigate("/profile");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen}/>}
      <div className="fixed top-0 left-0 w-full z-40 bg-white">
        <div className="bg-gray-200 w-full h-12">
          <p className="text-center font-extrabold text-lg   pt-2">
            Contact me at 21520909@gm.uit.edu.vn
          </p>
        </div>
        <div className="flex flex-row w-full h-20 items-center px-28 border-b-2">
          <div>
            <a href="/">
              <img src={men} className="h-12" />
            </a>
          </div>

          <div className="flex flex-row flex-grow justify-center space-x-16">
            <a
              href="#"
              className="font-semibold text-2xl hover:underline cursor-pointer"
            >
              Hot
            </a>
            <a
              href="/upperwear"
              className="font-semibold text-2xl hover:underline cursor-pointer"
            >
              Áo
            </a>
            <a
              href="/lowerwear"
              className="font-semibold text-2xl hover:underline cursor-pointer"
            >
              Quần
            </a>
            <a
              href="/underwear"
              className="font-semibold text-2xl hover:underline cursor-pointer"
            >
              Đồ Lót
            </a>
          </div>

          <div className="flex flex-row space-x-16">
            <img src={search} className="h-8"></img>
            <img src={user} className="h-8" onClick={handleUserIconClick}></img>
            <img src={heart} className="h-8"></img>
            <img src={cart} className="h-8"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
