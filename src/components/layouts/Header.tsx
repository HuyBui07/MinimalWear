import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import AuthModal from "../AuthModal";
import SearchBar from "../SearchBar";

// Icons
import men from "../../assets/men.png";
import cartIcon from "../../assets/shopping-cart.png";
import user from "../../assets/user.png";
import search from "../../assets/search.png";
import heart from "../../assets/heart.png";

function Header() {
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.user.user
  );
  const favorite = useSelector(
    (state: RootState) => state.favorite.favoriteItemIds
  );
  const cart = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    console.log(isUserAuthenticated);
  }, [isUserAuthenticated]);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserIconClick = () => {
    if (isUserAuthenticated) {
      navigate("/member");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleHeartIconClick = () => {
    if (isUserAuthenticated || true) {
      navigate("/wishlist");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCartIconClick = () => {
    if (isUserAuthenticated || true) {
      navigate("/cart");
    } else {
      setIsModalOpen(true);
    }
  };

  // Search
  const [searchModeOn, setSearchModeOn] = useState(false);

  return (
    <>
      {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen} />}
      <div className="fixed top-0 left-0 w-full z-40 bg-white">
        <div className="bg-gray-200 w-full h-8 flex justify-center items-center">
          <p className="text-center font-extrabold text-sm">
            Contact me at 21520909@gm.uit.edu.vn {isUserAuthenticated?.email}
          </p>
        </div>
        {/* {searchModeOn && <SearchBar />} */}

        <div className="flex flex-row w-full h-20 items-center px-36 border-b-2">
          {searchModeOn ? (
            <SearchBar setSearchModeOn={setSearchModeOn} />
          ) : (
            <>
              <div>
                <a onClick={() => navigate("/")}>
                  <img src={men} className="h-12 cursor-pointer" />
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
                  onClick={() => navigate("/upperwear")}
                  className="font-semibold text-2xl hover:underline cursor-pointer"
                >
                  Áo
                </a>
                <a
                  onClick={() => navigate("/lowerwear")}
                  className="font-semibold text-2xl hover:underline cursor-pointer"
                >
                  Quần
                </a>
                <a
                  onClick={() => navigate("/underwear")}
                  className="font-semibold text-2xl hover:underline cursor-pointer"
                >
                  Đồ Lót
                </a>
              </div>

              <div className="flex flex-row space-x-10 items-center">
                <div className="h-9 w-9 flex items-center justify-center">
                  <img
                    src={search}
                    className="h-6 cursor-pointer"
                    onClick={() => setSearchModeOn(true)}
                  ></img>
                </div>
                <div className="h-9 w-9 flex items-center justify-center">
                  <img
                    src={user}
                    className="h-6 cursor-pointer"
                    onClick={handleUserIconClick}
                  ></img>
                </div>

                <div className="relative h-9 w-9 flex items-center justify-center">
                  <img
                    src={heart}
                    className="h-6 cursor-pointer"
                    onClick={handleHeartIconClick}
                  />
                  {favorite.length > 0 && (
                    <div className="absolute top-0 right-0 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {favorite.length}
                    </div>
                  )}
                </div>
                <div className="relative h-9 w-9 flex items-center justify-center">
                  <img
                    src={cartIcon}
                    className="h-6 cursor-pointer"
                    onClick={handleCartIconClick}
                  />
                  {cart.length > 0 && (
                    <div className="absolute top-0 right-0 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {cart.length}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
