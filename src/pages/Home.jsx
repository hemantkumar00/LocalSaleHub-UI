import React, { useEffect, useState } from "react";
import Image from "../components/Image";
import ShopCard from "../components/ShopCard";
import Photo from "../Images/3971330.jpg";
import { Search } from "react-bootstrap-icons";
import { getShops } from "../helpers/userShop";
import Footer from "../components/Footer";

const Home = () => {
  const [shop, setShop] = useState([]);
  const Preload = () => {
    getShops().then((shop) => {
      setShop(shop.shops);
    });
    console.log(shop);
  };

  useEffect(() => {
    Preload(); // this is preload function
  }, []);

  return (
    <>
      <div
        className="container-fluid nav_bg"
        style={{
          position: "relative",
          minHeight: "100vh",
          paddingBottom: "15rem",
        }}
      >
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row m-4">
              <div className=" col-6">
                <h1 className="my-5">Multi-Vendor</h1>
                <h4 className="my-5 text-secondary">
                  This application is all about <br /> buying products from your
                  local shop-kipper
                  <br /> wothout going to him
                </h4>
                <p className="text-secondary">Our contact details:-</p>
                <p className="text-secondary">
                  +91 999-999-9999
                  <br />
                  admin@multi-vendor.com
                </p>
              </div>
              <div className="col-5">
                <Image src={Photo} />
              </div>
            </div>

            <div className="input-group rounded me-4">
              <span className="input-group-text border-0" id="search-addon">
                <Search />
              </span>
              <input
                type="search"
                className="form-control me-4"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
            </div>

            <div className="row">
              {shop !== undefined ? (
                shop.map(function (object, i) {
                  return (
                    <ShopCard
                      key={i}
                      name={object.name}
                      min={object.minOrderAmount}
                      cost={object.costForOne}
                      image={object.imageUrl}
                      pay={object.payment}
                      redirect={`/shop/${object._id}`}
                    />
                  );
                })
              ) : (
                <p>There is no shop yet</p>
              )}
            </div>
            <p className="my-5 text-secondary m-5">This is it Thanks</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
