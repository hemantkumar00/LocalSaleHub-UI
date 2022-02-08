import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shop from "../components/Shop";
import { getShop } from "../helpers/userShop";

const UserShop = () => {
  const param = useParams();
  const [products, setProducts] = useState([]);
  const [values, setValues] = useState({
    number: "",
    payment: "",
    image: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { number, payment, image } = values;

  const imageUrlSplit = image.split("\\");
  const finalImageUrl = `http://localhost:8000/api/${imageUrlSplit[0]}/${imageUrlSplit[1]}`;

  const preload = () => {
    getShop(param.shopId).then((data) => {
      console.log(param.shopId);
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setValues({
          ...values,
          number: data.result.address.phoneNo,
          payment: data.result.payment[0],
          image: data.result.imageUrl[0],
        });
        setProducts(data.result);

        console.log(products);
      }
    });
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newList = products.items.filter((product) => {
        return Object.values(product)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newList);
    } else {
      setSearchResults(products.items);
    }
  };

  useEffect(() => {
    preload(); // this is preload function
  }, []);

  return (
    <>
      {/* {preload()} */}
      {console.log(products.address)}
      <Shop
        searchKeyword={searchHandler}
        term={searchTerm}
        products={searchTerm.length < 1 ? products.items : searchResults}
        image={finalImageUrl}
        pay={payment}
        cost41={products.costForOne}
        minOdAt={products.minOrderAmount}
        address={products.formattedAddress}
        number={number}
        name={products.name}
      />
    </>
  );
};

export default UserShop;
