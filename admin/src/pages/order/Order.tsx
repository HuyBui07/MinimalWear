import { useState, useEffect } from "react";

//pages and components
import Table from "../../components/Table";
import StatusContainer from "../../components/StatusContainer";
import Header from "../../components/layouts/Header";
import InfoOrder from "./OrderDetails";
import SearchBar from "../../components/SearchBar";
import { ClipLoader } from "react-spinners";

// utils
import { formatPrice } from "../../utills";
import { API_CONST } from "../../constants";

type SaleOrder = {
  id: string;
  customerPhone: string;
  customerEmail: string;
  total: number;
  date: string;
  status: string;
};

function SaleOrdersPage(props: any) {
  const setIsAuthModalOpen = props.setIsAuthModalOpen;

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
    total: 0,
  });

  const handleSearch = async () => {};

  const statusOptions = [
    "PENDING",
    "PROCESSING",
    "DELIVERING",
    "COMPLETED",
    "CANCELLED",
  ];

  const [saleOrders, setSaleOrders] = useState<SaleOrder[]>([]);

  //get all sale orders
  const [ordersChanged, setOrdersChanged] = useState(false);

  const [isCompletedIncluded, setIsCompletedIncluded] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSaleOrders = async (
    page: number,
    size: number,
    isCompletedIncluded: boolean
  ) => {
    setSaleOrders([]);
    setLoading(true);
    try {
      const response = await fetch(
        API_CONST +
          `/order/get-all-admin?page=${
            page + 1
          }&size=${size}&isCompletedIncluded=${isCompletedIncluded}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSaleOrders(data.data);
        setPaginationModel({
          ...paginationModel,
          total: data.totalOrder,
        });
        setLoading(false);
      } else {
        if (data.status === "UNAUTHORIZED") {
          setIsAuthModalOpen(true);
          setLoading(false);
        }
      }
    } catch (error: any) {
      if (error.status === "UNAUTHORIZED") {
        setIsAuthModalOpen(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("fetching orders");
    fetchSaleOrders(
      paginationModel.page,
      paginationModel.pageSize,
      isCompletedIncluded
    );
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    ordersChanged,
    isCompletedIncluded,
  ]);

  const productColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      headerClassName: "bg-gray-100 hover:cursor-pointer",
    },
    {
      field: "customerPhone",
      headerName: "Customer's phone",
      flex: 0.3,
      headerClassName: "bg-gray-100",
    },
    {
      field: "customerEmail",
      headerName: "Customer's email",
      headerClassName: "bg-gray-100",
      flex: 0.3,
    },
    {
      field: "total",
      headerName: "Total",
      flex: 0.3,
      headerClassName: "bg-gray-100",
      valueGetter: (params: any) => formatPrice(params),
    },
    {
      field: "date",
      headerName: "Date",
      headerClassName: "bg-gray-100",
      flex: 0.2,
      valueGetter: (params: any) => {
        const date = new Date(params);
        return date.toLocaleDateString();
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.35,
      headerClassName: "bg-gray-100",
      renderCell: (params: any) => <StatusContainer status={params.value} />,
    },
  ];

  const [option, setOption] = useState("id");
  const [searchedOrders, setSearchedOrders] = useState<SaleOrder[]>([]);

  const options = [
    { value: "id", label: "ID" },
    { value: "phone", label: "Phone" },
    { value: "email", label: "Email" },
  ];



  const fetchSearchedOrders = async (
    searchQuery: string,
    option: string,
    isCompletedIncluded: boolean
  ) => {
    setSearchedOrders([]);
    setLoading(true);
    try {
      const response = await fetch(
        API_CONST +
          `/order/search?searchQuery=${searchQuery}&option=${option}&isCompletedIncluded=${isCompletedIncluded}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSearchedOrders(data.data);
        setLoading(false);
      } else {
        if (data.status === "UNAUTHORIZED") {
          setIsAuthModalOpen(true);
          setLoading(false);
        }
      }
    } catch (error: any) {
      if (error.status === "UNAUTHORIZED") {
        setIsAuthModalOpen(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      fetchSearchedOrders(searchQuery, option, isCompletedIncluded);
    }
  }, [searchQuery, option, isCompletedIncluded]);

  return (
    <>
      {isModalOpen && (
        <InfoOrder
          setIsModalOpen={setIsModalOpen}
          selectedOrderId={selectedOrderId}
          ordersChanged={ordersChanged}
          setOrdersChanged={setOrdersChanged}
        />
      )}
      <div className="flex flex-col h-full w-full overflow-y-auto">
        <Header />
        <div className="flex flex-col w-full gap-3 px-16 py-11">
          <div className="w-full flex flex-row">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setOption={setOption}
              options={options}
            />
            <div className="flex flex-row gap-2 items-center ml-5">
              <input
                type="checkbox"
                className="h-4 w-4"
                onClick={() => setIsCompletedIncluded(!isCompletedIncluded)}
              />
              <p className="text-gray-400">Exlude Completed Orders</p>
            </div>
          </div>
          {loading && (
            <ClipLoader
              className="m-auto mt-48"
              color="#000"
              loading={loading}
              size={100}
            />
          )}
          {searchQuery == ""
            ? saleOrders.length != 0 && (
                <Table
                  className="table"
                  columns={productColumns}
                  rows={saleOrders}
                  cellName="id"
                  identifyRoute="id"
                  setModalState={setIsModalOpen}
                  setSelectedProductId={setSelectedOrderId}
                  noCheckboxSelection
                  paginationModel={paginationModel}
                  onPaginationModelChange={(paginationModel: any) =>
                    setPaginationModel(paginationModel)
                  }
                />
              )
            : searchedOrders.length != 0 && (
                <Table
                  className="table"
                  columns={productColumns}
                  rows={searchedOrders}
                  cellName="id"
                  identifyRoute="id"
                  setModalState={setIsModalOpen}
                  setSelectedProductId={setSelectedOrderId}
                  noCheckboxSelection
                />
              )}
        </div>
      </div>
    </>
  );
}

export default SaleOrdersPage;
