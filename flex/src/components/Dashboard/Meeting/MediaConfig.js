import "date-fns";
import React from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  withStyles,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import MaterialStyle from "../../../MaterialStyle";

const useStyles = MaterialStyle;

const CreateGroup = () => {
  const classes = useStyles();
  const [policy, setPolicy] = React.useState("");
  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setPolicy(event.target.value);
  };

  const CustomButton = withStyles((theme) => ({
    root: {
      backgroundColor: "#263442",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#33475b",
      },
    },
  }))(Button);
  return (
    <Box>
      <Grid className={classes.dashboardWrapper}>
        <Grid container>
          <Grid item md={4}>
            <Typography variant="subtitle1">Max Login Attempts</Typography>
          </Grid>
          <Grid item md={8}>
            <TextField id="standard-basic" label="Max Login Attempts" variant="filled" type="number" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={4}>
            <Typography variant="subtitle1">Session Time Limit</Typography>
          </Grid>
          <Grid item md={8}>
            <TextField id="standard-basic" label="Session Time Limit" variant="filled" type="number" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={3}>
            <CustomButton
              variant="contained"
              color="primary"
              className={`${classes.button} ${classes.mt10}`}
            >
              Save Changes
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateGroup;
