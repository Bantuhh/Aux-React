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
