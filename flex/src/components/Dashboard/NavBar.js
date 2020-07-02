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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Logo from "../../Logo.jpeg";
import clsx from "clsx";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import AlbumOutlinedIcon from "@material-ui/icons/AlbumOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import PolicyOutlinedIcon from "@material-ui/icons/PolicyOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import AlbumIcon from "@material-ui/icons/Album";

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

const NavBar = (elem) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const [element, setElement] = React.useState(elem);
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    console.log('asd')
    setState({ ...state, [anchor]: !state[anchor] });
  };

  const handleClick = (type, event) => {
    setElement(type);
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
      {anchor === "left" ? (
        <>
          <List>
            <ListSubheader>Media Server</ListSubheader>
            <ListItem
              button
              key={"New meeting"}
              onClick={(e) => handleClick("newMeeting", e)}
            >
              <ListItemIcon>
                <AddBoxIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"New meeting"} />
            </ListItem>
            <ListItem
              button
              key={"Mute meeting"}
            >
              <ListItemIcon>
                <VolumeOffOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Mute meeting"} />
            </ListItem>
            <ListItem button key={"Share meeting"}>
              <ListItemIcon>
                <ShareOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Share meeting"} />
            </ListItem>
            <ListItem button key={"Record Meeting"}>
              <ListItemIcon>
                <AlbumOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Record Meeting"} />
            </ListItem>
          </List>
          <List>
            <ListSubheader>User Profile</ListSubheader>
            <ListItem button key={"Due sessions"}>
              <ListItemIcon>
                <AccessTimeOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Due Sessions"} />
            </ListItem>
            <ListItem button key={"Update profile"}>
              <ListItemIcon>
                <AccountCircle className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Update Profile"} />
            </ListItem>
            <ListItem button key={"Meeting invitation"}>
              <ListItemIcon>
                <EventOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Meeting Invitation"} />
            </ListItem>
          </List>
          <List>
            <ListSubheader>Settings</ListSubheader>
            <ListItem button key={"Create user"}>
              <ListItemIcon>
                <PersonAddOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Create user"} />
            </ListItem>
            <ListItem button key={"Create role"}>
              <ListItemIcon>
                <AssignmentIndOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Create role"} />
            </ListItem>
            <ListItem button key={"Create policy"}>
              <ListItemIcon>
                <PolicyOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Create policy"} />
            </ListItem>
            <ListItem button key={"Reset Password"}>
              <ListItemIcon>
                <LockOpenOutlinedIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Reset Password"} />
            </ListItem>
            <ListItem button key={"Config Recording"}>
              <ListItemIcon>
                <AlbumIcon className={classes.white} />
              </ListItemIcon>
              <ListItemText primary={"Config Recording"} />
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          <ListSubheader>Nothing to show...</ListSubheader>
        </List>
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
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
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
                onClick={toggleDrawer("right")}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
              >
                {list("right")}
              </Drawer>
            </React.Fragment>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
