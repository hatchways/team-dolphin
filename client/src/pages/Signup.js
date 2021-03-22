import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import { register, validateRegistration } from "../actions/user";

import {
  Typography,
  Button,
  Paper,
  TextField,
  Grid,
  Snackbar,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import { makeStyles } from "@material-ui/core/styles";
import AppBarNotLoggedIn from "../layout/AppBarNotLoggedIn";

import axios from "axios";

const cta = {
  description: "Already have an account?",
  href: "/login",
  buttonName: "LOGIN",
};

const isLongEnough = (password) => {
  if (password.length === 0) return true; // just so the input field doesn't appear red at first
  return password.length >= 6;
};

const isMatch = (password1, passwordMatch) => {
  return password1 === passwordMatch;
};

const isValidEmail = (email) => {
  if (email.length === 0) return true; // just so the input field doesn't appear red at first
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  grow: {
    flexGrow: 1,
  },
  signupCard: {
    width: "40%",
    margin: "5rem auto",
    padding: "3rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "60%",
    textAlign: "center",
    marginTop: theme.spacing(5),
  },
  signupButton: {
    margin: theme.spacing(5, 0),
    borderRadius: "30px",
    padding: "1rem 3rem",
  },
}));

const Signup = () => {
  let history = useHistory();
  const classes = useStyles();

  const [signupUser, setSignupUser] = useState({
    email: "",
    companyName: "",
    password: "",
    passwordMatch: "",
  });

  const [formErrors, setFormErrors] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { isAuthenticated, dispatch, error } = useContext(UserContext);

  const handleUserInput = (e) => {
    setSignupUser({
      ...signupUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formErrors) {
      validateRegistration(dispatch);
      return setSnackbarOpen(true);
    }

    try {
      await register(dispatch, {
        email: signupUser.email,
        name: signupUser.companyName,
        password: signupUser.password,
      });
      history.push("/");
    } catch (err) {
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const { email, password, passwordMatch } = signupUser;

    if (
      !isValidEmail(email) ||
      !isLongEnough(password) ||
      !isMatch(password, passwordMatch)
    ) {
      setFormErrors(true);
    } else {
      setFormErrors(false);
    }
  }, [signupUser]);

  return (
    <div className={classes.root}>
      <AppBarNotLoggedIn cta={cta} />
      <div className={`${classes.grow}`}>
        <Paper className={classes.signupCard} elevation={3}>
          <Typography variant="h3" align="center">
            <b>Let's Get Started! </b>
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Create an account
          </Typography>
          <form className={classes.form} onSubmit={handleSignup}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Your email"
                  variant="outlined"
                  type="email"
                  name="email"
                  onChange={handleUserInput}
                  value={signupUser.email}
                  error={!isValidEmail(signupUser.email)}
                  helperText={
                    !isValidEmail(signupUser.email)
                      ? "Invalid email format"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Company name"
                  variant="outlined"
                  name="companyName"
                  onChange={handleUserInput}
                  value={signupUser.companyName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  onChange={handleUserInput}
                  value={signupUser.password}
                  error={!isLongEnough(signupUser.password)}
                  helperText={
                    !isLongEnough(signupUser.password)
                      ? "Password must be at least 6 characters"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm password"
                  variant="outlined"
                  type="password"
                  name="passwordMatch"
                  onChange={handleUserInput}
                  value={signupUser.passwordMatch}
                  error={
                    !isMatch(signupUser.password, signupUser.passwordMatch)
                  }
                  helperText={
                    !isMatch(signupUser.password, signupUser.passwordMatch)
                      ? "Passwords must be the same"
                      : ""
                  }
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={`${classes.button} ${classes.signupButton}`}>
              Create
            </Button>
          </form>
        </Paper>
        <Snackbar open={snackbarOpen}>
          <Alert onClose={() => setSnackbarOpen(false)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Signup;
