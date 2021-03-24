import React, { useState, useContext } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { getMentions } from "../hooks/getMentions";
import { UserContext } from "../context/user";

const SortToggle = ({ handleAlignment, alignment, setAlignment }) => {
  const { dispatch, error, searchTerm } = useContext(UserContext);

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment">
      <ToggleButton value="date" aria-label="left aligned">
        Most Recent
      </ToggleButton>
      <ToggleButton value="popularity" aria-label="right aligned">
        Most Popular
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default SortToggle;
