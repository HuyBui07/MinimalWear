import { useEffect, useState } from "react";

// components
import Header from "../../components/layouts/Header";
import Table from "../../components/Table";

// components
import NewProduct from "./NewProduct";
import ProductDetails from "./ProductDetails";

// utils
import { formatPrice } from "../../utills";

// icons
import DeleteIcon from "../../assets/delete.svg?react";
import AddIcon from "../../assets/add.svg?react";
import { API_CONST } from "../../constants";
import SearchBar from "../../components/SearchBar";

type Product = {
  id: string;
  name: string;
  image: string;
  type: string;
  price: number;
  stock: number;
};

export default function Product(props: any) {
  const setIsAuthModalOpen = props.setIsAuthModalOpen;

  // Product details actions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  // New product actions
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [productsChanged, setProductsChanged] = useState(false);

  // Table actions
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
    total: 0,
  });

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async (page: number, size: number) => {
    console.log("fetching products in function");
    const response = await fetch(
      API_CONST +
        `/product/get-all-admin?page=${page + 1}&limitItem=${size}&sort=newest`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminAccessToken"),
        },
      }
    );

    if (response.status === 401) {
      alert("Unauthorized");
      return;
    }

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setProducts(
        data.data.map((product: any) => {
          return {
            id: product._id,
            name: product.name,
            image: product.image,
            type: product.type,
            price: product.price,
            stock: product.stock,
          };
        })
      );
      setPaginationModel({
        ...paginationModel,
        total: data.totalProd,
      });
    } else {
      if (data.status === "UNAUTHORIZED") {
        setIsAuthModalOpen(true);
      }
    }
  };

  useEffect(() => {
    console.log("fetching products");
    fetchProducts(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize, productsChanged]);

  const productColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.16,
      headerClassName: "bg-gray-100 hover:cursor-pointer",
    },
    {
      field: "name",
      headerName: "Product name",
      flex: 0.3,
      headerClassName: "bg-gray-100 hover:cursor-pointer",
      renderCell: (params: any) => (
        <div className="flex flex-row items-center gap-5 h-full">
          <img className="h-10 w-10" src={params.row.image} />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.15,
      headerClassName: "bg-gray-100",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.1,
      headerClassName: "bg-gray-100",
      valueGetter: (params: any) => formatPrice(params),
    },
    {
      field: "stock",
      headerName: "Stocks",
      headerClassName: "bg-gray-100",
      flex: 0.1,
    },
  ];

  // Delete
  const [rowsSelected, setRowsSelected] = useState<any[]>([]);

  const handleDelete = (selectedRowIds: string[]) => {
    const confirmed = window.confirm("Are you sure you want to delete?");

    if (confirmed) {
      selectedRowIds.forEach(async (id) => {
        const response = await fetch(API_CONST + `/product/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("adminAccessToken"),
          },
        });

        if (response.status === 401) {
          alert("Unauthorized");
          return;
        }

        if (response.ok) {
          fetchProducts(paginationModel.page, paginationModel.pageSize);
        }
      });
    }
  };

  // Search logic
  const [searchQuery, setSearchQuery] = useState("");
  const [option, setOption] = useState("id");
  const options = [
    { value: "id", label: "ID" },
    { value: "name", label: "Name" },
  ];

  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);

  const fetchSearchedProducts = async (query: string, option: string) => {
    try {
      const response = await fetch(
        `${API_CONST}/product/search-admin?query=${query}&option=${option}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("adminAccessToken"),
          },
        }
      );

      if (response.status === 401) {
        alert("Unauthorized");
        return;
      }

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSearchedProducts(
          data.data.map((product: any) => {
            return {
              id: product._id,
              name: product.name,
              image: product.image,
              type: product.type,
              price: product.price,
              stock: product.stock,
            };
          })
        );
      } else {
        if (data.status === "UNAUTHORIZED") {
          setIsAuthModalOpen(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      fetchSearchedProducts(searchQuery, option);
    }
  }, [searchQuery, option]);

  return (
    <>
      {isAddProductModalOpen && (
        <NewProduct
          setIsModalOpen={setIsAddProductModalOpen}
          newProductAdded={productsChanged}
          setNewProductAdded={setProductsChanged}
        />
      )}
      {isModalOpen && (
        <ProductDetails
          setIsModalOpen={setIsModalOpen}
          selectedProductId={selectedProductId}
          productsChanged={productsChanged}
          setProductsChanged={setProductsChanged}
        />
      )}

      <div className="flex flex-col h-full w-full">
        <Header />

        <div className="flex flex-col w-full gap-3 px-16 py-11">
          <div className="flex flex-row justify-between w-full">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setOption={setOption}
              options={options}
            />
            <div className="flex flex-row h-12 gap-5">
              <button className="" onClick={() => handleDelete(rowsSelected)}>
                <DeleteIcon />
              </button>
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="flex flex-row items-center gap-2 bg-black text-white max-w-fit font-semibold px-4 py-2 rounded-lg"
              >
                <AddIcon /> New product
              </button>
            </div>
          </div>

          {searchQuery == ""
            ? products.length != 0 && (
                <Table
                  className="table"
                  columns={productColumns}
                  rows={products}
                  cellName="id"
                  identifyRoute="id"
                  onRowSelection={setRowsSelected}
                  setModalState={setIsModalOpen}
                  setSelectedProductId={setSelectedProductId}
                  paginationModel={paginationModel}
                  onPaginationModelChange={(paginationModel: any) =>
                    setPaginationModel(paginationModel)
                  }
                />
              )
            : searchedProducts.length != 0 && (
                <Table
                  className="table"
                  columns={productColumns}
                  rows={searchedProducts}
                  cellName="id"
                  identifyRoute="id"
                  onRowSelection={setRowsSelected}
                  setModalState={setIsModalOpen}
                  setSelectedProductId={setSelectedProductId}
                />
              )}
        </div>
      </div>
    </>
  );
}
