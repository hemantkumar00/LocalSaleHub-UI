import { useRef } from "react";
import { Search } from "react-bootstrap-icons";
import Button from "../components/Button";
import Card from "../components/Card";
import Image from "../components/Image";
import { isUser } from "../helpers/user";
import Footer from "./Footer";

const Shop = (props) => {
  const inputEl = useRef("");
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

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
        <div className="row ">
          <div className="col-10 mx-auto">
            <div className="row">
              <div className=" m-4 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 mx-auto ms-4">
                <h1>{props.name}</h1>
                <small>+91-{props.number}</small>
                <p className="mt-4">
                  <strong>{props.address}</strong>
                </p>
                <p>MinOrderAmount:- {props.minOdAt}₹</p>
                <p>CostForOne:- {props.cost41}₹</p>
                <p>Payment:- {props.pay}</p>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mx-auto ms-4">
                <Image src={props.image} />
              </div>
            </div>
            <div className="m-4">
              <div className="input-group rounded me-4">
                <span className="input-group-text border-0" id="search-addon">
                  <Search />
                </span>
                <input
                  ref={inputEl}
                  type="search"
                  className="form-control me-4"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={props.term}
                  onChange={getSearchTerm}
                />
              </div>
              {isUser() && isUser().result.account.role === "ROLE_SELLER" ? (
                <Button
                  click={""}
                  redirect={"/create-item"}
                  name={"Add Items"}
                />
              ) : (
                ""
              )}
            </div>
            {/* TODO: create a card for this */}
            <div className="row ">
              {props.products !== undefined && props.products.length > 0 ? (
                props.products.map(function (object, i) {
                  return (
                    <Card
                      key={i}
                      title={object.title}
                      description={object.description}
                      tags={object.tags}
                      img={object.imageUrl}
                      price={object.price}
                      update={`/update-item/${object._id}`}
                      id={object._id}
                    />
                  );
                })
              ) : (
                <p>Sorry no products reloaded or .Have no products</p>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Shop;
