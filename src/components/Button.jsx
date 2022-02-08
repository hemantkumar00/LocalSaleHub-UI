import { NavLink } from "react-router-dom";

const Button = (props) => {
  return (
    <>
      <div className="d-grid gap-2 col-6 mx-auto p-4">
        <NavLink
          className="btn btn-primary btn-block rounded-3"
          onClick={props.click}
          to={props.redirect}
        >
          {props.name}
        </NavLink>
      </div>
    </>
  );
};

export default Button;
