import { useState } from "react";

// commponents
import BackIcon from "../../assets/back.svg?react";
import LoadingScreen from "../../components/LoadingScreen";

// icons
import { FaTimes } from "react-icons/fa";
import { API_CONST } from "../../constants";

type Size = {
  size: string;
  stock: number;
};

type Stock = {
  color: string;
  sizes: Size[];
};

export default function NewProduct(props: any) {
  // props
  const setIsModalOpen = props.setIsModalOpen;
  const newProductAdded = props.newProductAdded;
  const setNewProductAdded = props.setNewProductAdded;
  const commomSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const [isLoading, setIsLoading] = useState(false);

  // Input actions
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");

  const handleColorChange = (index: number, color: string) => {
    const colorExists = stocks.some(
      (stock, i) =>
        stock.color.toLowerCase() === color.toLowerCase() && i !== index
    );

    if (colorExists) {
      alert("This color already exists.");
      return;
    }

    setStocks((prevStocks) =>
      prevStocks.map((prevStock, i) => {
        if (i === index) {
          return { ...prevStock, color: color.toLowerCase() };
        }
        return prevStock;
      })
    );
  };

  const handleSizeChange = (
    stockIndex: number,
    sizeIndex: number,
    changedSize: string
  ) => {
    const sizeExists = stocks[stockIndex].sizes.some(
      (size, i) => size.size === changedSize && i !== sizeIndex
    );

    if (sizeExists) {
      alert("This size already exists.");
      return;
    }

    setStocks((prevStocks) =>
      prevStocks.map((prevStock, i) => {
        if (i === stockIndex) {
          return {
            ...prevStock,
            sizes: prevStock.sizes.map((prevSize, j) => {
              if (j === sizeIndex) {
                return { ...prevSize, size: changedSize };
              }
              return prevSize;
            }),
          };
        }
        return prevStock;
      })
    );
  };

  const handleStockChange = (
    stockIndex: number,
    sizeIndex: number,
    changedStock: number
  ) => {
    if (changedStock < 0) {
      alert("Stock cannot be negative");
      return;
    }

    setStocks((prevStocks) =>
      prevStocks.map((prevStock, i) => {
        if (i === stockIndex) {
          return {
            ...prevStock,
            sizes: prevStock.sizes.map((prevSize, j) => {
              if (j === sizeIndex) {
                return { ...prevSize, stock: changedStock };
              }
              return prevSize;
            }),
          };
        }
        return prevStock;
      })
    );
  };

  const isProductValid = () => {
    if (!productName) {
      alert("Please enter the product name.");
      return false;
    }

    if (!productType) {
      alert("Please select the product type.");
      return false;
    }

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return false;
    }

    if (!price || price <= 0) {
      alert("Please enter a valid price.");
      return false;
    }

    if (stocks.length === 0) {
      alert("Please add at least one stock variant.");
      return false;
    }

    if (images.length < 1) {
      alert("Please upload at least one image.");
      return false;
    }

    if (
      stocks.some(
        (stock) => !stock.color || stock.color == "" || stock.sizes.length < 1
      )
    ) {
      alert("Please fill in all stock fields.");
      return false;
    }

    if (
      stocks.some((stock) =>
        stock.sizes.some((size) => !size.size || size.size == "")
      )
    ) {
      
      alert("Please fill in all size fields.");
      return false;
    }

    if (stocks.some((stock) => stock.sizes.some((size) => !size.stock))) {
      alert("Please fill in all stock fields.");
      return false;
    }

    stocks.forEach((stock) => {
      stock.sizes = stock.sizes.sort((a, b) => {
        if (commomSizes.indexOf(a.size) < commomSizes.indexOf(b.size))
          return -1;
        if (commomSizes.indexOf(a.size) > commomSizes.indexOf(b.size))
          return 1;
        return 0;
      });
    });

    return true;
  };

  const handleAddProduct = async () => {
    setIsLoading(true);
    if (!isProductValid()) return;

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("type", productType);
    formData.append("price", (price || 0).toString());
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("variants", JSON.stringify(stocks));
    formData.append("description", description);
    formData.append("material", material);

    const response = await fetch(API_CONST + "/product/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      alert("Failed to add product" + data.message);
    }

    if (response.ok) {
      setIsLoading(false);
      alert("Product added successfully!");
      setNewProductAdded(!newProductAdded);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-gray-500 bg-opacity-30 flex flex-col justify-center items-center h-full w-full fixed top-0 left-0 z-10 ">
      {isLoading && <LoadingScreen />}
      <div className="flex flex-col w-2/3 bg-white p-5 border border-gray-500 rounded-xl overflow-y-auto my-5">
        <button
          className="flex justify-center items-center bg-white border border-black rounded-lg hover:bg-black hover:text-white mb-5 w-48"
          onClick={() => setIsModalOpen(false)}
        >
          <BackIcon />
          <span style={{ marginLeft: "1.25rem", fontSize: "1.125rem" }}>
            Add Product
          </span>
        </button>
        <h4 className="font-bold">Product name</h4>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-full mt-2"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <h4 className="font-bold mt-5">Product type</h4>
        <select
          className="border border-gray-300 rounded-lg p-2 w-1/5 mt-2"
          onChange={(e) => setProductType(e.target.value)}
        >
          <option value="">Select type</option>
          <option value="upperwear">Upperwear</option>
          <option value="lowerwear">Lowerwear</option>
          <option value="underwear">Underwear</option>
        </select>

        <h4 className="font-bold mt-5">Images ({images?.length || 0}/6)</h4>
        <div className="flex flex-row">
          {images?.map((image) => (
            <div className="relative" key={image.name}>
              <img
                src={URL.createObjectURL(image)}
                className="w-40 h-56 object-cover mt-2 mb-2 border border-gray-300"
              />
              <FaTimes
                className="absolute top-4 right-2 text-lg cursor-pointer"
                onClick={() =>
                  setImages(images?.filter((img) => img !== image))
                }
              />
            </div>
          ))}
        </div>

        {images?.length < 6 && (
          <input
            className="mt-2"
            type="file"
            accept="image/jpeg, image/png"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                const selectedFiles = Array.from(e.target.files);
                const totalFiles = images.length + selectedFiles.length;
                if (totalFiles <= 6) {
                  setImages([...images, ...selectedFiles]);
                } else {
                  const remainingFiles = 6 - images.length;
                  const newFiles = selectedFiles.slice(0, remainingFiles);
                  setImages([...images, ...newFiles]);
                  alert("You can only upload up to 6 images.");
                }
              }
            }}
          />
        )}

        <h4 className="font-bold mt-5">Price</h4>
        <input
          type="number"
          className="border border-gray-300 rounded-lg p-2 w-full mt-2"
          placeholder="In VND"
          onChange={(e) => {
            if (Number(e.target.value) < 0) {
              alert("Price cannot be negative");
              return;
            }
            setPrice(Number(e.target.value));
          }}
        />

        <h4 className="font-bold mt-5">Stocks</h4>
        {stocks?.map((stock, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-5 w-full mt-2 mb-2"
          >
            <div className="flex flex-row items-center justify-between w-full">
              <h3 className="font-bold">Variant {index + 1}</h3>
              <FaTimes
                className="ml-auto text-xl cursor-pointer"
                onClick={() => setStocks(stocks?.filter((_, i) => i !== index))}
              />
            </div>

            <h4 className="mt-2 font-bold">Color</h4>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-1/4"
              value={stock.color}
              onChange={(e) => {
                handleColorChange(index, e.target.value);
              }}
            />
            <h4 className="mt-2 font-bold">Sizes</h4>
            {stock.sizes.map((size, sizeIndex) => (
              <>
                {" "}
                <div
                  key={sizeIndex}
                  className="flex flex-row items-center mt-2 justify-between border border-gray-300 rounded-lg p-5 w-full "
                >
                  <div className="flex flex-row items-center w-5/6">
                    <h4 className="mr-2">Size</h4>
                    <select
                      className="border border-gray-300 rounded-lg p-2 w-2/5 mr-8"
                      value={size.size}
                      onChange={(e) =>
                        handleSizeChange(index, sizeIndex, e.target.value)
                      }
                    >
                      <option value="">Select size</option>
                      {commomSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>

                    <p className="">-</p>
                    <h4 className="ml-8 mr-2">Stock</h4>
                    <input
                      type="number"
                      defaultValue={size.stock}
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      onChange={(e) =>
                        handleStockChange(
                          index,
                          sizeIndex,
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <FaTimes
                    className="ml-auto text-lg cursor-pointer"
                    onClick={() =>
                      setStocks((prevStocks) => {
                        const newStocks = [...(prevStocks || [])];
                        newStocks[index].sizes = newStocks[index].sizes.filter(
                          (_, i) => i !== sizeIndex
                        );
                        return newStocks;
                      })
                    }
                  />
                </div>
              </>
            ))}
            <button
              className="border border-gray-300 rounded-lg p-2 w-60 mt-4"
              onClick={() => {
                setStocks((prevStocks = []) =>
                  prevStocks.map((prevStock, i) => {
                    if (i === index) {
                      return {
                        ...prevStock,
                        sizes: [...prevStock.sizes, { size: "", stock: 0 }],
                      };
                    }
                    return prevStock;
                  })
                );
              }}
            >
              Add size
            </button>
          </div>
        ))}

        <button
          className="border border-gray-300 rounded-lg p-2 w-60 mt-2"
          onClick={() =>
            setStocks((prevStocks) => [
              ...(prevStocks || []),
              { color: "", sizes: [{ size: "", stock: 0 }] },
            ])
          }
        >
          Add variant
        </button>

        <h4 className="font-bold mt-5">Description</h4>
        <textarea
          className="border border-gray-300 rounded-lg p-2 w-full min-h-52 mt-2"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <h4 className="font-bold mt-5">Material</h4>
        <textarea
          className="border border-gray-300 rounded-lg p-2 w-full min-h-52 mt-2"
          onChange={(e) => setMaterial(e.target.value)}
        ></textarea>

        <button
          className="bg-black text-white rounded-lg p-2 w-full mt-10"
          onClick={() => handleAddProduct()}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
