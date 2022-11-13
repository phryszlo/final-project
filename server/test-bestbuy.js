const axios = require("axios");

const encodedParams = new URLSearchParams();
encodedParams.append("apiKey", "<REQUIRED>");

const options = {
  method: 'POST',
  url: 'https://bestbuyraygorodskijv1.p.rapidapi.com/getAllCategories',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '5a45b87a7emsh0e688a92e111a31p109034jsnd12d5e26c292',
    'X-RapidAPI-Host': 'BestBuyraygorodskijV1.p.rapidapi.com'
  },
  data: encodedParams
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});