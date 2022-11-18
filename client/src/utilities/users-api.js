import { getToken } from './users-service';
const BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_RENDER + '/users'
  : "/api/v1/users";

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function getUsers() {
  return sendRequest(BASE_URL);
} 

export async function logIn(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function getModels() {
  return sendRequest(`${BASE_URL}/models`, 'GET');
}


async function sendRequest(url, method = 'GET', payload = null) {
  // console.log(`sendRequest payload: ${JSON.stringify(payload)}`)

  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken(); //users-service gets token from localStorage
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }

  //☣️☣️ this is a terrible clg. it will send the clear pwd to the browser console.
  // console.log(`api sendRequest:  token: ${token} url: ${url} options: ${JSON.stringify(options)}`);

  // console.log(`before fetch users-api: ${url}`);
  const res = await fetch(url, options);
  // console.log(`after fetch users-api: ${url}`);

  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json()
  else if (res.status === 401) {
    return res.json({ unauthorized: true });
  }
  throw new Error('Awful Request');
}

