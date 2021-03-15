import React from 'react';

import { AppBar, Toolbar, Typography, Button, Link } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  button: {
    borderWidth: "2px",
    borderRadius: "30px",
    padding: "1rem 3rem",
  },
  marginLeft: {
    marginLeft: "2rem",
  },
  toolbar: {
    height: "10vh",
    display: "flex",
    alignItems: "center",
  },
}))

const AppBarNotLoggedIn = ({ cta }) => {
  const classes = useStyles();

  return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4">
            mentions
          </Typography>
          <Typography variant="h4" color="secondary">
            crawler.
          </Typography>
          <div className={classes.grow}></div>
          <Typography variant="h6">
            {cta.description}
          </Typography>
          <Button variant="outlined" color="inherit" className={`${classes.button} ${classes.marginLeft}`}>
            <Link href={cta.href} color="inherit" underline="none">{cta.buttonName}</Link>
          </Button>
        </Toolbar>
      </AppBar>
  )
}

export default AppBarNotLoggedIn
