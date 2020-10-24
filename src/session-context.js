import React from "react";

export const SessionContext = React.createContext({
  sessionQueue: [],
  currentlyPlaying: "",
  isContentPlaying: false,
  updateSessionQueue: () => {},
  spotifyAccessToken: "",
  youtubePlayer: "",
  loadYTVideo: () => {},
});
