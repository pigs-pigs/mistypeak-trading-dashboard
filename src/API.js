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

async function getAllData(userId) {
  let apiKey = window.localStorage.getItem("API_KEY").replace("+", "%2B");
  return await axios
    .get(endpoint + "/alltrades/" + userId + "?key=" + apiKey)
    .then(function (response) {
      return response.data; //0 = Trades, 1 = Accessories
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
/*
async function getInventory(userId) {
  let apiKey = window.localStorage.getItem("API_KEY").replace("+", "%2B");
  return await axios
    .get(endpoint + "/inventory/" + userId + "?key=" + apiKey)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}*/

async function getActivity(userId) {
  return await axios
    .get(endpoint + "/activity/" + userId)
    .then(function (response) {
      return (
        response.data.userPresenceType == 2 ||
        response.data.userPresenceType == 4
      );
    })
    .catch(function (error) {
      console.log(error);
    });
}

export {
  getUserID,
  getUsernames,
  getAllData,
  getTradeData,
 // getInventory,
  getActivity,
};
