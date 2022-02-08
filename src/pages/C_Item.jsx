import Photo from "../Images/Wavy_Bus-26_Single-01.jpg";
import Image from "../components/Image";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../helpers/user";
import { createItem } from "../helpers/item";
import Button from "../components/Button";
import Footer from "../components/Footer";

const Item = () => {
  const [item, setItem] = useState({
    title: "",
    description: "",
    tags: "",
    imageUrl: "",
    price: "",
    formData: "",
  });

  const { formData } = item;

  const formdata = () => {
    setItem({ ...item, formData: new FormData() });
  };

  const token = isAuthenticated && isAuthenticated().token;

  const handleChange = (name) => (event) => {
    const values =
      name === "imageUrl" ? event.target.files[0] : event.target.value;
    formData.set(name, values);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    setItem({ ...item, [name]: values });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createItem(token, formData).then((data) => {
      if (!data) {
        setItem({ ...item });
      } else {
        setItem({
          ...item,
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

  useEffect(() => {
    formdata();
  }, []);

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
              <div className="col-6">
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
                  name={"Create Item"}
                  click={onSubmit}
                  redirect={"/signin"}
                />
              </div>
              <div className="col-5">
                <Image src={Photo} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Item;
