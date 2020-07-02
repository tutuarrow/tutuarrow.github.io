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

const CreatePolicy = () => {
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
            <Typography variant="subtitle1">Description</Typography>
          </Grid>
          <Grid item md={8}>
            <TextField
              id="filled-multiline-static"
              multiline
              rows={4}
              variant="filled"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <CustomButton
              variant="contained"
              color="primary"
              className={`${classes.button} ${classes.mt10}`}
            >
              Create
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePolicy;
