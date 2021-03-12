import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  InputBase,
  Typography,
  Grid,
  FormControl,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputBox: {
    display: "flex",
    borderRadius: theme.shape.borderRadius * 4,
    backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    border: "solid 1px rgba(229, 231, 235, 0.8)",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
  buttonRemove: {
    borderRadius: theme.shape.borderRadius * 4,
    width: "4em",
    height: "2em",
    backgroundColor: "#F0F3FE",
    color: theme.palette.primary.light,
    marginRight: "1em",
  },
  buttonAdd: {
    borderRadius: theme.shape.borderRadius * 4,
    width: "4em",
    height: "2em",
    marginRight: "1em",
  },
  buttonSave: {
    position: "relative",
    borderRadius: theme.shape.borderRadius * 4,
    marginTop: theme.spacing(5),
    width: "10em",
    height: "3em",
  },
}));

const CompanySetting = () => {
  const classes = useStyles();

  const [company, setCompany] = useState("Company ABC");
  const [value, setValue] = useState("");

  const updateHandler = () => {
    setCompany(value);
    setValue("");
  };

  // handle subscriber info update submit
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Grid fullWidth container spacing={2}>
        <Grid container xs={2} direction="column" justify="space-between">
          <Grid item>
            <Typography variant="h4" style={{ paddingTop: "15px" }}>
              Your company
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" style={{ paddingBottom: "30px" }}>
              Weekly report
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <form id="company-form" onSubmit={submitHandler}>
            <FormControl variant="filled" className={classes.inputBox}>
              <InputLabel htmlFor="filled-company-name"></InputLabel>
              <InputBase
                id="filled-company-name"
                placeholder="Company name"
                value={company}
                fullWidth
                classes={{ input: classes.input, root: classes.inputBase }}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="text"
                      onClick={() => setCompany("")}
                      className={classes.buttonRemove}
                    >
                      REMOVE
                    </Button>
                  </InputAdornment>
                }
                inputProps={{ "aria-label": "Company name" }}
              />
            </FormControl>
            <FormControl className={classes.inputBox} focused>
              <InputLabel htmlFor="add-company-name"></InputLabel>
              <InputBase
                id="add-company-name"
                placeholder="Company name"
                fullWidth
                classes={{ input: classes.input, root: classes.inputBase }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={updateHandler}
                      className={classes.buttonAdd}
                    >
                      ADD
                    </Button>
                  </InputAdornment>
                }
                inputProps={{ "aria-label": "Company name" }}
              />
            </FormControl>
            <FormControl
              className={classes.inputBox}
              style={{ marginTop: "10vh" }}
              varaint="filled"
            >
              <InputLabel htmlFor="subscribed-email"></InputLabel>
              <InputBase
                id="subscribed-email"
                placeholder="subscribed email"
                fullWidth
                type="email"
                defaultValue="companyabc@gmail.com"
                classes={{ input: classes.input, root: classes.inputBase }}
                inputProps={{ "aria-label": "subscribed email" }}
              />
            </FormControl>
          </form>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        form="company-form"
        type="submit"
        className={classes.buttonSave}
      >
        SAVE
      </Button>
    </>
  );
};

export default CompanySetting;
