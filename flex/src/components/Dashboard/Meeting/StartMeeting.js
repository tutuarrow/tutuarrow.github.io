import React, { useEffect, ReactDOM } from "react";
import $ from "jquery";
import WebRTCAdaptor from "./webrtc_adaptor";
import {
  Grid,
  Box,
  Button,
  withStyles,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MaterialStyle from "../../../MaterialStyle";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import StopIcon from "@material-ui/icons/Stop";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import MicOffIcon from "@material-ui/icons/MicOff";
import MicIcon from "@material-ui/icons/Mic";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
import CallEndIcon from "@material-ui/icons/CallEnd";
import PanToolIcon from "@material-ui/icons/PanTool";
import MessageIcon from "@material-ui/icons/Message";

const useStyles = MaterialStyle;

const StartMeeting = (props) => {
  const classes = useStyles();
  const [data, setData] = React.useState(false);
  const [timeDuration, setTimeDuration] = React.useState("00:00");
  var streamId = props.meetingId;
  var webRTCAdaptor = "";
  var token = "";
  var playOnly = false;
  var isScreenOff = true;

  var join_publish_button = document.getElementById("join_publish_button");
  var stop_publish_button = document.getElementById("stop_publish_button");
  var share_screen_button = document.getElementById("share_screen_button");
  var stop_share_screen_button = document.getElementById(
    "stop_share_screen_button"
  );

  var turn_off_camera_button = document.getElementById(
    "turn_off_camera_button"
  );
  var turn_on_camera_button = document.getElementById("turn_on_camera_button");
  var mute_mic_button = document.getElementById("mute_mic_button");
  var unmute_mic_button = document.getElementById("unmute_mic_button");

  var roomNameBox = document.getElementById("roomName");

  var roomOfStream = new Array();

  var publishStreamId;
  var isDataChannelOpen = false;
  var isMicMuted = false;
  var isCameraOff = false;

  // var vid = document.getElementById("localVideo");
  // vid.ontimeupdate = () => {
  //   setTimeDuration(vid.currentTime);
  // };

  function turnOffLocalCamera() {
    webRTCAdaptor.turnOffLocalCamera();
    isCameraOff = true;
    handleCameraButtons();
    sendNotificationEvent("CAM_TURNED_OFF");
  }

  function turnOnLocalCamera() {
    webRTCAdaptor.turnOnLocalCamera();
    isCameraOff = false;
    handleCameraButtons();
    sendNotificationEvent("CAM_TURNED_ON");
  }

  function muteLocalMic() {
    webRTCAdaptor.muteLocalMic();
    isMicMuted = true;
    handleMicButtons();
    sendNotificationEvent("MIC_MUTED");
  }

  function unmuteLocalMic() {
    webRTCAdaptor.unmuteLocalMic();
    isMicMuted = false;
    handleMicButtons();
    sendNotificationEvent("MIC_UNMUTED");
  }

  function sendNotificationEvent(eventType) {
    if (isDataChannelOpen) {
      var notEvent = { streamId: publishStreamId, eventType: eventType };

      webRTCAdaptor.sendData(publishStreamId, JSON.stringify(notEvent));
    } else {
      console.log(
        "Could not send the notification because data channel is not open."
      );
    }
  }

  function handleCameraButtons() {
    if (isCameraOff) {
      turn_off_camera_button.disabled = true;
      turn_on_camera_button.disabled = false;
    } else {
      turn_off_camera_button.disabled = false;
      turn_on_camera_button.disabled = true;
    }
  }

  function handleScreenButtons() {
    if (isScreenOff) {
      stop_share_screen_button.disabled = true;
      share_screen_button.disabled = false;
    } else {
      stop_share_screen_button.disabled = false;
      share_screen_button.disabled = true;
    }
  }

  function handleMicButtons() {
    if (isMicMuted) {
      mute_mic_button.disabled = true;
      unmute_mic_button.disabled = false;
    } else {
      mute_mic_button.disabled = false;
      unmute_mic_button.disabled = true;
    }
  }

  function handleNotificationEvent(obj) {
    console.log("Received data : ", obj.event.data);
    var notificationEvent = JSON.parse(obj.event.data);
    if (notificationEvent != null && typeof notificationEvent == "object") {
      var eventStreamId = notificationEvent.streamId;
      var eventTyp = notificationEvent.eventType;

      if (eventTyp == "CAM_TURNED_OFF") {
        console.log("Camera turned off for : ", eventStreamId);
      } else if (eventTyp == "CAM_TURNED_ON") {
        console.log("Camera turned on for : ", eventStreamId);
      } else if (eventTyp == "MIC_MUTED") {
        console.log("Microphone muted for : ", eventStreamId);
      } else if (eventTyp == "MIC_UNMUTED") {
        console.log("Microphone unmuted for : ", eventStreamId);
      }
    }
  }

  function joinRoom() {
    webRTCAdaptor.joinRoom(roomNameBox.value, streamId);
  }

  function leaveRoom() {
    webRTCAdaptor.leaveFromRoom(roomNameBox.value);
    unmuteLocalMic();
    turnOnLocalCamera();

    for (var node in document.getElementById("players").childNodes) {
      if (node.tagName == "Box" && node.id != "localVideo") {
        document.getElementById("players").removeChild(node);
      }
    }
  }

  function shareScreen() {
    isScreenOff = false;
    webRTCAdaptor.switchDesktopCaptureWithCamera(streamId);
    handleScreenButtons();
  }

  function stopShareScreen() {
    isScreenOff = true;
    webRTCAdaptor.switchVideoCameraCapture(streamId);
    handleScreenButtons();
  }

  function publish(streamName, token) {
    publishStreamId = streamName;
    webRTCAdaptor.publish(streamName, token);
  }

  function streamInformation(obj) {
    webRTCAdaptor.play(obj.streamId, token, roomNameBox.value);
  }

  function playVideo(obj) {
    var room = roomOfStream[obj.streamId];
    console.log(
      "new stream available with id: " + obj.streamId + "on the room:" + room
    );

    var video = document.getElementById("remoteVideo" + obj.streamId);

    if (video == null) {
      createRemoteVideo(obj.streamId);
      video = document.getElementById("remoteVideo" + obj.streamId);
    }

    video.srcObject = obj.stream;
  }

  function createRemoteVideo(streamId) {
    var player = document.createElement("Box");
    player.className = "col-sm-3";
    player.id = "player" + streamId;
    player.innerHTML =
      '<video id="remoteVideo' + streamId + '"controls autoplay></video>';
    document.getElementById("players").appendChild(player);
  }

  function removeRemoteVideo(streamId) {
    var video = document.getElementById("remoteVideo" + streamId);
    if (video != null) {
      var player = document.getElementById("player" + streamId);
      video.srcObject = null;
      document.getElementById("players").removeChild(player);
    }
  }

  function startAnimation() {
    $("#broadcastingInfo").fadeIn(800, function () {
      $("#broadcastingInfo").fadeOut(800, function () {
        var state = webRTCAdaptor.signallingState(publishStreamId);
        if (state != null && state != "closed") {
          var iceState = webRTCAdaptor.iceConnectionState(publishStreamId);
          if (
            iceState != null &&
            iceState != "failed" &&
            iceState != "disconnected"
          ) {
            startAnimation();
          }
        }
      });
    });
  }

  var pc_config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  var sdpConstraints = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false,
  };

  var mediaConstraints = {
    video: true,
    audio: true,
  };

  var appName = window.location.pathname.substring(
    0,
    window.location.pathname.lastIndexOf("/") + 1
  );
  var path =
    window.location.hostname +
    ":" +
    window.location.port +
    appName +
    "websocket";
  var websocketURL = "wss://flexms.alyssum.global:5443/WebRTCAppEE/websocket";

  if (window.location.protocol.startsWith("https")) {
    websocketURL = "wss://flexms.alyssum.global:5443/WebRTCAppEE/websocket";
  }

  webRTCAdaptor = new WebRTCAdaptor({
    websocket_url: websocketURL,
    mediaConstraints: mediaConstraints,
    peerconnection_config: {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    },
    sdp_constraints: sdpConstraints,
    localVideoId: "localVideo",
    isPlayMode: playOnly,
    debug: true,
    callback: function (info, obj) {
      if (info == "initialized") {
        console.log("initialized");
        join_publish_button.disabled = false;
        stop_publish_button.disabled = true;
        share_screen_button.disabled = true;
      } else if (info == "joinedTheRoom") {
        var room = obj.ATTR_ROOM_NAME;
        roomOfStream[obj.streamId] = room;
        console.log("joined the room: " + roomOfStream[obj.streamId]);
        console.log(obj);
        if (playOnly) {
          join_publish_button.disabled = true;
          stop_publish_button.disabled = false;
          share_screen_button.disabled = false;
        } else {
          publish(obj.streamId, token);
        }
        var streams = obj.streams;

        if (obj.streams != null) {
          obj.streams.forEach(function (item) {
            console.log(item);
            webRTCAdaptor.play(item, token, roomNameBox.value);
          });
        }
      } else if (info == "streamJoined") {
        console.debug("stream joined with id " + obj.streamId);
        webRTCAdaptor.play(obj.streamId, token, roomNameBox.value);
      } else if (info == "newStreamAvailable") {
        playVideo(obj);
      } else if (info == "streamLeaved") {
        console.debug(" stream leaved with id " + obj.streamId);
        removeRemoteVideo(obj.streamId);
      } else if (info == "publish_started") {
        //stream is being published
        console.debug("publish started to room: " + roomOfStream[obj.streamId]);
        join_publish_button.disabled = true;
        stop_publish_button.disabled = false;
        share_screen_button.disabled = false;
        startAnimation();
      } else if (info == "publish_finished") {
        //stream is being finished
        console.debug("publish finished");
        join_publish_button.disabled = false;
        stop_publish_button.disabled = true;
        share_screen_button.disabled = true;
      } else if (info == "browser_screen_share_supported") {
        console.log("browser screen share supported");
      } else if (info == "screen_share_stopped") {
        console.log("screen share stopped");
      } else if (info == "leavedFromRoom") {
        var room = obj.ATTR_ROOM_NAME;
        console.debug("leaved from the room:" + room);
        if (playOnly) {
          join_publish_button.disabled = false;
          stop_publish_button.disabled = true;
          share_screen_button.disabled = true;
        }
      } else if (info == "closed") {
        //console.log("Connection closed");
        if (typeof obj != "undefined") {
          console.log("Connecton closed: " + JSON.stringify(obj));
        }
      } else if (info == "play_finished") {
        console.log("play_finished");
        var video = document.getElementById("remoteVideo" + obj.streamId);
        if (video != null) {
          video.srcObject = null;
        }
      } else if (info == "streamInformation") {
        streamInformation(obj);
      } else if (info == "data_channel_opened") {
        console.log("Data Channel open for stream id", obj);
        isDataChannelOpen = true;
      } else if (info == "data_channel_closed") {
        console.log("Data Channel closed for stream id", obj);
        isDataChannelOpen = false;
      } else if (info == "data_received") {
        handleNotificationEvent(obj);
      }
    },
    callbackError: function (error, message) {
      //some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError

      console.log("error callback: " + JSON.stringify(error));
      // var errorMessage = JSON.stringify(error);
      // if (typeof message != "undefined") {
      //   errorMessage = message;
      // }
      // var errorMessage = JSON.stringify(error);
      // if (error.indexOf("NotFoundError") != -1) {
      //   errorMessage =
      //     "Camera or Mic are not found or not allowed in your device.";
      // } else if (
      //   error.indexOf("NotReadableError") != -1 ||
      //   error.indexOf("TrackStartError") != -1
      // ) {
      //   errorMessage =
      //     "Camera or Mic is being used by some other process that does not not allow these devices to be read.";
      // } else if (
      //   error.indexOf("OverconstrainedError") != -1 ||
      //   error.indexOf("ConstraintNotSatisfiedError") != -1
      // ) {
      //   errorMessage =
      //     "There is no device found that fits your video and audio constraints. You may change video and audio constraints.";
      // } else if (
      //   error.indexOf("NotAllowedError") != -1 ||
      //   error.indexOf("PermissionDeniedError") != -1
      // ) {
      //   errorMessage = "You are not allowed to access camera and mic.";
      // } else if (error.indexOf("TypeError") != -1) {
      //   // errorMessage = "Video/Audio is required.";
      // } else if (error.indexOf("UnsecureContext") != -1) {
      //   errorMessage =
      //     "Fatal Error: Browser cannot access camera and mic because of unsecure context. Please install SSL and access via https";
      // } else if (error.indexOf("WebSocketNotSupported") != -1) {
      //   errorMessage = "Fatal Error: WebSocket not supported in this browser";
      // } else if (error.indexOf("no_stream_exist") != -1) {
      //   //TODO: removeRemoteVideo(error.streamId);
      // } else if (error.indexOf("data_channel_error") != -1) {
      //   errorMessage = "There was a error during data channel communication";
      // }

      // alert(errorMessage);
    },
  });
  useEffect(() => {
    setData(true);
    $(document).ready(() => {
      var vid = document.getElementById("localVideo");
      vid.ontimeupdate = function () {
        myFunction();
      };
      function myFunction() {
        var d = Number(parseInt(vid.currentTime));
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);
        var mDisplay = m > 0 && m <= 9 ? "0" + m + ':' : m > 0 && m > 9 ? m + ':' : "00:";
        var sDisplay = s > 0 && s <= 9 ? "0" + s : s > 0 && s > 9 ? s : "00";
        document.getElementById("timeDuration").innerHTML = mDisplay + sDisplay;
      }
    });
  }, [data]);
  return (
    <Grid sm="12" md="12" className={classes.dashboardWrapper}>
      <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
      <Box className={classes.startMeetingWrapper}>
        <Box mb={2}>
          <Typography variant="h5">Meeting ID: {props.meetingId}</Typography>
          <input
            type="text"
            class="form-control"
            value="room1"
            id="roomName"
            placeholder="Type room name"
            style={{ display: "none" }}
          ></input>
        </Box>
        <Box>
          <Box id="players">
            <Box>
              <video
                id="localVideo"
                autoPlay
                muted
                playsInline
              ></video>
            </Box>
          </Box>
          <Box>
            <Box>
              <Box className="meetingIconWrapper">
                <Typography variant="subtitle1" id="timeDuration">
                  {timeDuration}
                </Typography>
                <Tooltip title="Join">
                  <IconButton
                    aria-label="Join Room"
                    onClick={joinRoom}
                    id="join_publish_button"
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                  >
                    <MeetingRoomIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Turn off camera">
                  <IconButton
                    id="turn_off_camera_button"
                    onClick={turnOffLocalCamera}
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                  >
                    <VideocamOffIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Turn on camera">
                  <IconButton
                    id="turn_on_camera_button"
                    onClick={turnOnLocalCamera}
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                  >
                    <VideocamIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Mute">
                  <IconButton
                    id="mute_mic_button"
                    onClick={muteLocalMic}
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                  >
                    <MicOffIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Unmute">
                  <IconButton
                    id="unmute_mic_button"
                    onClick={unmuteLocalMic}
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                  >
                    <MicIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Screen Share">
                  <IconButton
                    onClick={shareScreen}
                    id="share_screen_button"
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                  >
                    <ScreenShareIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Stop Sharing">
                  <IconButton
                    onClick={stopShareScreen}
                    id="stop_share_screen_button"
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                  >
                    <StopScreenShareIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Raise Hand">
                  <IconButton
                    // onClick={stopShareScreen}

                    id="raise_hand_button"
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                  >
                    <PanToolIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Message">
                  <IconButton
                    // onClick={stopShareScreen}

                    id="message_button"
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                  >
                    <MessageIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Leave">
                  <IconButton
                    onClick={leaveRoom}
                    id="stop_publish_button"
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.mt10}`}
                  >
                    <CallEndIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default StartMeeting;
