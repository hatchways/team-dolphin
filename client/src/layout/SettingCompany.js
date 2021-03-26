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
import {
  setReportEmail,
  updateReportEmail,
  updateCompanies,
  updateActiveCompany,
} from "../actions/user";

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
  const { user, dispatch, error } = useContext(UserContext);
  // eslint-disable-next-line
  const [newCompany, setNewCompany] = useState("");
  const [newCompanyError, setNewCompanyError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [value, setValue] = useState("");

  // handle subscriber info update submit
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleAddCompany = async () => {
    if (newCompany.length < 3) {
      dispatch({
        type: "SET_ERROR",
        payload: "Minimum length of 3 characters",
      });
      return setSnackbarOpen(true);
    }

    let newCompaniesArray = [...user.companies, newCompany];

    try {
      const res = await updateCompanies(dispatch, newCompaniesArray);
      setNewCompany("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCompany = async (removeIndex) => {
    if (user.companies[removeIndex] === user.activeCompany) {
      // if removing current active company, set new active
      updateActiveCompany(dispatch, user.companies[removeIndex - 1]);
    }
    let companiesToKeep = user.companies.filter(
      (company, index) => index !== removeIndex
    );
    updateCompanies(dispatch, companiesToKeep);
  };

  const handleSaveReportEmail = async () => {
    try {
      await updateReportEmail(dispatch, {
        updatedEmail: user.reportEmail,
      });
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarOpen(true);
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
          <form id="company-form" onSubmit={submitHandler}>
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
                          onClick={() => updateActiveCompany(dispatch, company)}
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
                error={newCompanyError}
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
        type="submit"
        className={classes.buttonSave}
        onClick={handleSaveReportEmail}>
        SAVE
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
