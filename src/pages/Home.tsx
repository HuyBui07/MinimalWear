import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaFire } from "react-icons/fa";

// carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// posts
import FirstPost from "../components/posts/FirstPost";
import SecondPost from "../components/posts/SecondPost";
import ThirdPost from "../components/posts/ThirdPost";

// icon
import fire from "../assets/fire.png";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const PrevArrow = (props: ArrowProps) => {
  const { onClick } = props;
  return (
    <div
      className="z-10 absolute top-1/2 left-5 transform -translate-y-1/2"
      onClick={onClick}
    >
      <IoIosArrowBack className="text-gray-900 opacity-40 h-28 w-20" />
    </div>
  );
};

const NextArrow = (props: ArrowProps) => {
  const { onClick } = props;
  return (
    <div
      className="z-10 absolute top-1/2 right-5 transform -translate-y-1/2"
      onClick={onClick}
    >
      <IoIosArrowForward className="text-gray-900 opacity-40 h-28 w-20" />
    </div>
  );
};

function Home() {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="flex flex-col w-full">
      <Slider {...settings}>
        <FirstPost />
        <SecondPost />
        <ThirdPost />
      </Slider>

      <div className="flex flex-col mx-28 mt-10">
        <div className="flex flex-row items-center">
          <h4 className="font-bold">Hot Sale</h4>
          <FaFire className="ml-2 text-black text-2xl" />
        </div>

        {/* <Slider>
          {products.map((product, index) => (
            <Product
              key={index}
              image={product.image}
              productName={product.productName}
              price={product.price}
            />
          ))}
        </Slider> */}
      </div>
    </div>
  );
}

export default Home;
