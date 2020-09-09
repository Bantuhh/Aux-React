import {
  viewOnSpotify,
  queueSpotifySong,
  skipSongSpotify,
} from "./spotifyInterface";

export function addSongToQueue(platform, songInfo) {
  console.log(platform);
  console.log(songInfo);

  var currentSong = [platform, songInfo];

  if (global.sessionQueue.length === 0) {
    if (currentSong != "None") {
      // Check the platform of the song
      if (currentSong[0] == "Spotify") {
        var songURI = currentSong[1]["uri"];
        console.log("songURI", songURI);

        queueSpotifySong(songURI, global.spotifyAccessToken);
        skipSongSpotify(global.spotifyAccessToken);

        global.isContentPlaying = true;
      }
    }

    global.sessionQueue.push([platform, songInfo]);

    console.log(global.sessionQueue);
  }
}

export function addPlaylistToQueue(platform, playlistInfo) {
  console.log(platform);
  console.log(playlistInfo);
}
