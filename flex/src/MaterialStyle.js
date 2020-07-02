import React from "react";
import { makeStyles } from "@material-ui/core";

const MaterialStyle = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: "#263442",
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  root: {
    width: "50%",
    "& .MuiFilledInput-root": {
      backgroundColor: "white",
    },
  },
  signUpWrapper: {
    width: "30%",
    "& .MuiFilledInput-root": {
      backgroundColor: "white",
    },
  },
  cardContent: {
    display: "flex",
    padding: "0 !important",
    "& > div": {
      padding: "35px",
    },
  },
  mt20: {
    marginTop: "20px",
  },
  mt10: {
    marginTop: "10px",
  },
  button: {
    backgroundColor: "#263442",
  },
  primary: {
    color: "#263442",
  },
  textWhite: {
    color: "white",
    backgroundColor: "#33475b",
    textAlign: "center",
  },
  loginWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  registerWrapper: {
    justifyContent: "center",
  },
  title: {},
  pos: {},
  dashboardWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column",
    margin: theme.spacing(3, 0),
    "& div": {
      backgroundColor: "white !important",
      paddingRight: 0,
      paddingLeft: 0,
    },
    "& > div": {
      width: "50%",
      marginTop: theme.spacing(2),
      "& > div:nth-of-type(2)": {
        flexGrow: 0.8,
        "& input, & textarea, & .MuiOutlinedInput-root": {
          backgroundColor: "white",
          border: "1px solid #000",
          borderRadius: theme.spacing(0.6),
          padding: theme.spacing(1.25),
          width: "100%",
        },
        "& .MuiOutlinedInput-root": {
          "& input": {
            padding: 0,
            border: 0,
          },
        },
      },
    },
    "& .MuiFilledInput-underline:before, label": {
      display: "none",
    },
    "& .MuiTextField-root": {
      margin: 0,
      "& > div": {
        paddingTop: 0,
      },
    },
    "& .MuiSelect-selectMenu": {
      padding: 0,
    },
    "& .MuiAutocomplete-root": {
      "& > div": {
        border: "1px solid #000",
        borderRadius: theme.spacing(0.6),
      },
      "& .MuiInputBase-root": {
        marginTop: 0,
        borderRadius: theme.spacing(0.6)
      },
      "& input": {
        border: "none !important",
      },
    },
  },
  startMeetingWrapper: {
    "& .MuiButton-containedPrimary": {
      margin: theme.spacing(1, 1),
    },
    '& .MuiIconButton-root': {
      backgroundColor: "transparent",
      color: '#fff',
      padding: theme.spacing(0, 1.25),
      margin: 0
    },
    '& video': {
      width: '40%'
    },
    '& .meetingIconWrapper': {
      display: 'flex',
      justifyContent: 'space-between',
      width: '50%',
      background: '#263442 !important',
      position: 'fixed',
      bottom: theme.spacing(1),
      borderRadius: theme.spacing(0.5),
      '& .MuiTypography-root': {
        color: 'grey',
        fontWeight: 'bold',
        padding: theme.spacing(2.5, 2.5),
        borderRight: '1px solid #000'
      },
      '& #stop_publish_button': {
        backgroundColor: "#9F2E40",
        borderRadius: 0,
        padding: theme.spacing(2.5, 2.5),
        marginRight: '-1px',
        borderTopRightRadius: theme.spacing(0.5),
        borderTopLeftRadius: theme.spacing(0),
        borderBottomRightRadius: theme.spacing(0.5),
        borderBottomLeftRadius: theme.spacing(0),
      }
    },
    '& .MuiIconButton-root:not(.Mui-disabled)': {
      // backgroundColor: '#fff',
      // boxShadow: '5px 5px 2px #909090'
    },
    '& .MuiIconButton-root.Mui-disabled': {
      // color: "#A9A9A9"
    }
  },
}));

export default MaterialStyle;
