const baseUrl = "http://localhost:3001";

function checkResponse(response) {
  if (!response.ok) {
    return response.json().then((err) => {
      throw new Error(err.message || `Error: ${response.status}`);
    });
  }
  return response.json(); // Return parsed JSON if the response is OK
}

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse)
    .then((data) => {
      console.log("Items received:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
      throw error;
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
    .then(checkResponse) // Use checkResponse for consistent handling
    .then((data) => {
      console.log("Item added:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error adding item:", error);
      throw error;
      ole.error;
    });
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then(checkResponse) // Use checkResponse for consistent handling
    .then(() => {
      console.log(`Item with id ${id} deleted.`);
      return id;
    })
    .catch((error) => {
      console.error("Delete request failed:", error);
      throw error;
    });
}

export { getItems, addItems, deleteItems };
