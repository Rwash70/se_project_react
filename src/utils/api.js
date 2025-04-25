import { BASE_URL } from './auth';

// Handle API responses
function checkResponse(response) {
  if (!response.ok) {
    return response.json().then((err) => {
      throw new Error(err.message || `Error: ${response.status}`);
    });
  }
  return response.json();
}

// Get token
function getToken() {
  const token = localStorage.getItem('jwt');
  if (!token || token === 'undefined') {
    throw new Error('Authorization token is missing or invalid');
  }
  return token;
}

// Auth headers helper
function getAuthHeaders(contentType = true) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  if (contentType) headers['Content-Type'] = 'application/json';
  return headers;
}

// Login
function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
      throw new Error('Token not found in response');
    });
}

// Get items
function getItems() {
  return fetch(`${BASE_URL}/items`, {
    headers: getAuthHeaders(false),
  }).then(checkResponse);
}

// Add item
function addItems({ name, weather, imageUrl }) {
  return fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(checkResponse);
}

// ✅ Updated Delete item
async function deleteItems(itemId) {
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(false),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to delete item: ${errorData.message || 'Unknown error'}`
    );
  }

  const updatedItems = await getItems();
  return updatedItems;
}

// Update user info
function updateUserInfo({ name, avatar }) {
  if (!name && !avatar) {
    throw new Error(
      'You must provide at least one field (name or avatar) to update'
    );
  }

  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

// Like item
function addCardLike(itemId) {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  }).then(checkResponse);
}

// Unlike item
function removeCardLike(itemId) {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: 'DELETE',
    headers: getAuthHeaders(false),
  })
    .then(checkResponse)
    .then(() => itemId);
}

export {
  login,
  getItems,
  addItems,
  deleteItems,
  updateUserInfo,
  addCardLike,
  removeCardLike,
  checkResponse,
};
