import { NavLink } from "react-router-dom";
import { Cart3, Chat } from "react-bootstrap-icons";
import { isAuthenticated, isUser, noUser } from "../helpers/user";

const Navbar = () => {
  const name = isUser() && isUser().result.firstName;
  const role = isUser() && isUser().result.account.role;

  const view =
    isAuthenticated().message === "Logged-in successfully" ? false : true;
  const handleChange = () => {
    noUser();
  };

  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-10 mx-auto">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                  Multi-Vendor
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink
                        to="/"
                        activeclassname="menu_active"
                        className="nav-link "
                        aria-current="page"
                      >
                        Hello, {name}
                      </NavLink>
                    </li>
                    {isUser() && (
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/orders">
                          Orders
                        </NavLink>
                      </li>
                    )}
                    {role === "ROLE_SELLER" ? (
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/shop">
                          Shop
                        </NavLink>
                      </li>
                    ) : (
                      ""
                    )}

                    {role === "ROLE_USER" ? (
                      <li className="nav-item">
                        <NavLink className="nav-link " to="/cart">
                          <Cart3 />
                        </NavLink>
                      </li>
                    ) : (
                      ""
                    )}

                    {view ? (
                      <>
                        <li className="nav-item">
                          <NavLink className="nav-link " to="/log-in">
                            Sign In
                          </NavLink>
                        </li>
                        <li className="nav-item mx-2">
                          <NavLink
                            className="nav-link btn btn-outline-primary "
                            to="/sign-up"
                          >
                            Sign Up
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <li className="nav-item mx-2">
                        <NavLink
                          className="nav-link btn btn-outline-primary "
                          to="/"
                          onClick={handleChange}
                        >
                          Log Out
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
