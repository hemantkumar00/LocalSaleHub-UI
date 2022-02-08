import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getMeToken, processPaymant } from "../helpers/paymant";
import { isAuthenticated, isUser } from "../helpers/user";
import DropIn from "braintree-web-drop-in-react";

const Payment = (props) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isUser() && isUser().result._id;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      if (!info) {
        setInfo({ ...info, error: info });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const performRedirect = () => {
    if (info.success) {
      return <Navigate replace to="/orders" />;
    }
  };

  const showBraintreeDropIn = () => {
    return (
      <div>
        {(info.clientToken !== null) & (props.price > 0) ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (
                (info.instance = instance), console.log(instance)
              )}
            />
            <button
              className=" btn btn-warning text-secondary "
              style={{ width: "100%" }}
              // to={info.success ? "/orders" : "/address"}
              onClick={onPurchase}
            >
              Place Order
            </button>
          </div>
        ) : (
          <h3>Please add something first</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const amount = props.price;

  const onPurchase = () => {
    setInfo({ loading: true });
    console.log(info.instance);
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymantData = {
          paymantMethodNonce: nonce,
          amount: amount,
        };
        processPaymant(userId, token, paymantData).then(
          (response) => setInfo({ ...info, success: true }),
          props.submit(true),
          props.submitAddress(),
          console.log("done"),
        );
      })
      .catch((error) => {
        setInfo({ loading: false, success: false });
        console.log(error);
      });
  };

  return (
    <>
      <div>{showBraintreeDropIn()}</div>
      {performRedirect()}
    </>
  );
};
export default Payment;
