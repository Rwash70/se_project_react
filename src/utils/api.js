const baseUrl = 'http://localhost:3001';

// Handle API responses
function checkResponse(response) {
  if (!response.ok) {
    return response.json().then((err) => {
      throw new Error(err.message || `Error: ${response.status}`);
    });
  }
  return response.json();
}

// Get auth token from localStorage
function getToken() {
  const token = localStorage.getItem('jwt');
  if (!token || token === 'undefined') {
    console.warn('No valid token found');
    throw new Error('Authorization token is missing or invalid');
  }
  return token;
}

// Login user and store token
function login({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        throw new Error(' Token not found in response');
      }
    });
}

// Fetch all items
function getItems() {
  try {
    const token = getToken();
    return fetch(`${baseUrl}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(checkResponse)
      .then((data) => {
        return data;
      });
  } catch (error) {
    console.error(' Error fetching items:', error.message);
    throw error;
  }
}

// Add a new item
function addItems({ name, weather, imageUrl }) {
  try {
    const token = getToken();
    return fetch(`${baseUrl}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, weather, imageUrl }),
    })
      .then(checkResponse)
      .then((data) => {
        return data;
      });
  } catch (error) {
    console.error(' Error adding item:', error.message);
    throw error;
  }
}

// Delete an item
function deleteItems(id) {
  try {
    const token = getToken();
    return fetch(`${baseUrl}/items/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(checkResponse)
      .then(() => {
        return id;
      });
  } catch (error) {
    console.error(' Delete request failed:', error.message);
    throw error;
  }
}

// Update user info with validation to ensure at least one field (name or avatar) is present
function updateUserInfo({ name, avatar }) {
  if (!name && !avatar) {
    console.error(
      'You must provide at least one field (name or avatar) to update'
    );
    throw new Error(
      'You must provide at least one field (name or avatar) to update'
    );
  }

  try {
    const token = getToken();
    return fetch(`${baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    })
      .then(checkResponse)
      .then((data) => {
        return data;
      });
  } catch (error) {
    console.error(' Error updating user info:', error.message);
    throw error;
  }
}
// Add a like
function addCardLike(itemId) {
  try {
    const token = getToken();
    return fetch(`${baseUrl}/items/${itemId}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(checkResponse)
      .then((data) => {
        return data;
      });
  } catch (error) {
    console.error(' Error liking item:', error.message);
    throw error;
  }
}

// Remove a like
function removeCardLike(itemId) {
  try {
    const token = getToken();
    return fetch(`${baseUrl}/items/${itemId}/like`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(checkResponse)
      .then(() => {
        return itemId;
      });
  } catch (error) {
    console.error(' Error unliking item:', error.message);
    throw error;
  }
}

export {
  baseUrl,
  login,
  getItems,
  addItems,
  deleteItems,
  updateUserInfo,
  addCardLike,
  removeCardLike,
  checkResponse,
};
