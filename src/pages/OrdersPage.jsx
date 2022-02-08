import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Footer from "../components/Footer";
import OrderCart from "../components/OrderCart";
import { isAuthenticated, isUser } from "../helpers/user";
import { getOrders, socketStatusUpdate } from "../helpers/userShop";

const ENDPOINT = "http://localhost:8000";
var socket;
const OrderPage = () => {
  const token = isAuthenticated && isAuthenticated().token;
  //TODO: socket.io ko use karna pda ga yaha

  var [orders, setOrders] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  var [order, setOrder] = useState();
  const preload = () => {
    if (isUser()) {
      getOrders(token).then((info) => {
        setOrders(info.orders);
      });
    }
  };

  useEffect(() => {
    preload();
    socket = io(ENDPOINT);
    socket.emit("add-user", { userId: isUser().result._id });
    socket.on("connection", () => setSocketConnected(true));
    socket.on("orders", (data) => {
      if (data.action === "update") {
        setOrder(data.order);
      }
      if (data.action === "create") {
        getOrders(token).then((info) => {
          setOrders(info.orders);
        });
      }
    });
    // this is preload function
  }, []);

  return (
    <div
      className="row justify-content-md-center "
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingBottom: "15rem",
      }}
    >
      <div className="col-10">
        <h1 className=" card-subtitle mt-4 text-muted m-4">Summery</h1>
        <div className="row ">
          {orders?.map((object, i) => {
            return (
              <>
                {order !== undefined && order._id === object._id ? (
                  <div className="col-xl-3 col-lg-5 col-md-5 col-sm-12 col-xs-12 mx-auto ms-4 m-4">
                    <OrderCart
                      id={order._id}
                      sellerId={order.seller.sellerId}
                      seller={order.seller.name}
                      phoneNo={order.seller.phone}
                      address={order.user.address.street}
                      item={order.items}
                      status={order.status}
                      user={order.user.name}
                      function={preload}
                      payment={order.payment}
                    />
                  </div>
                ) : (
                  <div className="col-xl-3 col-lg-5 col-md-5 col-sm-12 col-xs-12 mx-auto ms-4 m-4">
                    <OrderCart
                      id={object._id}
                      sellerId={object.seller.sellerId}
                      seller={object.seller.name}
                      phoneNo={object.seller.phone}
                      address={object.user.address.street}
                      item={object.items}
                      status={object.status}
                      user={object.user.name}
                      function={preload}
                      payment={object.payment}
                    />
                  </div>
                )}
                {console.log(object.items)}
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;
