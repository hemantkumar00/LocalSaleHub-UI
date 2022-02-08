import { ArchiveFill } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { isAuthenticated, isUser } from "../helpers/user";
import { deleteCart, postCart, removeCart } from "../helpers/userShop";

const CartPCard = (props) => {
  var image = props.img.split("\\");
  var finalpicture = `http://localhost:8000/api/${image[0]}/${image[1]}`;

  const total = parseInt(props.quantity) * parseInt(props.price);
  const token = isAuthenticated && isAuthenticated().token;

  const onAdd = (itemId) => {
    if (isUser() && isUser().result.account.role === "ROLE_USER") {
      postCart(token, itemId).then((data) => console.log(data));
    } else {
    }
  };

  const onRemove = (itemId) => {
    if (isUser() && isUser().result.account.role === "ROLE_USER") {
      removeCart(token, itemId).then((data) => console.log(data));
    }
  };

  const onDelete = (itemId) => {
    if (isUser() && isUser().result.account.role === "ROLE_USER") {
      deleteCart(token, itemId).then((data) => console.log(data));
    }
  };

  return (
    <div className="card my-4" style={{ width: "50rem" }}>
      <div className="row">
        <div className="col-4">
          <img
            className="card-img-top"
            src={finalpicture}
            alt=""
            style={{
              width: "18rem",
              height: "11rem",
              borderRadius: "0.5rem",
            }}
          />
        </div>
        <div className="card-body col-8">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            {props.description}
            <br />
            Price: {props.price}₹ x {props.quantity}
          </p>
          <div
            className="row justify-content-between "
            style={{ marginBottom: "-3%" }}
          >
            <div className="col-6 ">
              <NavLink
                to=""
                className="btn text-danger mx-1"
                onClick={() => {
                  onRemove(props.id);
                  props.function();
                }}
              >
                <h3>-</h3>
              </NavLink>
              <NavLink
                to=""
                className="btn text-success mx-1"
                onClick={() => {
                  onAdd(props.id);
                  props.function();
                }}
              >
                <h3>+</h3>
              </NavLink>
              <NavLink
                to=""
                className="btn text-danger mx-1 "
                onClick={() => {
                  onDelete(props.id);
                  props.function();
                }}
              >
                <ArchiveFill />
              </NavLink>
            </div>
            <div className="col-6">
              <p>Total Price {total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPCard;
