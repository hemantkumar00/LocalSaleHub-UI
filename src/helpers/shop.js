export const shopSignup = (user) => {
  return fetch("http://localhost:8000/api/signup-seller", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => alert(JSON.stringify(data)))
    .catch((err) => console.log(err));
};
