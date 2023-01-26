import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import { getUserID } from "./API.js";

export default function ExplorePage() {
  const nav = useNavigate();
  let [username, setUsername] = useState("");
  let [loading, setLoading] = useState(false);

  const submitUserName = async () => {
    if (!loading) {
      setLoading(true);
      let userId = await getUserID(username);
      console.log(userId);
      nav("/users/" + userId, { state: { username } });
    }
  };
  const inputChanged = (e) => {
    setUsername(e.target.value);
    if (e.key === "Enter") {
      submitUserName();
    }
  };
  return (
    <>
      <input
        style={{ maxHeight: 60, width: "80%", paddingTop: 10 }}
        type="text"
        placeholder="Username"
        onKeyUp={inputChanged}
      />
      {loading ? (
        <CircularProgress
          style={{ padding: 10, verticalAlign: "middle", color: "var(--light)" }}
          fontSize="large"
        />
      ) : (
        <SearchIcon
          style={{ padding: 10, verticalAlign: "middle", cursor: "pointer" }}
          fontSize="large"
          onClick={submitUserName}
        />
      )}
    </>
  );
}
