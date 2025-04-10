const baseUrl = 'http://localhost:3001';

// Function to handle the response and check if it's OK
function checkResponse(response) {
  if (!response.ok) {
    return response.json().then((err) => {
      throw new Error(err.message || `Error: ${response.status}`);
    });
  }
  return response.json(); // Return parsed JSON if the response is OK
}

// Fetch all items with token in headers
function getItems(token) {
  return fetch(`${baseUrl}/items`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add Authorization header
    },
  })
    .then(checkResponse)
    .then((data) => {
      console.log('Items received:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error fetching items:', error);
      throw error;
    });
}

// Add a new item with token in headers
function addItems({ name, weather, imageUrl }, token) {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add Authorization header
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  })
    .then(checkResponse)
    .then((data) => {
      console.log('Item added:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error adding item:', error);
      throw error;
    });
}

// Delete an item with token in headers
function deleteItems(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, // Add Authorization header
    },
  })
    .then(checkResponse)
    .then(() => {
      console.log(`Item with id ${id} deleted.`);
      return id;
    })
    .catch((error) => {
      console.error('Delete request failed:', error);
      throw error;
    });
}

// Update user info (name and avatar URL)
function updateUserInfo({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add Authorization header
    },
    body: JSON.stringify({ name, avatar }),
  })
    .then(checkResponse)
    .then((data) => {
      console.log('User info updated:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error updating user info:', error);
      throw error;
    });
}

// Add a like to an item
function addCardLike(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}/like`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add Authorization header
    },
  })
    .then(checkResponse)
    .then((data) => {
      console.log('Item liked:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error liking item:', error);
      throw error;
    });
}

// Remove a like from an item
function removeCardLike(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}/like`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, // Add Authorization header
    },
  })
    .then(checkResponse)
    .then(() => {
      console.log('Item unliked.');
      return itemId;
    })
    .catch((error) => {
      console.error('Error unliking item:', error);
      throw error;
    });
}

export {
  getItems,
  addItems,
  deleteItems,
  updateUserInfo,
  addCardLike,
  removeCardLike,
  checkResponse,
};
