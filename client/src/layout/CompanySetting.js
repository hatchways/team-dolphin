import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button, InputBase, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    inputBox: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius*4,
        backgroundColor: theme.palette.common.white,
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
        border: 'solid 1px rgba(229, 231, 235, 0.8)',
        width: '100%',
      },
      input: {
        marginLeft: theme.spacing(2),
        padding: theme.spacing(0.5, 1, 0.5, 0),
        flex: 1,
        '&::placeholder': {
            fontWeight: '450',
            opacity: "0.2",
        }
      },
      inputBase: {
        marginLeft: theme.spacing(2),
        padding: theme.spacing(0.5, 1, 0.5, 0),
        flex: 1,
      },
      buttonRemove: {
        borderRadius: theme.shape.borderRadius*4,
        width: "4em",
        height: "2em",
        backgroundColor: "#F0F3FE",
        color: theme.palette.primary.light
      },
      buttonAdd: {
        borderRadius: theme.shape.borderRadius*4,
        width: "4em",
        height: "2em",
      },
      buttonSave: {
        borderRadius: theme.shape.borderRadius*4,
        marginTop: theme.spacing(5),
        width: "10em",
        height: "3em",
      }
}))

 const CompanySetting = () => {
    const classes = useStyles();

    const [company, setCompany] = useState("Company ABC");
    const [value, setValue] = useState("");

    const updateHandler = () =>{
        setCompany(value);
        setValue("");
    }

    return (
        <>
        <Grid container spacing={2}  alignItems="flex-start">
            <Grid item xs={2}>
                <Typography variant="h4" style={{paddingTop:"6px"}}>
                    Your company
                </Typography>
            </Grid>
            <Grid item xs={6} >
                <div className={classes.inputBox}>
                    <InputBase
                    placeholder="Company name"
                    value={company}
                    classes={{input: classes.input, root: classes.inputBase}}
                    inputProps={{ 'aria-label': 'Company name' }}
                    />
                    <Button variant="text" onClick={() => setCompany("")}  className={classes.buttonRemove}>
                        REMOVE
                    </Button>
                </div>
                <div className={classes.inputBox}>
                    <InputBase
                    placeholder="Company name"
                    classes={{input: classes.input, root: classes.inputBase}}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    inputProps={{ 'aria-label': 'Company name' }}
                    />
                    <Button variant="contained" color="primary" onClick={updateHandler} className={classes.buttonAdd}>
                        ADD
                    </Button>
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={2}  alignItems="baseline">
            <Grid item xs={2}>
                <Typography variant="h4">
                    Weekly report
                </Typography>
            </Grid>
            <Grid item xs={6} >
                <div className={classes.inputBox}>
                    <InputBase
                    placeholder="subscribed email"
                    defaultValue="companyabc@gmail.com"
                    classes={{input: classes.input, root: classes.inputBase}}
                    inputProps={{ 'aria-label': 'subscribed email' }}
                    />
                </div>
            </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit" className={classes.buttonSave}>
            SAVE
        </Button>
        </>
    )
}

export default CompanySetting