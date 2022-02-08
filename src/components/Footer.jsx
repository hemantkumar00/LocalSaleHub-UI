/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="page-footer font-small  pt-4 "
      style={{
        backgroundColor: "#fff",
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "15rem",
      }}
    >
      <div className="row   justify-content-md-center ">
        <div className="col-9">
          <div className="container-fluid text-center  text-md-left">
            <div className="row">
              <div className="col-md-5 mt-md-0 mt-3 ">
                <h5 className="text-uppercase">REGISTER YOUR SHOP</h5>
                <p>Register Here to do Business with us with your Shop</p>
                <NavLink
                  className=" btn btn-outline-secondary col-4"
                  to="/shop-sign-up"
                >
                  Register
                </NavLink>
              </div>

              <hr className="clearfix w-100 d-md-none pb-3" />

              <div className="col-md-3 mt-md-0 mb-3">
                <h5 className="text-uppercase">Backend Technology</h5>

                <ul className="list-unstyled text-bold">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB</li>
                  <li>Socket.io</li>
                </ul>
              </div>

              <div className="col-md-3 mt-md-0 mb-3">
                <h5 className="text-uppercase">Frontend Technology</h5>

                <ul className="list-unstyled">
                  <li>React</li>
                  <li>bootstrap</li>
                  <li>FreePick</li>
                  <li>web-Socket</li>
                </ul>
              </div>
            </div>

            <div className="footer-copyright text-center py-3">
              © 2022 Copyright: Hemant Kumar
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
