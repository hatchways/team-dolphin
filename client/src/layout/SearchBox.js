import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, InputBase } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius * 4,
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "70%",
  },
  input: {
    "&::placeholder": {
      fontWeight: "450",
      opacity: "0.2",
    },
  },
  inputBase: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5, 1, 0.5, 0),
    flex: 1,
  },
}));

const SearchBox = () => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="Company name"
        classes={{ input: classes.input }}
        className={classes.inputBase}
        inputProps={{ "aria-label": "Company name" }}
      />
      <IconButton
        type="submit"
        aria-label="search"
        size="small"
        color="primary"
      >
        <FontAwesomeIcon icon={faSearch} size="xs" />
      </IconButton>
    </div>
  );
};

export default SearchBox;
