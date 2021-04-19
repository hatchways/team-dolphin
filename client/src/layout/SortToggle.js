import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const group = {
  backgroundColor: "#f0f1fa",
  borderRadius: "50px",
  padding: "5px",
};

const selected = {
  backgroundColor: "#657DF2",
  color: "#f0f1fa",
  borderRadius: "50px",
  width: "120px",
  height: "30px",
  textTransform: "none",
  letterSpacing: "0.5px",
  fontWeight: "900",
  border: "none",
};

const notselected = {
  backgroundColor: "#f0f1fa",
  color: "#657DF2",
  borderRadius: "50px",
  width: "120px",
  height: "30px",
  textTransform: "none",
  letterSpacing: "0.5px",
  fontWeight: "900",
  border: "none",
};

const SortToggle = ({ handleAlignment, alignment, values, text }) => {
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      style={group}
      aria-label="text alignment">
      <ToggleButton
        value={values[0]}
        aria-label="left aligned"
        style={alignment === values[0] ? selected : notselected}>
        {text[0]}
      </ToggleButton>
      <ToggleButton
        value={values[1]}
        aria-label="right aligned"
        style={alignment === values[1] ? selected : notselected}>
        {text[1]}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default SortToggle;
