import { useEffect, useState } from "react";
import URLs from "../../configs/URLs";
import useFetchData from "../../hooks/useFetchData";
import OrderCard from "../../components/OrderCard/OrderCard";

interface orderResponseInterface {
  orderData: OrderData;
}
export type OrderEntry = (orderDate | order)[];

interface OrderData {
  _id: string;
  email: string;
  order_data: OrderEntry[];
  img: any[];
  __v: number;
}
export interface orderDate {
  Order_date: string;
}

export interface order {
  id: string;
  name: string;
  qty: number;
  size: string;
  price: number;
  img: string;
  Order_date?: string;
}

export default function MyOrder() {
  const [orderData, setOrderData] = useState<OrderEntry[] | null>(null);
  const [orderResponse, isOrderLoading] = useFetchData<orderResponseInterface>(
    URLs.getOrders
  );

  const fetchMyOrder = () => {
    if (!isOrderLoading && orderResponse) {
      setOrderData(orderResponse?.orderData?.order_data);
      console.log(orderResponse);
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
              return <OrderCard order={item} index={index} />;
            });
          })}
      </div>
    </div>
  );
}
