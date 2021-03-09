import React, { useState } from 'react';

import { Typography, Button, Paper, TextField, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import AppBarNotLoggedIn from '../layout/AppBarNotLoggedIn';

const cta = {
  description: "Already have an account?",
  href: "/login",
  buttonName: "LOGIN",
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  grow: {
    flexGrow: 1,
  },
  signupCard: {
    width: "40%",
    margin: "auto",
    padding: "3rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "60%",
    textAlign: "center",
    marginTop: theme.spacing(5)
  },
  signupButton: {
    margin: theme.spacing(5, 0),
    borderRadius: "30px",
    padding: "1rem 3rem",
  },
}))

const Signup = () => {
  const classes = useStyles();

  const [signupUser, setSignupUser] = useState({
    email: "",
    companyName: "",
    password: "",
    password2: "",
  })

  const [errors, setErrors] = useState([])

  const handleUserInput = (e) => {
    setSignupUser({
      ...signupUser,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignup = (e) => {
    e.preventDefault();

    if(signupUser.password !== signupUser.password2) {
      return setErrors([...errors, "Passwords must match"])
    }

    console.log("sign up successful")
  }

  return (
    <div className={classes.root}>
      <AppBarNotLoggedIn cta={cta} />
      <div className={`${classes.grow} ${classes.flex}`}>
        <Paper className={classes.signupCard} elevation={3}>
          <Typography variant="h3" align="center">
            <b>Let's Get Started! </b>
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Create an account
          </Typography>
          <form className={classes.form} onSubmit={handleSignup}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required fullWidth label="Your email" variant="outlined" type="email" name="email" onChange={handleUserInput} value={signupUser.email} /> 
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Company name" variant="outlined" name="companyName" onChange={handleUserInput} value={signupUser.companyName} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Password" variant="outlined" type="password" name="password" onChange={handleUserInput} value={signupUser.password} error={signupUser.password.length < 6 && signupUser.password.length !== 0} helperText="Password must be at least 6 characters" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Confirm password" variant="outlined" type="password" name="password2" onChange={handleUserInput} error={signupUser.password !== signupUser.password2} value={signupUser.password2} />
              </Grid>    
            </Grid>
            <Button variant="contained" color="primary" type="submit" className={`${classes.button} ${classes.signupButton}`}>Create</Button>
          </form>
        </Paper>
      </div>
    </div>
  )
}

export default Signup
