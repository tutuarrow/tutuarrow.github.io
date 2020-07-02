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
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LockIcon from "@material-ui/icons/Lock";
import { Redirect } from "react-router-dom";
import MaterialStyle from "../../MaterialStyle";

const useStyles = MaterialStyle;

const CustomButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#263442",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#33475b",
    },
  },
}))(Button);

const Login = () => {
  const classes = useStyles();
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleChange = (type) => (event) => {
    type === "username"
      ? setUserName(event.target.value)
      : setPassword(event.target.value);
  };
  const handleValidate = () => {
    localStorage.setItem("isAdmin", username === "admin" ? "yes": "no")
    window.location.href = "/dashboard";
  };
  return (
    <Box overflow="hidden" className={classes.wrapper}>
      <Box
        py={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Grid sm="6" md="6">
              <Typography variant="h4">Login</Typography>
              <Typography color="textSecondary" className={classes.mt10}>
                Sign in to your account
              </Typography>
              <FormControl className={classes.mt10}>
                <Grid container alignItems="flex-end">
                  <Grid item>
                    <AccountBoxIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-basic"
                      label="Username"
                      variant="filled"
                      onChange={handleChange("username")}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="flex-end" className={classes.mt10}>
                  <Grid item>
                    <LockIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-basic"
                      label="Password"
                      variant="filled"
                      type="password"
                      onChange={handleChange("password")}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  className={`${classes.mt20} ${classes.loginWrapper}`}
                >
                  <CustomButton
                    variant="contained"
                    color="primary"
                    onClick={handleValidate}
                    className={classes.mt10}
                  >
                    Login
                  </CustomButton>
                  <Grid item alignItems="flex-end">
                    <Link>
                      <Typography className={classes.primary}>
                        Forgot Password ?
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid sm="6" md="6" className={classes.textWhite}>
              <Typography variant="h4">Sign up</Typography>
              <Typography className={classes.mt20}>
                Lorem ipsum dolor consectetur amet, aliqua elit consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </Typography>
              <Grid
                container
                className={`${classes.mt20} ${classes.registerWrapper}`}
              >
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Register Now !
                </CustomButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
