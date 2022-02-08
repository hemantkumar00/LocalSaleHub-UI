import { useState } from "react";
import { NavLink } from "react-router-dom";
import Input from "../components/Input";
import LoginImg from "../Images/2853458.jpg";
import Button from "../components/Button";
import Image from "../components/Image";
import { signup } from "../helpers/user";

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ROLE_USER",
    error: "",
    success: false,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
    error,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ firstName, lastName, email, password, confirmPassword, role })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((error) => console.log("Error in sign up form"));
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-primary col-md-6 offset-sm-3 text-left"
        style={{ display: success ? "" : "none" }}
      >
        Congratulations You are registered with our website. Have you confirmed
        your e-mail verification if yes then click
        <NavLink to="/signin"> Here</NavLink> to log
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger col-md-6 offset-sm-3 text-left"
        style={{ display: error ? "" : "none" }}
      >
        {error}
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
                {successMessage()}
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mx-auto ms-4">
                <div className="row">
                  <div className="col-6">
                    <Input
                      name={"F_Name"}
                      type={"text"}
                      change={handleChange("firstName")}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      name={"L_Name"}
                      type={"text"}
                      change={handleChange("lastName")}
                    />
                  </div>
                </div>
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
                <Input
                  name={"C_Password"}
                  type={"text"}
                  change={handleChange("confirmPassword")}
                />
                <small>
                  have an account ? sign in <NavLink to="/log-in">here</NavLink>
                </small>
                <Button
                  name={"Sign up"}
                  click={onSubmit}
                  redirect={"/signin"}
                />
              </div>
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 mx-auto me-4 column-to-hide">
                <Image src={LoginImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
