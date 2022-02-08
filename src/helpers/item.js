import { API } from "../backend";

export const createItem = (token, item) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/create-item`, {
    method: "POST",
    headers: {
      Authorization: jwt,
      Accept: "application/json",
    },
    body: item,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => alert(JSON.stringify(data)))
    .catch((err) => console.log(err));
};

//TODO: will work on this
export const getItem = (token) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/get-items`, {
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

export const getSingleItem = (itemId, token) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}get-item/${itemId}`, {
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

export const updateItem = (itemId, token, item) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/edit-item/${itemId}`, {
    method: "PUT",
    headers: {
      Authorization: jwt,
      Accept: "application/json",
    },
    body: item,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => alert(JSON.stringify(data)))
    .catch((err) => console.log(err));
};

export const deleteItem = (itemId, token) => {
  const jwt = `Bearer ${token}`;
  return fetch(`${API}/delete-item/${itemId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: jwt,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
