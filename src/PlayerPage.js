import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams, Outlet } from "react-router-dom";

import { getAllTrades, getUsernames, getInventory } from "./API.js";
import TradeInfo from "./TradeInfo";

export default function PlayerPage() {
  let [trades, setTrades] = useState([]);
  let [currentTrade, setCurrentTrade] = useState(null);
  let [currentInv, setCurrentInv] = useState(null);

  const { userId } = useParams();
  const location = useLocation();
  const lastProps = location.state;
  const OpenInventoryPopup = async () => {
    if (!currentInv) {
      let tempData = await getInventory(userId);
      setCurrentInv(tempData.Accessories);
    }
  };
  useEffect(() => {
    let userIdsToGet = [];
    const formatData = (TradeId) => {
      let dataArray = TradeId.split(/[_@]/g);

      let otherPlayerUID = 1;
      if (dataArray[0] === userId) {
        otherPlayerUID = Number(dataArray[1]);
      } else if (dataArray[1] === userId) {
        otherPlayerUID = Number(dataArray[0]);
      }
      userIdsToGet.push(otherPlayerUID);
      let dateTime = new Date(Number(dataArray[2]) * 1000).toLocaleString(
        "en-us"
      );
      return { Id: TradeId, OtherPlayer: otherPlayerUID, Date: dateTime };
    };

    const setTradeData = async () => {
      let data = await getAllTrades(userId);

      let formattedData = [];
      data.map((id) => {
        return formattedData.push(formatData(id));
      });
      let UsernamesFromID = await getUsernames(userIdsToGet);
      let finalData = formattedData.map((obj) => {
        let userData = UsernamesFromID[obj.OtherPlayer];
        return {
          Id: obj.Id,
          Date: obj.Date,
          OtherPlayer: userData
            ? userData.displayName +
              (userData.displayName !== userData.username
                ? " (@" + userData.username + ")"
                : "")
            : obj.OtherPlayer
        };
      });

      setTrades(finalData);
    };
    setTradeData();
  }, [userId]);

  const getTradeDiv = (TradeData) => {
    return (
      <div
        key={TradeData.Id}
        onClick={() => setCurrentTrade(TradeData)}
        className="tradeList"
      >
        <p style={{ width: "50%", textAlign: "left", position: "absolute" }}>
          {TradeData.OtherPlayer}
        </p>
        <p
          style={{
            width: "50%",
            textAlign: "left",
            posiion: "absolute",
            marginLeft: "50%"
          }}
        >
          {TradeData.Date}
        </p>
      </div>
    );
  };

  return (
    <>
      <h2
        style={{
          width: "60%",
          marginLeft: "40%",
          transform: "translate(-50%)"
        }}
      >
        All trades for {lastProps && lastProps.username} ({userId}){" "}
      </h2>
      <div
        style={{
          width: "60%",
          minWidth: 230,
          left: "40%",
          position: "absolute",
          transform: "translate(-50%)",
          height: "70%",
          overflowY: "scroll",
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {trades.map((val) => {
          return getTradeDiv(val);
        })}
      </div>
      {currentInv == null && (
        <button className="invButton" onClick={OpenInventoryPopup}>
          View Inventory
        </button>
      )}
      {currentTrade && (
        <TradeInfo
          Data={currentTrade}
          CloseTrade={setCurrentTrade}
          Viewing={lastProps && lastProps.username}
        />
      )}

      <h2
        style={{
          width: "40%",
          left: "86%",
          transform: "translate(-50%)",
          top: 0,
          position: "absolute"
        }}
      >
        Inventory
      </h2>
      <div
        style={{
          width: "40%",
          minWidth: 230,
          left: "86%",
          position: "absolute",
          transform: "translate(-50%)",
          height: "70%",
          overflowY: "scroll",
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {currentInv !== null && currentInv.map((val) => <p>{val}</p>)}
      </div>
    </>
  );
}
