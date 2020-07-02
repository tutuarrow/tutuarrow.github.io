import "date-fns";
import React from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  withStyles,
  Button,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import MaterialStyle from "../../../MaterialStyle";
import StartMeeting from "./StartMeeting";

const useStyles = MaterialStyle;

const NewMeeting = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [startMeeting, setStartMeeting] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [meetingId, setMeetingId] = React.useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleChange = (e) => {
    setMeetingId(e.currentTarget.value);
    setValue(e.currentTarget.value);
  };

  const handleStartMeeting = () => {
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
              <Typography variant="subtitle1">Meeting ID </Typography>
            </Grid>
            <Grid item md={8}>
              <Typography variant="subtitle1">
                <TextField
                  id="standard-basic"
                  label=""
                  variant="filled"
                  value={value}
                  onChange={handleChange}
                />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <Typography variant="subtitle1">Title </Typography>
            </Grid>
            <Grid item md={8}>
              <TextField
                id="standard-basic"
                label=""
                variant="filled"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <Typography variant="subtitle1">Date Time</Typography>
            </Grid>
            <Grid item md={8}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="MM/dd/yyyy HH:mm"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  inputVariant="outlined"
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <Typography variant="subtitle1">Attendee's / Group</Typography>
            </Grid>
            <Grid item md={8}>
              <TextField id="standard-basic" label="" variant="filled" />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <Typography variant="subtitle1">Meeting Description</Typography>
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
                Schedule
              </CustomButton>
            </Grid>
            <Grid item md={2}>
              <CustomButton
                variant="contained"
                color="primary"
                className={`${classes.button} ${classes.mt10}`}
                onClick={handleStartMeeting}
              >
                Start Now
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default NewMeeting;
