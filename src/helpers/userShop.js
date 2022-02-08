import { API } from "../backend";

export const getShops = () => {
  return fetch(`${API}/shops`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getShop = (shopId) => {
  return fetch(`${API}/shop/${shopId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const postCart = (token, itemId) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/cart/${itemId}`, {
    method: "POST",
    headers: {
      Authorization: jwt,
      // Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((respose) => {
      return respose.json();
    })
    .then((data) => alert(JSON.stringify(data.message)))
    .catch((err) => alert(err));
};

export const getCart = (token) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/cart`, {
    method: "GET",
    headers: {
      Authorization: jwt,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const removeCart = (token, itemId) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/remove-cart-item/${itemId}`, {
    method: "POST",
    headers: {
      Authorization: jwt,
      // Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((respose) => {
      return respose.json();
    })
    .then((data) => alert(JSON.stringify(data.message)))
    .catch((err) => alert(err));
};

export const deleteCart = (token, itemId) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/delete-cart-item/${itemId}`, {
    method: "POST",
    headers: {
      Authorization: jwt,
      // Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((respose) => {
      return respose.json();
    })
    .then((data) => alert(JSON.stringify(data.message)))
    .catch((err) => alert(err));
};

export const setAddress = (address, token) => {
  console.log(address);
  const jwt = `Bearer ${token}`;
  return fetch(`http://localhost:8000/api/user/address`, {
    method: "POST",
    headers: {
      Authorization: jwt,
      // Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(address),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const postOrder = (token) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/order`, {
    method: "POST",
    headers: {
      Authorization: jwt,
      // Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((respose) => {
      return respose.json();
    })
    .then((data) => alert(JSON.stringify(data.message)))
    .catch((err) => alert(err));
};

export const getOrders = (token) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/orders`, {
    method: "GET",
    headers: {
      Authorization: jwt,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const statusUpdate = (token, orderId, status) => {
  console.log(status);
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/order-status/${orderId}`, {
    method: "POST",
    headers: {
      Authorization: jwt,
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => alert(JSON.stringify(data)))
    .catch((err) => console.log(err));
};
