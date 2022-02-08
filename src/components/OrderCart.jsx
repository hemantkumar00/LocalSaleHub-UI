import { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, isUser } from "../helpers/user";
import { statusUpdate } from "../helpers/userShop";

const OrderCart = (props) => {
  const token = isAuthenticated && isAuthenticated().token;

  var status =
    props.status === "Placed"
      ? "Accept"
      : props.status === "Accepted"
      ? "Complete"
      : props.status === "Completed"
      ? "Delever"
      : null;

  var updateStatus =
    props.status === "Placed"
      ? "Accepted"
      : props.status === "Accepted"
      ? "Completed"
      : props.status === "Completed"
      ? "Out For Delivery"
      : null;

  const [statu, setStatus] = useState({
    status: "",
  });

  const onClick = (id) => {
    // console.log(statu);
    statusUpdate(token, id, statu).then((info) => {
      console.log(info);
    });
  };

  var total = 0;
  return (
    <div>
      <div className="card " style={{ width: "25rem" }}>
        <div className="card-body ">
          <h6 className="card-subtitle mb-3 text-muted">Id:-{props.id}</h6>
          <h6 className="card-subtitle mb-3 text-muted">
            SellerId:-{props.sellerId}
          </h6>
          <h5 className="card-title mb-3">
            {props.user} ordered from {props.seller}
          </h5>
          <h6 className="card-subtitle mb-3 text-muted">
            Call:- +91-{props.phoneNo}
          </h6>
          <h6 className="card-subtitle mb-3 text-muted">
            Address:- {props.address}
          </h6>
          <div className="bg-light " style={{ borderRadius: "5%" }}>
            <div className="mx-4">
              <h6>Ordered Items</h6>
              <hr />
              {/* TODO: do loop for multiple items */}

              {props.item?.map((object, i) => {
                var price =
                  parseInt(object.item.price) + parseInt(object.quantity);
                total = total + price;
                return (
                  <p>
                    {object.item.title} detail Price:- {price}₹
                  </p>
                );
              })}
              <hr />
              <h5 className=" card-subtitle mb-4 text-muted">
                Grand Total: {total}.00
              </h5>
            </div>
          </div>
          <p className="card-text">Ordered -a few second ago</p>
          <p className="my-3">
            <span
              style={{
                height: "15px",
                width: "15px",
                backgroundColor: "#bbb",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />{" "}
            {props.status}
          </p>
          <div className="row">
            <div className="col-6">
              {props.status === "Placed" ? (
                <Link
                  className=" btn  text-white "
                  to="/orders"
                  style={{ width: "100%", backgroundColor: "#F70000" }}
                  onClick={() => {
                    setStatus({ ...statu, status: "Cancelled" });
                    onClick(props.id);
                    props.function();
                  }}
                >
                  Cancel order
                </Link>
              ) : null}
            </div>
            <div className="col-6">
              {props.status === "Out For Delivery" ? (
                <p>Order is full filled</p>
              ) : props.status === "Cancelled" ? (
                <p>Order cancelled</p>
              ) : isUser().result.account.role === "ROLE_SELLER" ? (
                <Link
                  className=" btn text-white "
                  to="/orders"
                  style={{ width: "100%", backgroundColor: "green" }}
                  onClick={() => {
                    setStatus({ ...statu, status: updateStatus });
                    onClick(props.id);
                    props.function();
                  }}
                >
                  {status} order
                </Link>
              ) : null}
            </div>
            {props.payment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCart;
