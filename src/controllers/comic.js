const md5 = require("md5");
const axios = require("axios");

const publicKey = "7111d195ef2974613ab653073597db01";
const privateKey = "01b536917c629349f7ac5324daba4d54d29bf257";
const timestamp = new Date().getTime();
const hash = md5(`${timestamp}${privateKey}${publicKey}`);

console.log(hash, timestamp);

const baseUrl = `https://gateway.marvel.com:443/v1/public`;

const partUrl = `/comics`;

const apiUrl = baseUrl + partUrl;

axios
  .get(apiUrl, {
    params: {
      apikey: publicKey,
      ts: timestamp,
      hash: hash,
    },
  })
  .then((response) => console.log(response.data.data.results[0]))
  .catch((error) => console.error(error));

var api = require("marvel-api");

var marvel = api.createClient({
  publicKey: "7111d195ef2974613ab653073597db01",
  privateKey: "01b536917c629349f7ac5324daba4d54d29bf257",
});

marvel.characters
  .findByName("spider-man")
  .then(function (res) {
    console.log("Found character ID", res.data[0].id);
    return marvel.characters.comics(res.data[0].id);
  })
  .then(function (res) {
    console.log("found %s comics of %s total", res.meta.count, res.meta.total);
    console.log(res.data);
  })
  .fail(console.error)
  .done();
