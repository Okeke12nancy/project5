// const axios = require("axios");

// const apiKey = "your_api_key";
// const apiUrl = "https://example.com/api/getAll?apikey=" + apiKey;

// axios
//   .get(apiUrl)
//   .then((response) => {
//     // handle success
//     console.log(response.data);
//   })
//   .catch((error) => {
//     // handle error
//     console.log(error);
//   });


  const axios = require("axios");

  const apiKey = "your_api_key";
  const apiUrl = "https://example.com/api/getAll";

  axios
    .get(apiUrl, { headers: { Authorization: `Bearer ${apiKey}` } })
    .then((response) => {
      // handle success
      console.log(response.data);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
