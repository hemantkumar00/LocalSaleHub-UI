/** @format */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CartPCard from "../components/CardPCart";
import Footer from "../components/Footer";
import { isAuthenticated, isUser } from "../helpers/user";
import { getCart } from "../helpers/userShop";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const token = isAuthenticated && isAuthenticated().token;
  const preload = () => {
    if (isUser().result.account.role === "ROLE_USER") {
      getCart(token).then((info) => {
        setProducts(info);
      });
    }
  };

  useEffect(() => {
    preload();
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
        <div className="row">
          <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-xs-12 mx-auto m-5">
            <p>Recomended to refresh once before posting your order</p>
            {products.cart?.map((object, i) => {
              return (
                <>
                  <CartPCard
                    key={i}
                    id={object.itemId._id}
                    img={object.itemId.imageUrl}
                    name={object.itemId.title}
                    price={object.itemId.price}
                    quantity={object.quantity}
                    description={object.itemId.description}
                    function={preload}
                  />
                </>
              );
            })}
          </div>
          <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-xs-12 mx-auto  m-5">
            {/* Price tag card we are useing it once so I am creating it hear only */}
            <div className="card my-4" style={{ width: "25rem" }}>
              <div className="card-body">
                <h5 className="card-title">Total Amount</h5>
                <br />
                <p className="card-subtitle mb-4 text-muted">
                  You will resive your order safely dont worry
                </p>
                <h6 className=" card-subtitle mb-4 text-muted">
                  Subtotal (1 item): {products.totalPrice}
                </h6>

                <NavLink
                  className=" btn btn-warning text-secondary "
                  to="/address"
                  style={{ width: "100%" }}
                >
                  Procede to check out
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
