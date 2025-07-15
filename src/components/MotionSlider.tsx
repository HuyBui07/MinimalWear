import { useState } from "react";

// lotties
import Lottie from "lottie-react";
import animationOne from "../assets/lotties/lottie_1.json";
import animationTwo from "../assets/lotties/lottie_2.json";
import animationThree from "../assets/lotties/lottie_3.json";

const MotionSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const animations = [animationOne, animationTwo, animationThree];

  const handleMoveTo = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      <div className="relative w-full h-[400px] overflow-hidden">
        {animations.map((animation, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              currentIndex === index
                ? "translate-x-0 opacity-100"
                : index < currentIndex
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            }`}
          >
            <Lottie
              animationData={animation}
              loop={true}
              autoplay={true}
              style={{ height: "400px" }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-3 items-center justify-center">
        {animations.map((_, index) => (
          <div
            key={index}
            className={`h-3 rounded-full cursor-pointer transition-all duration-300 origin-center ${
              currentIndex === index ? "bg-black w-4" : "bg-gray-500 w-3"
            }`}
            onClick={() => handleMoveTo(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MotionSlider;
