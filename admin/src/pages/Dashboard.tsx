import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Header from "../components/layouts/Header";
import InfoContainer from "../components/InfoContainer";
import StatusContainer from "../components/StatusContainer";
import Table from "../components/Table";

// icons
import Earning from "../assets/earning.svg?react";
import Order from "../assets/order.svg?react";
import Product from "../assets/product.svg?react";
import Customer from "../assets/customer.svg?react";

// Modal
import InfoOrder from "./order/OrderDetails";

// utils
import { formatPrice } from "../utills";
import { API_CONST } from "../constants";
import { ClipLoader } from "react-spinners";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
} from "recharts";
import ExportIcon from "../assets/export.svg?react";

export default function Dashboard(props: any) {
  const setIsAuthModalOpen = props.setIsAuthModalOpen;

  const navigate = useNavigate();

  // Dashboard
  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const [saleOrders, setSaleOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchSaleOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_CONST + "/user/get-dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTotalUser(data.data.totalUser);
        setTotalOrder(data.data.totalOrder);
        setTotalProduct(data.data.totalProduct);
        setTotalRevenue(data.data.totalRevenue);
        setSaleOrders(data.data.recentOrders);
        setLoading(false);
      } else {
        if (data.status === "UNAUTHORIZED") {
          setIsAuthModalOpen(true);
        }
      }
    } catch (error: any) {
      if (error.status === "UNAUTHORIZED") {
        setIsAuthModalOpen(true);
      }
    }
  };

  useEffect(() => {
    console.log("fetching orders");
    fetchSaleOrders();
  }, []);

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

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_CONST + "/report/revenue?year=2024", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setLoading(false);
        setData(data.data);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleExport = async () => {
    try {
      const response = await fetch(API_CONST + "/report/exportRevenue", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "revenue_report.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      {isModalOpen && (
        <InfoOrder
          setIsModalOpen={setIsModalOpen}
          selectedOrderId={selectedOrderId}
        />
      )}
      <div className="flex flex-col h-full w-full overflow-y-auto">
        <Header />
        {loading ? (
          <ClipLoader
            className="m-auto mt-48"
            color="#000"
            loading={loading}
            size={100}
          />
        ) : (
          <>
            <div className="relative flex flex-row w-full jusitfy-between items-center">
              <div className="px-16 py-11 flex flex-col gap-5">
                <div className="flex gap-5">
                  <InfoContainer
                    title="Earning"
                    info={totalRevenue}
                    icon={<Earning />}
                  />
                  <InfoContainer
                    title="Order"
                    info={totalOrder}
                    icon={<Order />}
                  />
                </div>

                <div className="flex gap-5">
                  <InfoContainer
                    title="Product"
                    info={totalProduct}
                    icon={<Product />}
                  />
                  <InfoContainer
                    title="Customer"
                    info={totalUser}
                    icon={<Customer />}
                  />
                </div>
              </div>

              <LineChart
                data={data}
                margin={{ left: 0, right: 0 }}
                width={500}
                height={210}
                className="mt-2"
              >
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="month">
      
                </XAxis>
                <Tooltip
                  formatter={(value, name) => [
                    `${value} Million VND`,
                    `Revenue`,
                  ]}
                  labelFormatter={(value) => `Month: ${monthNames[value - 1]}`}
                />
                <YAxis>
                  <Label
                    value="Revenue (Million VND)"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
              </LineChart>

              <button
              className="absolute right-16 top-8 border p-2 rounded-lg flex items-center gap-2"
              onClick={handleExport}
            >
              <ExportIcon />
            </button>
            </div>

            <div className="flex flex-row justify-between items-center mt-4 px-16">
              <label className="font-bold">Newest Orders</label>
              <span
                onClick={() => navigate("/order")}
                className="text-base font-medium hover:cursor-pointer hover:underline"
              >
                View All {">>>"}
              </span>
            </div>

            {saleOrders.length != 0 && (
              <div className="mx-16">
                <Table
                  columns={productColumns}
                  rows={saleOrders}
                  noCheckboxSelection
                  setModalState={setIsModalOpen}
                  setSelectedProductId={setSelectedOrderId}
                  cellName="id"
                  identifyRoute="id"
                  longNavigate
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
