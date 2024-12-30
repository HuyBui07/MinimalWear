import { useState, useEffect } from "react";

// Components
import SortingBar from "../../components/layouts/SortingBar";
import Product from "../../components/Product";

// types
import { ProductPageItem } from "../../types/ProductPageItem";

// const
import { API_CONST } from "../../constants";

function UnderWear() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<ProductPageItem[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchUnderwears = async () => {
      let endpoint =
        "/product/get-all?page=" +
        page +
        "&filter=underwear" +
        "&sort=" +
        sortBy;

      await fetch(API_CONST + endpoint).then(async (response: any) => {
        const data = await response.json();
        setProducts(data.data);
      });
    };
    fetchUnderwears();
  }, [page]);

  return (
    <div className="flex flex-col w-full mt-10 space-y-7 px-36 mb-10">
      <SortingBar
        page={page}
        setPage={setPage}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="grid grid-cols-4 w-full justify-items-center gap-x-16 gap-y-10">
        {products.length != 0 &&
          products.map((product, index) => (
            <Product
              key={index}
              productId={product._id}
              productName={product.name}
              image={product.image}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
}

export default UnderWear;
