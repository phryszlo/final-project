import * as usersAPI from "./users-api";

export async function signUp(userData) {

  console.log(`signUp hit ${JSON.stringify(userData)}`)

  const response = await usersAPI.signUp(userData);
  const data = response.data;
  localStorage.setItem("data", JSON.stringify(data));

  return response;
}

export const getToken = () => {
  const token =
    JSON.parse(localStorage.getItem("data"))
    && JSON.parse(localStorage.getItem("data"))?.token;
  if (!token) {
    return null;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  // const payload = JSON.parse(Buffer(token.split(".")[1], 'base64'));

  console.log(`token expires: ${new Date(payload.exp * 1000)}`);
  if (payload.exp < Number.parseInt(Date.now() / 1000)) {
    localStorage.removeItem("data");
    return null;
  }

  return token;
};

export const getCartItems = (email) => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("userCart")) &&
      JSON.parse(localStorage.getItem("userCart"))?.cartItems;
    const userEmail = JSON.parse(localStorage.getItem("userCart")) &&
      JSON.parse(localStorage.getItem("userCart"))?.email;

      console.log(!userEmail ? 'no cart found' : `getCartItems: userEmail = ${JSON.stringify(userEmail)}`);
    if (userEmail !== email) {
      return [];
    }
    // console.log(`users-service: cart items = ${JSON.stringify(cartItems)}`)
    if (!cartItems) {
      return [];
    }
    return cartItems;
  } catch (error) {
    console.log(`getCartItems error: ${error}`);
  }
}
export const putCartInStorage = (cartItems, email) => {
  try {
    // need to add an email prop 
    console.log(`putCart fn. cartItems=${JSON.stringify(cartItems)}`);
    localStorage.setItem("userCart", JSON.stringify({ cartItems, email: email }));

  } catch (error) {
    console.log(`getCartItems error: ${error}`);
  }
}

// set the localStorage for the google user (default exp = 1 hour)
export function setGoogleData(userData, credential) {
  try {
    localStorage.setItem("data", JSON.stringify({
      user: { name: userData.name, email: userData.email },
      token: credential
    }));
  } catch (error) {
    console.log(`setGoogleData error: ${error}`);
  }
}

export async function logIn(userData) {
  try {
    console.log(`userData`);
    const data = await usersAPI.logIn(userData);
    if (data.unauthorized) return 401;
    const { password, id, _id, __v, createdAt, updatedAt, ...user } = data.data.user;
    localStorage.setItem("data", JSON.stringify({ user: user, token: data.data.token }));
    return data;
  } catch (error) {
    console.log(`logIn users-service: ${error}`)
  }
}

export function logOut() {
  console.log(`logout`);
  localStorage.removeItem('data');
}

export const getUser = () => {
  const token = getToken();
  return token ? JSON.parse(localStorage.getItem("data")).user : null;
};

export const getUsers = async () => {
  const users = await usersAPI.getUsers()
  return users;
}
