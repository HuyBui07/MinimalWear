import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// images
import productPic from "../assets/product-demo.png";

// utils
import { formatPrice } from "../utils";

export default function Wishlist() {
  const favorite = useSelector(
    (state: RootState) => state.favorite.favoriteItemIds
  );

  const propProductList = [
    {
      id: "1",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
    },
    {
      id: "2",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
    },
    {
      id: "3",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
    },
  ];

  return (
    <div className="w-full px-36 p-10 mb-10">
      <h3 className="font-bold mb-10">YÊU THÍCH</h3>
      <div className="flex flex-col border-2 px-5 py-5 w-full">
        <p>{favorite.length} Sản phẩm</p>

        <div className="flex flex-col mt-5">
          {propProductList.map((product, index) => (
            <>
              <div className="flex flex-row mb-6">
                <img
                  src={productPic}
                  alt="product"
                  className="w-52 h-64 mr-5"
                />
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <p className="text-gray-400">Mã sản phẩm: {product.id}</p>
                  <p>Màu sắc: {product.color}</p>
                  <p>Kích cỡ: {product.size}</p>
                  <p className="mt-6 font-bold text-2xl">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
              {index !== propProductList.length - 1 && (
                <div className="h-[2px] w-full bg-gray-100 mb-6"></div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
