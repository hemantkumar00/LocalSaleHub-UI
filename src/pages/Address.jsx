/** @format */
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { isAuthenticated, isUser } from "../helpers/user";
import { getCart, postOrder, setAddress } from "../helpers/userShop";
import Input from "../components/Input";
import Payment from "../components/Payment";

const Address = () => {
  const user = isUser() && isUser().result;
  const token = isAuthenticated && isAuthenticated().token;

  //states
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState({
    phoneNo: "",
    street: "",
    locality: "",
    aptName: "",
    zip: "",
    lat: "12345",
    lng: "12345",
    formattedAddress: "Aabhi kuch bhi chala ga",
  });
  const [check, setCheck] = useState(false);
  const [clicked, setClicked] = useState("COD");

  const setclickedValue = (value) => {
    setClicked(value);
    console.log(clicked);
  };

  //preload
  const preload = () => {
    if (isUser().result.account.role === "ROLE_USER") {
      getCart(token).then((info) => {
        setProducts(info);
      });
    }
  };

  //handling clicks and radio
  const handleClick = () => {
    check === true ? setCheck(false) : setCheck(true);
  };

  const handleChange = (name) => (event) => {
    setItem({ ...item, [name]: event.target.value });
  };

  //submit button
  const onSubmit = () => {
    if (check === false)
      setAddress(item, token)
        .then((data) => {
          console.log(data);
          setItem({
            ...item,
            phoneNo: "",
            street: "",
            locality: "",
            aptName: "",
            zip: "",
            lat: "12345",
            lng: "12345",
            formattedAddress: "Aabhi kuch bhi chala ga",
          });
        })
        .catch((error) => console.log("Error in adding address ", error));
    else {
      setAddress(
        {
          phoneNo: user.address.phoneNo,
          street: user.address.street,
          locality: user.address.locality,
          aptName: user.address.aptName,
          zip: user.address.zip,
          lat: user.address.lat,
          lng: user.address.lng,
          formattedAddress: user.formattedAddress,
        },
        token,
      )
        .then((data) => {
          console.log(data);
          setItem({
            ...item,
            phoneNo: "",
            street: "",
            locality: "",
            aptName: "",
            zip: "",
            lat: "12345",
            lng: "12345",
            formattedAddress: "Aabhi kuch bhi chala ga",
          });
        })
        .catch((error) => console.log("Error in adding address ", error));
    }
  };

  const onSubmitAddress = (pay) => {
    postOrder(token, { payment: pay }).then((data) => {
      console.log(data);
    });
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
      <div className="col-10 ">
        <h1 className=" card-subtitle m-4 text-muted">Delevery Address</h1>
        <div className="row ">
          <div className="my-4 col-xl-7 col-lg-7 col-md-12 col-sm-12 col-xs-12 mx-auto">
            {user.address ? (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  onChange={() => handleClick()}
                />
                <label className="form-check-label" for="flexCheckChecked">
                  {user.formattedAddress}
                </label>
              </div>
            ) : null}

            <div className="row">
              <div className=" form-group  mx-auto col-6 ">
                <Input
                  name={"Street"}
                  type={"text"}
                  change={handleChange("street")}
                />
              </div>
              <div className="col-6 form-group  mx-auto ">
                <Input
                  name={"AptName"}
                  type={"text"}
                  change={handleChange("aptName")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 form-group  mx-auto ">
                <Input
                  name={"Locality"}
                  type={"text"}
                  change={handleChange("locality")}
                />
              </div>
              <div className="col-6 form-group  mx-auto ">
                <Input
                  name={"Zip Code"}
                  type={"text"}
                  change={handleChange("zip")}
                />
              </div>
            </div>
            <div className="col-6 form-group   ">
              <Input
                name={"Phone No."}
                type={"text"}
                change={handleChange("phoneNo")}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 mx-auto  ">
            <div className="card my-4" style={{ width: "25rem" }}>
              <div className="card-body">
                <h5 className="card-title">Total Amount</h5>
                <br />
                {products.cart?.map((object, i) => (
                  <p className="card-subtitle mb-3 text-muted">
                    {object.itemId.title} : (price x quantity){" "}
                    {object.itemId.price}₹ x {object.quantity}
                  </p>
                ))}

                <hr />
                <h5 className=" card-subtitle mb-4 text-muted">
                  Grand Total: {products.totalPrice} ₹
                </h5>
                <div>
                  <input
                    type="radio"
                    value="Male"
                    name="gender"
                    onClick={() => setclickedValue("COD")}
                  />
                  Cash on Delevery
                  <br />
                  <input
                    type="radio"
                    value="Female"
                    name="gender"
                    onClick={() => setclickedValue("Braintree")}
                  />
                  BrainTree Payment
                  <br />
                </div>
                <br />
                {clicked === "COD" ? (
                  <Link
                    className=" btn btn-warning text-secondary "
                    style={{ width: "100%" }}
                    to="/orders"
                    onClick={
                      (() => {
                        onSubmit(false);
                      },
                      onSubmitAddress)
                    }
                  >
                    Place Order
                  </Link>
                ) : (
                  <Payment
                    submit={onSubmit}
                    submitAddress={onSubmitAddress}
                    price={products.totalPrice}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Address;
