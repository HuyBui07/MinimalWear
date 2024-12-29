import { useState, useEffect } from "react";

// constants
import { API_CONST } from "../constants";

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

// images
import product from "../assets/product-demo.png";

// components
import Product from "../components/Product";
import { ProductPageItem } from "../types/ProductPageItem";

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
  const [products, setProducts] = useState<ProductPageItem[]>([
    {
      _id: "1",
      image: product,
      name: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      _id: "2",
      image: product,
      name: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      _id: "3",
      image: product,
      name: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      _id: "4",
      image: product,
      name: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      _id: "5",
      image: product,
      name: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      _id: "6",
      image: product,
      name: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      _id: "7",
      image: product,
      name: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      _id: "8",
      image: product,
      name: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      _id: "9",
      image: product,
      name: "Grateful Oversized Tee",
      price: 100000,
    },
    {
      _id: "10",
      image: product,
      name: "Grateful Oversized Tee",
      price: 100000,
    },
  ]);

  // useEffect(() => {
  //   const fetchHotProducts = async () => {
  //     try {
  //       let endpoint = "/product/get-all?page=1" + "&sort=best-seller";
  //       const response = await fetch(API_CONST + endpoint);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch products");
  //       }
  //       const data = await response.json();
  //       setProducts(data.data);
  //     } catch (error) {
  //       console.error("Error fetching hot products:", error);
  //     }
  //   };
  //   fetchHotProducts();
  // }, []);

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

        <Slider {...productRowSettings} centerMode>
          {products?.map((product, index) => (
            <div className="ml-2">
              <Product
                key={index}
                productId={product._id}
                image={product.image}
                productName={product.name}
                price={product.price}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Home;
