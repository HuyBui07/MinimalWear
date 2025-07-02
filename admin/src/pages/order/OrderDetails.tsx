import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//pages and components
import InformationLine from "../../components/InformationLine";
import Table from "../../components/Table";

// icons
import BackIcon from "../../assets/back.svg?react";
import Header from "../../components/layouts/Header";
import { API_CONST } from "../../constants";
import LoadingScreen from "../../components/LoadingScreen";
import { formatPrice } from "../../utills";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
};

const InfoOrder = (props: any) => {
  const setIsModalOpen = props.setIsModalOpen;
  const selectedOrderId = props.selectedOrderId;
  const ordersChanged = props.ordersChanged;
  const setOrdersChanged = props.setOrdersChanged;

  const [orderId, setOrderId] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [delivery, setDelivery] = useState("");
  const [total, setTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState("");

  const [loading, setLoading] = useState(true);

  const handleChangeStatus = async (newStatus: string) => {
    if (
      window.confirm("Are you sure to change the status of this order?") ===
      false
    )
      return;

    const response = await fetch(
      API_CONST + `/order/update-status/${selectedOrderId}?status=${newStatus}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminAccessToken"),
        },
      }
    );

    if (response.ok) {
      setOrdersChanged(!ordersChanged);
      setOrderStatus(newStatus);
    }
  };

  //get order information
  useEffect(() => {
    const fetchOrderInformation = async () => {
      setLoading(true);
      const response = await fetch(
        API_CONST + `/order/get-detail-admin/${selectedOrderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("adminAccessToken"),
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        const order = data.data;
        console.log(order);
        setOrderId(order.id);
        setCustomerPhone(order.customerPhone);
        setCustomerEmail(order.customerEmail);
        setDate(order.date);
        setProducts(order.products);
        setDelivery(order.delivery);
        setTotal(order.total);
        setOrderStatus(order.status);
        setLoading(false);
      }
    };

    fetchOrderInformation();
  }, []);

  const productColumns = [
    {
      headerName: "ID",
      field: "id",
      flex: 0.5,
      headerClassName: "cursor-pointer",
    },
    {
      headerName: "Product name",
      field: "name",
      flex: 0.7,
      renderCell: (params: any) => (
        <div className="flex flex-row items-center gap-5 h-full">
          <img className="h-10 w-10" src={params.row.image} />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      headerName: "Price",
      field: "price",
      flex: 0.4,
      valueGetter: (params: any) => formatPrice(params),
    },
    { headerName: "Quantity", field: "quantity", flex: 0.4 },
    {
      headerName: "Total",
      field: "total",
      flex: 0.4,
      valueGetter: (params: any) => formatPrice(params),
    },
  ];

  return (
    <div className="bg-gray-500 bg-opacity-30 flex flex-col justify-center items-center h-full w-full fixed top-0 left-0 z-10 ">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col w-2/3 bg-white p-8 border border-gray-500 rounded-xl overflow-y-auto my-5">
          <button
            className="flex bg-white border border-black rounded-lg hover:bg-black hover:text-white mb-5 w-fit px-10"
            onClick={() => setIsModalOpen(false)}
          >
            <BackIcon />
            <span className="ml-2 font-bold">
              Order Information
            </span>
          </button>

          <InformationLine label="Order ID:" content={orderId} />
          <InformationLine
            label="Customer's phone number:"
            content={customerPhone}
          />
          <InformationLine label="Customer's email:" content={customerEmail} />
          <InformationLine
            label="Date:"
            content={new Date(date).toLocaleDateString()}
          />
          <label className="font-bold">List of products:</label>
          {products.length !== 0 ? (
            <Table
              columns={productColumns}
              rows={products}
              noCheckboxSelection
            />
          ) : null}
          <InformationLine
            label="Delivery: "
            content={
              delivery === "standard"
                ? `Standard - ${formatPrice(30000)}`
                : `Express - ${formatPrice(50000)}`
            }
          />
          <InformationLine
            label="Total:"
            content={
              <span className="font-bold text-xl">{formatPrice(total)}</span>
            }
          />

          <div className="flex flex-row w-3/5 items-center gap-20">
            <label className="font-bold">Order status:</label>
            <select
              className={
                "rounded-2xl py-1 font-medium w-1/3 text-center text-sm " +
                (orderStatus === "pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : orderStatus === "processing"
                  ? "bg-blue-200 text-blue-800"
                  : orderStatus === "delivering"
                  ? "bg-purple-200 text-purple-800"
                  : orderStatus === "completed"
                  ? "bg-green-200 text-green-800"
                  : orderStatus === "cancelled"
                  ? "bg-red-200 text-red-800"
                  : "")
              }
              value={orderStatus}
              onChange={(event) => handleChangeStatus(event.target.value)}
              disabled={
                orderStatus === "cancelled" || orderStatus === "completed"
              }
            >
              <option value="pending" className="bg-yellow-200 text-yellow-800">
                Pending
              </option>
              <option value="processing" className="bg-blue-200 text-blue-800">
                Processing
              </option>
              <option
                value="delivering"
                className="bg-purple-200 text-purple-800"
              >
                Delivering
              </option>
              <option value="completed" className="bg-green-200 text-green-800">
                Completed
              </option>
              {orderStatus === "cancelled" ? (
                <option
                  value="cancelled"
                  className="bg-red-200 text-red-800 "
                  disabled
                >
                  Cancelled
                </option>
              ) : null}

              {/* Add more options for other statuses if necessary */}
            </select>
          </div>

        
        </div>
      )}
    </div>
  );
};

export default InfoOrder;
