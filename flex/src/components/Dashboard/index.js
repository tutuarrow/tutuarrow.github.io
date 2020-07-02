import React from "react";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  ListSubheader,
  Grid,
  ClickAwayListener,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Logo from "../../Logo.png";
import clsx from "clsx";
import AddBoxIcon from "@material-ui/icons/AddBox";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PolicyOutlinedIcon from "@material-ui/icons/PolicyOutlined";
import NewMeeting from "./Meeting/NewMeeting";
import CreateUser from "./Meeting/CreateUser";
import VideocamIcon from "@material-ui/icons/Videocam";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateGroup from "./Meeting/CreateGroup";
import CreatePolicy from "./Meeting/CreatePolicy";
import MediaConfig from "./Meeting/MediaConfig";
import UserGroup from "./Meeting/UserGroup";
import JoinMeeting from "./Meeting/JoinMeeting";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#263442",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "& img": {
      marginTop: theme.spacing(1.25),
      transform: "scale(1.2)",
    },
  },
  white: {
    color: "#fff",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const [element, setElement] = React.useState("");
  const [admin, setAdmin] = React.useState(localStorage.getItem("isAdmin"));
  const [leftstate, setLeftState] = React.useState(false);
  const [rightstate, setRightState] = React.useState(false);

  const toggleDrawer = (anchor) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setLeftState(!leftstate);
  };
  const toggleDrawerRight = (anchor) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setRightState(!rightstate);
  };

  const handleClick = (type, event) => {
    setElement(type);
  };

  const handleClickAwayLeft = () => {
    setLeftState(false);
  };

  const handleClickAwayRight = () => {
    setRightState(false);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      {leftstate == true && localStorage.getItem("isAdmin") == "yes" ? (
        <>
          <List>
            <ListSubheader>User & Groups</ListSubheader>
            <ListItem
              button
              key={"Create User"}
              onClick={(e) => handleClick("createUser", e)}
            >
              <ListItemIcon>
                <PersonAddOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Create User"} />
            </ListItem>
            <ListItem
              button
              key={"Create Group"}
              onClick={(e) => handleClick("createGroup", e)}
            >
              <ListItemIcon>
                <GroupIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Create Group"} />
            </ListItem>
            <ListItem
              button
              key={"Policies"}
              onClick={(e) => handleClick("createPolicy", e)}
            >
              <ListItemIcon>
                <PolicyOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Policies"} />
            </ListItem>
          </List>
          <List>
            <ListSubheader>System Settings</ListSubheader>
            <ListItem
              button
              key={"Media Server Configs"}
              onClick={(e) => handleClick("mediaConfig", e)}
            >
              <ListItemIcon>
                <SettingsIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Media Server Configs"} />
            </ListItem>
          </List>
        </>
      ) : (
        ""
      )}
      {leftstate == true && localStorage.getItem("isAdmin") == "no" ? (
        <>
          <List>
            <ListSubheader>My Groups</ListSubheader>
            <ListItem
              button
              key={"Group 1"}
              onClick={(e) => handleClick("userGroup", e)}
            >
              <ListItemIcon>
                <GroupIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Group 1"} />
            </ListItem>
            <ListItem
              button
              key={"Group 2"}
              onClick={(e) => handleClick("userGroup", e)}
            >
              <ListItemIcon>
                <GroupIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Group 2"} />
            </ListItem>
            <ListItem
              button
              key={"Group 3"}
              onClick={(e) => handleClick("userGroup", e)}
            >
              <ListItemIcon>
                <GroupIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Group 3"} />
            </ListItem>
          </List>
          <List>
            <ListSubheader>Meetings</ListSubheader>
            <ListItem
              button
              key={"Create"}
              onClick={(e) => handleClick("newMeeting", e)}
            >
              <ListItemIcon>
                <VideocamIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Create"} />
            </ListItem>
            <ListItem
              button
              key={"Join"}
              onClick={(e) => handleClick("joinMeeting", e)}
            >
              <ListItemIcon>
                <AddBoxIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Join"} />
            </ListItem>
          </List>
        </>
      ) : (
        ""
      )}
      {rightstate == true ? (
        <List>
          <ListSubheader>Nothing to show...</ListSubheader>
        </List>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <Box>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <React.Fragment key={"left"}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer("left")}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={"left"}
              open={leftstate}
              onClose={toggleDrawer("left", false)}
            >
              <ClickAwayListener onClickAway={handleClickAwayLeft}>
                {list("left")}
              </ClickAwayListener>
            </Drawer>
          </React.Fragment>
          <Typography className={classes.title} variant="caption" noWrap>
            <img src={Logo} alt="Logo" height={40} />
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <React.Fragment key={"right"}>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawerRight("right")}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={"right"}
                open={rightstate}
                onClose={toggleDrawerRight("right", false)}
              >
                <ClickAwayListener onClickAway={handleClickAwayRight}>
                  {list("right")}
                </ClickAwayListener>
              </Drawer>
            </React.Fragment>
          </div>
        </Toolbar>
      </AppBar>
      <Box className={classes.dashContentWrapper}>
        <Grid>{element === "newMeeting" && <NewMeeting />}</Grid>
        <Grid>{element === "createUser" && <CreateUser />}</Grid>
        <Grid>{element === "createGroup" && <CreateGroup />}</Grid>
        <Grid>{element === "createPolicy" && <CreatePolicy />}</Grid>
        <Grid>{element === "mediaConfig" && <MediaConfig />}</Grid>
        <Grid>{element === "userGroup" && <UserGroup />}</Grid>
        <Grid>{element === "joinMeeting" && <JoinMeeting />}</Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
