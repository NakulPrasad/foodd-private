interface props {
  index: number;
  order: any;
}

const OrderCard = ({ order, index }: props) => {
  // console.log(order);
  //   debugger;
  return (
    <>
      {order?.Order_date ? (
        <div className="m-auto mt-5" key={index}>
          {order.Order_date}
          <hr />
        </div>
      ) : (
        <div className="col col-md-6 col-lg-3" key={index}>
          <div
            className="card mt-3"
            style={{
              width: "18rem",
              maxHeight: "360px",
            }}
          >
            <img
              src={order.img}
              className="card-img-top"
              alt="..."
              style={{
                height: "120px",
                objectFit: "fill",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{order.name}</h5>
              <div className="container w-100 p-0" style={{ height: "38px" }}>
                <span className="m-1">Qty : {order.qty}</span>
                <span className="m-1">Size : {order.size}</span>
                <div className=" d-inline ms-2 h-100 w-20 fs-5 text-success">
                  ₹{order.price}/-
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
