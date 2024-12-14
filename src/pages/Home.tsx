import { useState, useEffect } from "react";

// images
import product from "../assets/product-demo.png";

// icons
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

// components
import Product from "../components/Product";

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
  const [products, setProducts] = useState([
    {
      productId: "1",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "2",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "3",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "4",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "5",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "6",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "7",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "8",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "9",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      productId: "10",
      image: product,
      productName: "Grateful Oversized Tee",
      price: 100000,
    },
  ]);

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

  const productRowSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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

      <div className="flex flex-col mx-36 mt-10 gap-5 mb-10">
        <div className="flex flex-row items-center">
          <h4 className="font-bold">Hot Sale</h4>
          <FaFire className="ml-2 text-black text-2xl" />
        </div>

        <Slider {...productRowSettings}>
          {products.map((product, index) => (
            <Product
              key={index}
              productId={product.productId}
              image={product.image}
              productName={product.productName}
              price={product.price}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Home;
