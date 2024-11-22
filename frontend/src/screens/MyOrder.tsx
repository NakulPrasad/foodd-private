import React, { useEffect, useState, useCallback } from "react";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar";
import URLs from "../configs/URLs.ts";
import useFetchData from "../hooks/useFetchData";
import usePostData from "../hooks/usePostData";
import OrderCard from "../components/OrderCard/OrderCard";

interface orderDataInterface {
  orderData: order[];
}

interface order {
  email: string;
  order_data: [];
}

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);
  const [orderResponse, isOrderLoading] = useFetchData<orderDataInterface>(
    URLs.getOrders
  );

  const fetchMyOrder = () => {
    if (!isOrderLoading && orderResponse) {
      setOrderData(orderResponse.orderData.order_data);
      console.log(orderData);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, [isOrderLoading, orderResponse]);

  return (
    <div className="container">
      <div className="row">
        {!orderData && (
          <h1 className="display-5 fw-bold px-4 py-5 my-5 text-center">
            You haven't order before
          </h1>
        )}
        {orderData &&
          orderData.map((order) => {
            return order.map((item, index) => {
              // debugger;
              // console.log(item);
              return <OrderCard key={index} item={item} />;
            });
          })}
      </div>
    </div>
  );
}
