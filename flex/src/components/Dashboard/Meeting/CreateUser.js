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
  Select, InputLabel,
  MenuItem
} from "@material-ui/core";
import MaterialStyle from "../../../MaterialStyle";

const useStyles = MaterialStyle;

const CreateUser = () => {
  const classes = useStyles();
  const [country, setCountry] = React.useState('');
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
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
            <Typography variant="subtitle1">Email ID</Typography>
          </Grid>
          <Grid item md={8}>
            <TextField
              id="standard-basic"
              label="email@example.com"
              variant="filled"
              type="email"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={4}>
            <Typography variant="subtitle1">Mobile No.</Typography>
          </Grid>
          <Grid item md={8}>
            <TextField
              id="standard-basic"
              label="+91 1234567890"
              variant="filled"
              type="number"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={4}>
            <Typography variant="subtitle1">Country</Typography>
          </Grid>
          <Grid item md={8}>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={country}
                onChange={handleChange}
                label="Country"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value='usa'>USA</MenuItem>
                <MenuItem value='india'>India</MenuItem>
                <MenuItem value='uk'>UK</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={4}>
            <Typography variant="subtitle1">Role</Typography>
          </Grid>
          <Grid item md={8}>
          <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={role}
                onChange={handleRoleChange}
                label="Role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='user'>User</MenuItem>
              </Select>
            </FormControl>
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

export default CreateUser;
