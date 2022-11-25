import WarningIcon from "@mui/icons-material/Warning";
import FlagIcon from "@mui/icons-material/Flag";
import SearchIcon from "@mui/icons-material/Search";

export default (props) => {
  return (
    <div className="boxContainer">
      <div
        onClick={() => props.setPage("Reports")}
        className="gradientBox gbox1"
      >
        <p>123 reports</p>
        <span>
          <WarningIcon fontSize="large" />
        </span>
        <h3>Scam Reports</h3>
      </div>
      <div onClick={() => props.setPage("Flags")} className="gradientBox gbox2">
        <p>1,234 flags</p>
        <span>
          <FlagIcon fontSize="large" />
        </span>
        <h3>Flagged Trades</h3>
      </div>
      <div
        onClick={() => props.setPage("Explore")}
        className="gradientBox gbox3"
      >
        <p>100,000 trades</p>
        <span>
          <SearchIcon fontSize="large" />
        </span>
        <h3>Explore Trades</h3>
      </div>
    </div>
  );
};
