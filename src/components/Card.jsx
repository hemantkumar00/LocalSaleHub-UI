import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { deleteItem } from "../helpers/item";
import { isAuthenticated, isUser } from "../helpers/user";
import { postCart } from "../helpers/userShop";

//TODO: Deletion of item is also done hare only

const Card = (props) => {
  var image = props.img.split("\\");
  var finalpicture = `http://localhost:8000/api/${image[0]}/${image[1]}`;

  const token = isAuthenticated && isAuthenticated().token;

  const onDelete = (itemId) => {
    deleteItem(itemId, token).then((data) => console.log(data));
  };
  const refreshPage = () => {
    window.location.reload(false);
  };

  const onAdd = (itemId) => {
    if (!isUser()) {
      alert("Plz log in with us to add products in your cart");
    }
    if (isUser() && isUser().result.account.role === "ROLE_USER") {
      postCart(token, itemId).then((data) => console.log(data));
    }
  };

  return (
    <>
      <div className="card m-5" style={{ width: "18rem" }}>
        <img
          src={finalpicture}
          className="card-img-top"
          alt="..."
          style={{
            width: "18rem",
            height: "11rem",
            borderRadius: "0.5rem",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.price}₹</p>
          <small className="card-text">{props.tags}</small>
          <br />
          <small className="card-text">{props.description}</small>
          <div className="row">
            {isUser() && isUser().result.account.role === "ROLE_SELLER" ? (
              <>
                <div className="col-2">
                  <NavLink to={props.update}>
                    <PencilFill style={{ color: "green", fontSize: "20px" }} />
                  </NavLink>
                </div>
                <div className="col-2">
                  <NavLink
                    to="/shop"
                    onClick={() => {
                      onDelete(props.id);
                    }}
                  >
                    <TrashFill style={{ color: "red", fontSize: "20px" }} />
                  </NavLink>
                </div>
              </>
            ) : (
              <div className="col-8">
                <NavLink
                  to=""
                  onClick={() => {
                    onAdd(props.id);
                  }}
                  className="btn btn-primary"
                >
                  Add To Cart
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
