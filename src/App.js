import "./styles.css";
import ExplorePage from "./ExplorePage";
import HomePage from "./ExplorePage";
import PlayerPage from "./PlayerPage";
import TradeInfoPopup from "./TradeInfo";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { useState } from "react";

export default function App() {
  let [, setApiKeyChanged] = useState("Home");

  const enterKey = (e) => {
    if (e.key === "Enter") {
      setApiKeyChanged(e.target.value);
      localStorage.setItem("API_KEY", e.target.value);
    }
  };
  return (
    <>
      <BrowserRouter>
        <div className="topbar">
          <Link to="/">
            <h2>Mistypeak Dashboard</h2>
          </Link>
        </div>
        {localStorage.getItem("API_KEY") &&
        localStorage.getItem("API_KEY").match("RaiK") ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              left: 0,
              top: "12%",
              position: "fixed"
            }}
          >
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/users/:userId" element={<PlayerPage />}>
                <Route path=":tradeId" element={<TradeInfoPopup />} />
              </Route>
            </Routes>
          </div>
        ) : (
          <div className="enterKeyPopup">
            <h2>enter the access key to continue</h2>
            <input onKeyUp={enterKey} type="text" placeholder="key" />
          </div>
        )}
      </BrowserRouter>
    </>
  );
}
