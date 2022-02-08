import Photo from "../Images/Wavy_Bus-26_Single-01.jpg";
import Image from "../components/Image";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../helpers/user";
import { getSingleItem, updateItem } from "../helpers/item";
import Button from "../components/Button";
import { Navigate, useParams } from "react-router-dom";

const UpdateItem = () => {
  const param = useParams();

  const token = isAuthenticated && isAuthenticated().token;
  const [values, setValues] = useState({
    title: "some",
    description: "",
    tags: "",
    imageUrl: "",
    price: "",
    formData: new FormData(),
  });

  const { title, description, tags, price, formData } = values;

  const preload = (itemId) => {
    getSingleItem(itemId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          title: data.item.title,
          description: data.item.description,
          tags: data.item.tags,
          imageUrl: data.item.imageUrl,
          price: data.item.price,
        });
        formData.set("title", title);
        formData.set("description", description);
        formData.set("tags", tags);
        formData.set("price", price);
        // formData.set("imageUrl", imageUrl);
        //TODO: Work on this
      }
    });
  };

  const performRedirect = () => {
    if (title === "") {
      return <Navigate replace to="/shop" />;
    }
  };

  const onSubmit = (event) => {
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    event.preventDefault();
    updateItem(param.itemId, token, formData).then((data) => {
      if (!data) {
        console.log(data);
        setValues({ ...values, title: "" });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
          tags: "",
          imageUrl: "",
          price: "",
          formData: "",
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value =
      name === "imageUrl" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    preload(param.itemId);
  }, []);

  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row ">
          <div className="col-10 mx-auto">
            <div className="row">
              <div className="col-6">
                <p>
                  Updating image is compulsory right know I am working on it
                  soon will be no need doing this
                </p>
                <Input
                  name={"Title"}
                  type={"text"}
                  change={handleChange("title")}
                />
                <Input
                  name={"Description"}
                  type={"text"}
                  change={handleChange("description")}
                />
                <Input
                  name={"Tags"}
                  type={"text"}
                  change={handleChange("tags")}
                />
                <Input
                  name={"Price"}
                  type={"text"}
                  change={handleChange("price")}
                />
                <div className="form-group  mx-auto my-1">
                  <label className="text-gray " for="myfile">
                    Photos
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="myfile"
                    name="myfile"
                    onChange={handleChange("imageUrl")}
                  />
                </div>
                <Button
                  name={"Update Item"}
                  click={onSubmit}
                  redirect={"/shop"}
                />
              </div>
              <div className="col-5">
                <Image src={Photo} />
              </div>
            </div>

            {performRedirect()}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateItem;
