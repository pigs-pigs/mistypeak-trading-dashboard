import axios from "axios";
const endpoint = "https://fuschia-hickory-waxflower.glitch.me";

async function getUserID(name) {
  return await axios
    .get(endpoint + "/userid/" + name)
    .then(function (response) {
      return response.data.id;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getUsernames(allIds) {
  let arrayOfIds = [];
  allIds.forEach((val) => {
    if (arrayOfIds.indexOf(val) < 0) {
      arrayOfIds.push(val);
    }
  });
  return await axios
    .get(endpoint + "/usernames/" + arrayOfIds.join(","))
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getAllTrades(userId) {
  let apiKey = window.localStorage.getItem("API_KEY").replace("+", "%2B");
  return await axios
    .get(endpoint + "/alltrades/" + userId + "?key=" + apiKey)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getTradeData(tradeId) {
  let apiKey = window.localStorage.getItem("API_KEY").replace("+", "%2B");
  return await axios
    .get(endpoint + "/trade/" + tradeId + "?key=" + apiKey)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export { getUserID, getUsernames, getAllTrades, getTradeData };
