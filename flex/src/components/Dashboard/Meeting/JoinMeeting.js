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
import StartMeeting from './StartMeeting';

const useStyles = MaterialStyle;

const JoinMeeting = () => {
  const classes = useStyles();
  const [meetingId, setMeetingId] = React.useState("");
  const [startMeeting, setStartMeeting] = React.useState(false);

  const handleChange = (event) => {
    setMeetingId(event.target.value);
    console.log(meetingId);
  };

  const handleClick = () => {
    setStartMeeting(true);
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
        {startMeeting ? (
        <StartMeeting meetingId={meetingId} />
      ) : (
      <Grid className={classes.dashboardWrapper}>
        <Grid container>
          <Grid item md={4}>
            <Typography variant="subtitle1">Meeting Id</Typography>
          </Grid>
          <Grid item md={8}>
            <TextField id="standard-basic" label="Meetind Id" variant="filled" onChange={handleChange} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={2}>
            <CustomButton
              variant="contained"
              color="primary"
              className={`${classes.button} ${classes.mt10}`}
              onClick={handleClick}
            >
              Join
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
      )}
    </Box>
  );
};

export default JoinMeeting;
