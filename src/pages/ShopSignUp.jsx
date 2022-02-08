import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Image from "../components/Image";
import Input from "../components/Input";
import { shopSignup } from "../helpers/shop";
import LoginImg from "../Images/513049-PI7TL5-636.jpg";

const ShopSignUp = () => {
  const [value, setValue] = useState({
    email: "",
    password: "1237890",
    confirmPassword: "1234567890",
    role: "ROLE_SELLER",
    name: "hemant",
    tags: "hello",
    imageUrl: [],
    minOrderAmount: "",
    costForOne: "",
    payment: "",
    street: "",
    aptName: "sahdfkjsah",
    locality: "",
    zip: "",
    lat: "",
    lng: "",
    formData: "",
    phoneNo: "",
    formattedAddress: "",
  });

  const { formData } = value;

  const formdata = () => {
    setValue({ ...value, formData: new FormData() });
  };

  //TODO: Learned how to upload multiple image \/
  // const handle = (event) => {
  //   console.log(event.target.files.length);
  //   let array = [];
  //   for (let i = 0; i < event.target.files.length; i++) {
  //     formData.append("Image", event.target.files[i]);
  //   }
  //   // console.log(JSON.stringify(array));
  //   // formData.set("hello", array);
  //   for (var pair of formData.entries()) {
  //     console.log(pair[0] + ", " + pair[1]);
  //   }
  //   console.log(array);
  // };

  const handleChange = (name) => (event) => {
    const values =
      name === "imageUrl" ? event.target.files[0] : event.target.value;
    if (name === "imageUrl") {
      for (let i = 0; i < event.target.files.length; i++) {
        formData.append(name, event.target.files[i]);
      }
    } else {
      formData.set(name, values);
    }
    setValue({ ...value, [name]: values });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValue({
      ...value,
      error: "",
      loading: true,
      getRedirect: true,
    });
    formData.set("role", "ROLE_SELLER");
    formData.set("formattedAddress", "Kuch bhi chala ga mera ko");
    shopSignup(formData).then((data) => {
      if (!data) {
        setValue({ ...value });
      } else {
        setValue({
          ...value,
          email: "",
          password: "",
          confirmPassword: "",
          role: "ROLE_SELLER",
          name: "sdgaf",
          tags: "afg",
          imageUrl: "hevali1.jpg",
          minOrderAmount: "34",
          costForOne: "34",
          payment: "ag",
          street: "ags",
          aptName: "arghd",
          locality: "agas",
          zip: "456225",
          lat: "asfg",
          lng: "fd",
          phoneNo: "1234567890",
          formattedAddress: "ahrgf",
        });
      }
    });
  };
  useEffect(() => {
    formdata();
  }, []);

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row">
              <div></div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mx-auto ms-4">
                <Input
                  name={"Name"}
                  type={"text"}
                  change={handleChange("name")}
                />
                <Input
                  name={"E-Mail"}
                  type={"text"}
                  change={handleChange("email")}
                />
                <div className="row">
                  <div className="col-6">
                    <Input
                      name={"Password"}
                      type={"text"}
                      change={handleChange("password")}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      name={"C_Password"}
                      type={"text"}
                      change={handleChange("confirmPassword")}
                    />
                  </div>
                </div>
                <Input
                  name={"Tags"}
                  type={"text"}
                  change={handleChange("tags")}
                />
                <div className="form-group  mx-auto my-1">
                  <label className="text-gray " for="myfile">
                    Photos files: <small>choose atleast 3 photos</small>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="myfile"
                    name="myfile"
                    multiple
                    onChange={handleChange("imageUrl")}
                  />
                </div>

                <div className="row">
                  <div className="col-6">
                    <Input
                      name={"Street"}
                      type={"text"}
                      change={handleChange("street")}
                    />
                    <Input
                      name={"Locality"}
                      type={"text"}
                      change={handleChange("locality")}
                    />
                    <Input
                      name={"Phone No."}
                      type={"text"}
                      change={handleChange("phoneNo")}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      name={"AptName"}
                      type={"text"}
                      change={handleChange("aptName")}
                    />
                    <Input
                      name={"Zip"}
                      type={"text"}
                      change={handleChange("zip")}
                    />
                  </div>
                </div>
                <Input
                  name={"MinOrderAmount"}
                  type={"text"}
                  change={handleChange("minOrderAmount")}
                />
                <Input
                  name={"CostForOne"}
                  type={"text"}
                  change={handleChange("costForOne")}
                />
                <Input
                  name={"Payment Methods"}
                  type={"text"}
                  change={handleChange("payment")}
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

export default ShopSignUp;
