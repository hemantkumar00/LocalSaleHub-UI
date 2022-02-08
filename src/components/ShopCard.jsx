import { Link } from "react-router-dom";

const ShopCard = (props) => {
  //TODO: image loop lagana ha aabhi yaha Will work on image loop later
  return (
    <>
      <div
        className="card m-5"
        style={{ width: "18rem", lineHeight: "1.5rem" }}
      >
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {props.image.map(function (object, i) {
              var imageUrlSplit = object.split("\\");
              var finalImageUrl = `http://localhost:8000/api/${imageUrlSplit[0]}/${imageUrlSplit[1]}`;

              return (
                <>
                  <div
                    className={
                      i === 0 ? "carousel-item active" : "carousel-item "
                    }
                  >
                    {console.log(finalImageUrl)}
                    <img
                      src={finalImageUrl}
                      className="d-block img-fluid w-100"
                      alt="..."
                      style={{
                        width: "18rem",
                        height: "11rem",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            MinOrderAmount {props.min}
            <br />
            CostForOne {props.cost}
            <br />
            Payment {props.pay[0]}
          </p>
          <Link to={props.redirect} className="btn btn-primary">
            Open
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShopCard;
