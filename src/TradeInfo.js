import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTradeData } from "./API";
import CloseIcon from "@mui/icons-material/Close";
export default function TradeInfo(props) {
  const Data = props.Data;
  let [TradeData, setTradeData] = useState({});
  useEffect(() => {
    const getTrade = async () => {
      let data = await getTradeData(Data.Id);

      setTradeData(data);
    };
    getTrade();
  }, []);
  const formatChild = (data) => {
    if (Array.isArray(data)) {
      return "[ " + data.join(", ") + " ] ";
    } else if (typeof data === "object" && data !== null) {
      return Object.keys(data).map((key) => {
        return key + ": " + formatChild(data[key]);
      });
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
          right: 20,
          cursor: "pointer"
        }}
      />
      <code>
        <ul style={{ textAlign: "left" }}>
          {Object.keys(TradeData)
            .sort()
            .map((key) => (
              <li>
                {key}: {formatChild(TradeData[key])}
              </li>
            ))}
        </ul>
      </code>
    </div>
  );
}
