import { useSelector } from "react-redux";

// Assets
import RightArrow from "../../assets/chevron.png";
import LeftArrow from "../../assets/left-chevron.png";

function SortingBar(props: any) {
  // props
  const { page, setPage, sortBy, setSortBy } = props;

  return (
    <div className="flex flex-row justify-between items-center px-12 py-4 bg-[#D9D9D9] bg-opacity-[0.2] rounded">
      <div className="flex items-center justify-center space-x-16">
        <p>Sắp xếp theo</p>

        <div className="flex flex-row space-x-9">
          <div
            onClick={() => setSortBy("newest")}
            className="bg-[#D9D9D9] w-36 h-11 rounded-md flex items-center justify-center cursor-pointer"
            style={
              sortBy === "newest"
                ? { backgroundColor: "black", color: "white" }
                : {}
            }
          >
            Mới nhất
          </div>
          <div
            onClick={() => setSortBy("highest-rating")}
            className="bg-[#D9D9D9] w-36 h-11 rounded-md flex items-center justify-center cursor-pointer"
            style={
              sortBy === "highest-rating"
                ? { backgroundColor: "black", color: "white" }
                : {}
            }
          >
            Yêu thích
          </div>

          <div
            onClick={() => setSortBy("best-seller")}
            className="bg-[#D9D9D9] w-36 h-11 rounded-md flex items-center justify-center cursor-pointer"
            style={
              sortBy === "best-seller"
                ? { backgroundColor: "black", color: "white" }
                : {}
            }
          >
            Bán chạy
          </div>

          <select
            className="bg-[#D9D9D9] w-44 h-11 rounded-md flex items-center justify-center cursor-pointer p-2"
            style={
              sortBy === "price-asc" || sortBy === "price-desc"
                ? { backgroundColor: "black", color: "white" }
                : {}
            }
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option disabled selected hidden>
              Giá
            </option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      <div className="flex flex-row space-x-5 items-center justify-center">
        <p>
          <span className="font-bold">{page}</span>/10
        </p>

        <div className="flex flex-row">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="h-11 w-11 bg-[#d9d9d9] border-2 flex items-center justify-center rounded-md border-black border-opacity-20"
          >
            <img src={LeftArrow} className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === 10}
            className="h-11 w-11 bg-[#d9d9d9] border-2 flex items-center justify-center rounded-md border-black border-opacity-20"
          >
            <img src={RightArrow} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SortingBar;
