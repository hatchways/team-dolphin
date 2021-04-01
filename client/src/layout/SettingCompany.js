import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  InputBase,
  Typography,
  Grid,
  FormControl,
  InputAdornment,
  InputLabel,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { UserContext } from "../context/user";
import { setReportEmail, updateUser } from "../actions/user";
import { isValidEmail } from "../pages/Signup";

import axios from "axios";

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
  buttonActive: {
    borderRadius: theme.shape.borderRadius * 4,
    width: "4em",
    height: "2em",
    backgroundColor: theme.palette.primary,
    color: theme.palette.primary.light,
    marginRight: "1em",
  },
  buttonSet: {
    borderRadius: theme.shape.borderRadius * 4,
    width: "4em",
    height: "2em",
    backgroundColor: "#F0F3FE",
    color: theme.palette.primary.light,
    marginRight: "1em",
  },
}));

const SettingCompany = () => {
  const classes = useStyles();
  const { user, dispatch } = useContext(UserContext);
  // eslint-disable-next-line
  const [newCompany, setNewCompany] = useState("");
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [value, setValue] = useState("");

  const handleAddCompany = async () => {
    if (newCompany.length < 3) {
      setError("Minimum length of 3 characters");
      return setSnackbarOpen(true);
    }

    let newCompaniesArray = [...user.companies, newCompany];

    try {
      await updateUser({
        companies: newCompaniesArray,
      });
      setError(null);
      setNewCompany("");
      dispatch({
        type: "SET_COMPANIES",
        payload: newCompaniesArray,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCompany = async (removeIndex) => {
    const companiesToKeep = user.companies.filter(
      (company, index) => index !== removeIndex
    );
    let newActiveCompany;

    if (user.companies[removeIndex] === user.activeCompany && removeIndex === 0)
      // if removing the active company and it is the first in the list
      newActiveCompany = user.companies[1];
    else if (
      user.companies[removeIndex] === user.activeCompany &&
      removeIndex > 0
    )
      // if removing the active company and it isn't first in the list, set the one before it as the active
      newActiveCompany = user.companies[removeIndex - 1];
    else newActiveCompany = user.activeCompany; // stays the same

    try {
      await updateUser({
        activeCompany: newActiveCompany,
        companies: companiesToKeep,
      });
      dispatch({
        type: "SET_COMPANIES",
        payload: companiesToKeep,
      });

      dispatch({
        type: "SET_ACTIVE_COMPANY",
        payload: newActiveCompany,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetActiveCompany = async (company) => {
    try {
      await updateUser({
        activeCompany: company,
      });
      dispatch({
        type: "SET_ACTIVE_COMPANY",
        payload: company,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveReportEmail = async () => {
    if (!isValidEmail(user.reportEmail)) {
      setError("Invalid email format");
      return setSnackbarOpen(true);
    }

    try {
      await axios.patch("/api/users/update", {
        reportEmail: user.reportEmail,
      });
      setError(null);
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
    }
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
          <form id="company-form">
            {user.companies.map((company, index) => (
              <FormControl variant="filled" className={classes.inputBox}>
                <InputLabel htmlFor="filled-company-name"></InputLabel>
                <InputBase
                  id={`company-name-${index}`}
                  value={company}
                  fullWidth
                  classes={{ input: classes.input, root: classes.inputBase }}
                  endAdornment={
                    user.companies.length > 1 && (
                      <InputAdornment position="end">
                        <Button
                          variant="text"
                          onClick={() => handleSetActiveCompany(company)}
                          disabled={company === user.activeCompany}
                          className={classes.buttonRemove}>
                          {company === user.activeCompany ? "ACTIVE" : "SET"}
                        </Button>
                        <Button
                          variant="text"
                          onClick={() => handleRemoveCompany(index)}
                          className={classes.buttonRemove}>
                          REMOVE
                        </Button>
                      </InputAdornment>
                    )
                  }
                  inputProps={{ "aria-label": "Company name" }}
                />
              </FormControl>
            ))}
            <FormControl className={classes.inputBox} focused>
              <InputLabel htmlFor="add-company-name"></InputLabel>
              <InputBase
                id="add-company-name"
                placeholder="Company name"
                fullWidth
                classes={{ input: classes.input, root: classes.inputBase }}
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddCompany}
                      className={classes.buttonAdd}>
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
              varaint="filled">
              <InputLabel htmlFor="subscribed-email"></InputLabel>
              <InputBase
                id="subscribed-email"
                placeholder="subscribed email"
                fullWidth
                type="email"
                value={user.reportEmail}
                onChange={(e) => setReportEmail(dispatch, e.target.value)}
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
        className={classes.buttonSave}
        onClick={handleSaveReportEmail}>
        SAVE
      </Button>
      <Button
        variant="contained"
        color="primary"
        form="company-form"
        className={classes.buttonSave}
        onClick={() => axios.get("/api/users/sendReport")}>
        DEMO
      </Button>
      <Snackbar open={snackbarOpen}>
        {error ? (
          <Alert onClose={() => setSnackbarOpen(false)} severity="error">
            {error}
          </Alert>
        ) : (
          <Alert onClose={() => setSnackbarOpen(false)} severity="success">
            Successfully updated weekly report email
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default SettingCompany;
