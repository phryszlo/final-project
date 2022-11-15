import { getToken } from './users-service';
const BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL
  : "/api/v1";



export async function getModels() {
  return sendRequest(`${BASE_URL}/models`, 'GET');
}

export async function getEq(id) {
  console.log(`getEq: id = ${id}`)
  const thing =  sendRequest(`${BASE_URL}/equipment/${id}`, 'GET');
  console.log(`thing = ${JSON.stringify(thing)}`);
  return thing;
}

export async function getAllEqAndRelated() {
  // the /join route returns the models and locations as well.
  return sendRequest(`${BASE_URL}/equipment/join`, 'GET')
}

export async function getAllEq() {
  // the /join route returns the models and locations as well.
  return sendRequest(`${BASE_URL}/equipment`, 'GET')
}
export async function patchEq(id, updated) {
  console.log(`updated: ${JSON.stringify(updated)}`);
  return sendRequest(`${BASE_URL}/equipment/${id}`, 'PATCH', updated)
}

export async function postEq(newEq) {
  console.log(`newEq: ${JSON.stringify(newEq)}`);
  return sendRequest(`${BASE_URL}/equipment`, 'POST', newEq)
}

async function sendRequest(url, method = 'GET', payload = null) {
  console.log(`sendRequest payload: ${JSON.stringify(payload)}`)

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

  console.log(`before fetch inv-api: ${url}`);
  const res = await fetch(url, options);
  console.log(`after fetch inv-api: ${url}`);

  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) {
    console.log(`res ok!`);
    // console.log(`res.json = ${res.json()}`)
    const result =  res.json()
    console.log(`result = ${JSON.stringify(result)}`);
    return result;
  }
  else if (res.status === 401) {
    return res.json({ unauthorized: true });
  }
  else {
    console.log(`res.status = ${res.status}`)
  }
  throw new Error('inv api: Awful Request');
}
