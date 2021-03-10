import React, { useState, useEffect } from 'react';

import { Typography, Button, Paper, TextField, Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { makeStyles } from "@material-ui/core/styles";
import AppBarNotLoggedIn from '../layout/AppBarNotLoggedIn';

const cta = {
  description: "Already have an account?",
  href: "/login",
  buttonName: "LOGIN",
}

const isLongEnough = (password) => {
  if (password.length === 0) return true; // just so the input field doesn't appear red at first
  return password.length >= 6
}

const isMatch = (password1, password2) => {
  return password1 === password2
}

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

  const [errors, setErrors] = useState(false)

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleUserInput = (e) => {
    setSignupUser({
      ...signupUser,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignup = (e) => {
    e.preventDefault();

    if(errors) {
      return setSnackbarOpen(true)
    }

    

    console.log("sign up successful")
  }

  useEffect(() => {
    const { password, password2 } = signupUser
    if(!isLongEnough(password) || !isMatch(password, password2)) {
      setErrors(true)
    } else {
      setErrors(false)
    }
  }, [signupUser])

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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField required fullWidth label="Your email" variant="outlined" type="email" name="email" onChange={handleUserInput} value={signupUser.email} /> 
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Company name" variant="outlined" name="companyName" onChange={handleUserInput} value={signupUser.companyName} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Password" variant="outlined" type="password" name="password" onChange={handleUserInput} value={signupUser.password} error={!isLongEnough(signupUser.password)}  helperText={!isLongEnough(signupUser.password) ? "Password must be at least 6 characters" : ""} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Confirm password" variant="outlined" type="password" name="password2" onChange={handleUserInput} value={signupUser.password2} error={!isMatch(signupUser.password, signupUser.password2)} helperText={!isMatch(signupUser.password, signupUser.password2) ? "Passwords must be the same" : ""} />
              </Grid>    
            </Grid>
            <Button variant="contained" color="primary" type="submit" className={`${classes.button} ${classes.signupButton}`}>Create</Button>
          </form>
        </Paper>
        <Snackbar open={snackbarOpen} onClose={false}>
          <Alert onClose={() => setSnackbarOpen(false)} severity="error">
            Please review the form
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default Signup
