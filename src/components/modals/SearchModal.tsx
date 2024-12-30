import { useEffect, useState, useRef, useCallback } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import Product from "../Product";
import { API_CONST } from "../../constants";
import { ProductPageItem } from "../../types/ProductPageItem";

export default function SearchModal({
  setSearchModeOn,
}: {
  setSearchModeOn: (value: boolean) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleOverlayClick = () => {
    setSearchModeOn(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const [products, setProducts] = useState<ProductPageItem[]>([]);

  const fetchProducts = async (page: number) => {
    try {
      const response = await fetch(
        `${API_CONST}/product/get-all?page=${page}&limitItem=10&searchQuery=${searchQuery}`
      );
      const data = await response.json();

      setProducts((prevProducts) => [...prevProducts, ...data.data]);
      setHasMore(data.data.length > 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    if (searchQuery !== "") {
      fetchProducts(1);
    }
  }, [searchQuery]);

  const lastProductElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page);
    }
  }, [page]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center py-10 z-50 h-screen w-screen"
      onClick={handleOverlayClick}
    >
      <div
        className="relative flex flex-col w-3/5 bg-white p-8 rounded-lg "
        onClick={handleModalClick}
      >
        <FaTimes
          className="absolute right-3 top-3 text-xl cursor-pointer"
          onClick={() => setSearchModeOn(false)}
        />
        <div className="relative w-full h-12">
          <input
            type="text"
            className="w-full h-12 border-2 border-gray-300 rounded-xl px-4 bg-white"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-3 text-xl text-gray-400" />
        </div>
        {products.length != 0 ? (
          <div className="grid grid-cols-3 w-full justify-items-center gap-x-10 gap-y-5 overflow-y-auto mt-5 hide-scrollbar">
            {products.map((product, index) => {
              if (products.length === index + 1) {
                return (
                  <div ref={lastProductElementRef} key={index}>
                    <Product
                      key={index}
                      productId={product._id}
                      productName={product.name}
                      image={product.image}
                      price={product.price}
                    />
                  </div>
                );
              }

              return <div onClick={() => setSearchModeOn(false)}>
                <Product
                  key={index}
                  productId={product._id}
                  productName={product.name}
                  image={product.image}
                  price={product.price}
                />
              </div>
            })}
          </div>
        ) : (
          <>
            <div className="flex w-full h-full justify-center items-center">
              No products found
            </div>
          </>
        )}
      </div>
    </div>
  );
}
