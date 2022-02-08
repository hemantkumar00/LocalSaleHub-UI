import { useEffect, useState } from "react";
import Shop from "../components/Shop";
import { getItem } from "../helpers/item";
import { isAuthenticated, isUser } from "../helpers/user";

const SellerShop = () => {
  const [products, setProducts] = useState([]);

  const {
    name,
    minOrderAmount,
    payment,
    formattedAddress,
    costForOne,
    imageUrl,
    address,
  } = isUser().result;

  const imageUrlSplit = imageUrl[0].split("\\");
  const finalImageUrl = `http://localhost:8000/api/${imageUrlSplit[0]}/${imageUrlSplit[1]}`;

  const token = isAuthenticated && isAuthenticated().token;

  const getItems = () => {
    if (isUser().result.account.role === "ROLE_SELLER") {
      getItem(token).then((info) => {
        console.log(info);
        setProducts(info.items);
        console.log(products);
      });
    }
  };

  useEffect(() => {
    getItems(); // this is preload function
  }, []);

  return (
    <>
      <Shop
        products={products}
        image={finalImageUrl}
        pay={payment[0]}
        cost41={costForOne}
        minOdAt={minOrderAmount}
        address={formattedAddress}
        number={address.phoneNo}
        name={name}
      />
    </>
  );
};

export default SellerShop;
