import { Typography, Button, Paper, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import AppBarNotLoggedIn from "../layout/AppBarNotLoggedIn";

import { makeStyles } from "@material-ui/core/styles";

const cta = {
  description: "Don't have an account?",
  href: "/signup",
  buttonName: "SIGN UP",
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  grow: {
    flexGrow: 1,
  },
  loginCard: {
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
  loginButton: {
    margin: theme.spacing(5, 0),
    borderRadius: "30px",
    padding: "1rem 3rem",
  },
}));

const Login = () => {
  const classes = useStyles();

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <AppBarNotLoggedIn cta={cta} />
      <div className={`${classes.grow}`}>
        <Paper className={classes.loginCard} elevation={3}>
          <Typography variant="h3" align="center">
            <b>Welcome back!</b>
          </Typography>
          <Typography variant="h5" color="textSecondary" align="center">
            Log in to your account
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Your email"
                  variant="outlined"
                  type="email"
                  name="email"
                  onChange={handleUserInput}
                  value={loginUser.email}
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
                  value={loginUser.password}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={`${classes.button} ${classes.loginButton}`}>
              LOG IN
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default Login;
