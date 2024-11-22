import React from "react";

const OrderCard = ({ key, item }) => {
  console.log(item);
  //   debugger;
  return (
    <div key={key}>
      {item.Order_date ? (
        <div className="m-auto mt-5">
          {item.Order_date}
          <hr />
        </div>
      ) : (
        <div className="col-12 col-md-6 col-lg-3">
          <div
            className="card mt-3"
            style={{
              width: "18rem",
              maxHeight: "360px",
            }}
          >
            <img
              src={item.img}
              className="card-img-top"
              alt="..."
              style={{
                height: "120px",
                objectFit: "fill",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <div className="container w-100 p-0" style={{ height: "38px" }}>
                <span className="m-1">Qty : {item.qty}</span>
                <span className="m-1">Size : {item.size}</span>
                <div className=" d-inline ms-2 h-100 w-20 fs-5 text-success">
                  ₹{item.price}/-
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
