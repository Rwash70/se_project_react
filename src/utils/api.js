const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log("Response received:", res);
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addItems({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(` Error: ${res.status}`);
      }
    })
    .catch(console.error);
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json(); // Ensure the API confirms deletion
    })
    .then(() => id)
    .catch((error) => {
      console.error("Delete request failed:", error);
      throw error;
    });
}

export { getItems, addItems, deleteItems };
