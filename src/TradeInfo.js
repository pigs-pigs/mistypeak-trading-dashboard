import { useState, useEffect } from "react";
import { getTradeData } from "./API";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function TradeInfo(props) {
  const Data = props.Data;
  // const ignoreFields = ["Cancelled", "P1State", "P2State", "Complete"];
  let [TradeData, setTradeData] = useState({});
  useEffect(() => {
    const getTrade = async () => {
      let data = await getTradeData(Data.Id);
      if (data.Player2[0] == props.PageId) {
        let og = data.Player1;
        data.Player1 = data.Player2;
        data.Player2 = og;
        console.log(data);
      }
      setTradeData(data);
    };
    getTrade();
  }, []);

  const formatChild = (data) => {
    if (Array.isArray(data)) {
      return "[ " + data.join(", ") + " ] ";
    } else if (typeof data === "object" && data !== null) {
      return (
        "{ " +
        Object.keys(data).map((key) => {
          return key + ": " + formatChild(data[key]);
        }) +
        "}"
      );
    } else if (Number(data) && Number(data) > 50000) {
      return new Date(Number(data) * 1000).toLocaleString("en-us");
    } else return data + " ";
  };
  return (
    <div className="tradeInfoPopup">
      <CloseIcon
        onClick={() => {
          props.CloseTrade(null);
        }}
        style={{
          fontSize: 40,
          position: "absolute",
          right: 17,
          cursor: "pointer",
        }}
      />
      <h2>{TradeData.TradeId || "Id Not Found"}</h2>
      <table>
        <tr>
          <th>{TradeData.Player1 && TradeData.Player1[1]}</th>
          <th>
            <Link
              target="_blank"
              to={TradeData.Player2 ? "/users/" + TradeData.Player2[0] : ""}
            >
              {TradeData.Player2 && TradeData.Player2[1]}
            </Link>
          </th>
        </tr>
        <tr>
          <td>
            {((TradeData.P1Offer && TradeData.P1Offer.Accessories) || []).map(
              (name) => (
                <p>{name}</p>
              )
            )}
          </td>
          <td>
            {((TradeData.P2Offer && TradeData.P2Offer.Accessories) || []).map(
              (name) => (
                <p>{name}</p>
              )
            )}
          </td>
        </tr>
        <tr>
          <td>
            {(
              (TradeData.P1Offer && TradeData.P1Offer.Runes) ||
              0
            ).toLocaleString("en-US")}
          </td>
          <td>
            {(
              (TradeData.P2Offer && TradeData.P2Offer.Runes) ||
              0
            ).toLocaleString("en-US")}
          </td>
        </tr>
      </table>
      <h3>
        {(TradeData.TimeBegan &&
          new Date(Number(TradeData.TimeBegan) * 1000).toLocaleString(
            "en-us"
          )) +
          "  -  " +
          (TradeData.TimeEnded &&
            new Date(Number(TradeData.TimeEnded) * 1000).toLocaleTimeString(
              "en-us"
            ))}
      </h3>

      {TradeData.Cancelled && (
        <p
          style={{
            position: "absolute",
            bottom: "3%",
            color: "red",
            textAlign: "center",
            fontSize: "1.8rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Trade Cancelled
        </p>
      )}
    </div>
  );
}
