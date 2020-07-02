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
  MenuItem
} from "@material-ui/core";
import MaterialStyle from "../../../MaterialStyle";
import Autocomplete from '@material-ui/lab/Autocomplete';

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
            <Typography variant="subtitle1">Users</Typography>
          </Grid>
          <Grid item md={8}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={emails}
              getOptionLabel={(option) => option}
              defaultValue={[emails[0]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Multiple values"
                />
              )}
            />
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

const emails = [
    "example@email.com",
    "dummy@email.com",
    "alpha@email.com",
    "peterdoe@email.com",
    "johndoe@email.com"
];

export default CreateGroup;
