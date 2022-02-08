import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import Button from "../components/Button";
import Image from "../components/Image";
import Input from "../components/Input";
import {
  authenticate,
  getLoggedInUser,
  isAuthenticated,
  login,
  noUser,
  user,
} from "../helpers/user";
import LoginImg from "../Images/login-image.png";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              didRedirect: true,
            });
          });
          const token = isAuthenticated && isAuthenticated().token;
          const valid =
            isAuthenticated &&
            isAuthenticated().message === "Logged-in successfully"
              ? true
              : false;
          if (valid) {
            getLoggedInUser(token).then((info) => {
              if (info.error) {
                setValues({ ...values, error: true });
              } else {
                user(info, () => {
                  console.log("tried");
                });
              }
            });
          } else {
            noUser();
          }
        }
      })
      .catch((error) => console.error("Error in log in form"));
  };

  // const getuser = () => {};

  // useEffect(() => {
  //   getuser();
  // }, []);
  const message = isAuthenticated().message;
  const performRedirect = () => {
    // Redirect function id not working internaly I will work on this leter
    // TODO: have to resolve this
    // if (didRedirect) {
    //   if (isUser().result.account.role === "ROLE_SELLER") {
    //     return <Navigate replace to="/shop" />;
    //   } else {
    //     return <Navigate replace to="/" />;
    //   }
    // }
    if (message === "Logged-in successfully" && didRedirect) {
      return <Navigate replace to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-primary col-md-6 offset-sm-3 text-left">
          Be patient we are authenticating...
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger col-md-6 offset-sm-3 text-left"
        style={{ display: message ? "" : "none" }}
      >
        {isAuthenticated().message}
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row">
              <div>
                {errorMessage()}
                {loadingMessage()}
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mx-auto ms-4">
                <Input
                  name={"E-Mail"}
                  type={"text"}
                  change={handleChange("email")}
                />
                <Input
                  name={"Password"}
                  type={"text"}
                  change={handleChange("password")}
                />
                <small>
                  Don't have an account ? sign in
                  <NavLink to="/sign-up">here</NavLink>
                </small>

                <Button name={"Log In"} click={onSubmit} redirect={"/"} />
              </div>
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 mx-auto me-4 column-to-hide">
                <Image src={LoginImg} />
              </div>
            </div>
            <div>{performRedirect()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
