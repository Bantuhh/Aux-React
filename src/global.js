import { playURI } from "./utils/spotifyInterface";
import { popQueue } from "./utils/queueInterface";

global.spotifyLoggedIn = false;

global.spotifyAccessToken = "";

global.spotifyFavoritesResults = {};
global.spoitfyPlaylistsResults = {};

global.spotifyTrackSearchResults = {};

global.lastSpotifySearchQuery = "";

// Queue
class QueueItem {
  constructor(platform, songInfo) {
    this.platform = platform;
    this.songInfo = songInfo;
  }
}

global.QueueItem = QueueItem;

global.sessionQueue = [];

global.currentlyPlaying = "";

global.isContentPlaying = false;

global.spotifyDeviceID = "";

// Tries to skip song one too many times, only do it on attempt 2
global.trackEndSkipAttempt = 0;

global.skipSong = () => {
  console.log("Skipping song...");

  // queue may be empty, but there may be a song playing
  if (global.sessionQueue.length === 0) {
    console.log("queue empty");
    if (!global.isContentPlaying) {
      // no song playing and queue empty
      global.isContentPlaying = false;
      global.currentlyPlaying = "";
    }
    return;
  }

  var upNext = popQueue();
  console.log("popped song", upNext);

  console.log("Playing next song");

  // Check Platform
  if (upNext[0] === "Spotify") {
    var songURI = upNext[1]["uri"];

    playURI(songURI, global.spotifyAccessToken);
  } else if (upNext[0] === "Youtube") {
    console.log(global.youtubePlayer);
    global.youtubePlayer.loadVideoById(upNext[1].id.videoId, 0);
  }

  global.isContentPlaying = true;
  global.currentlyPlaying = upNext;
};

global.youtubeSearchResults = [];

global.youtubePlayer = "";
