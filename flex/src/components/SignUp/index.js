import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
  Link,
  withStyles,
} from "@material-ui/core";
import MaterialStyle from "../../MaterialStyle";

const useStyles = MaterialStyle;

const CustomButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#263442",
    textTransform: 'none',
    "&:hover": {
      backgroundColor: "#33475b",
    }
  },
}))(Button);

const SignUp = () => {
  const classes = useStyles();
  return (
    <Box overflow="hidden" className={classes.wrapper}>
      <Box
        py={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card className={classes.signUpWrapper}>
          <CardContent className={classes.cardContent}>
            <Grid sm="12" md="12">
              <Typography variant="h4" align="center">Sign up</Typography>
              <FormControl>
                <Grid container alignItems="flex-end">
                  <Typography variant="subtitle1" className={classes.mt20}>
                    Name
                  </Typography>
                </Grid>
                <Grid container alignItems="flex-end" className={classes.mt10}>
                  <TextField
                    id="standard-basic"
                    label="First Name"
                    variant="filled"
                  />
                </Grid>
                <Grid container alignItems="flex-end" className={classes.mt10}>
                  <TextField
                    id="standard-basic"
                    label="Last Name"
                    variant="filled"
                  />
                </Grid>
                <Grid container alignItems="flex-end">
                  <Typography variant="subtitle1" className={classes.mt20}>
                    Email
                  </Typography>
                </Grid>
                <Grid container alignItems="flex-end" className={classes.mt10}>
                  <TextField
                    id="standard-basic"
                    label="email@example.com"
                    variant="filled"
                    type="email"
                  />
                </Grid>
                <Grid container alignItems="flex-end">
                  <Typography variant="subtitle1" className={classes.mt20}>
                    Phone Number
                  </Typography>
                </Grid>
                <Grid container alignItems="flex-end" className={classes.mt10}>
                  <TextField
                    id="standard-basic"
                    label="+91 1234567890"
                    variant="filled"
                    type="number"
                  />
                </Grid>
                <Grid
                  container
                  className={`${classes.mt20} ${classes.loginWrapper}`}
                >
                  <CustomButton
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                    onClick={() => (window.location.href = "/dashboard")}
                  >
                    Sign Up
                  </CustomButton>
                </Grid>
              </FormControl>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SignUp;
