import {
  playURI,
} from "./spotifyInterface";

import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();



export function addSongToQueue(platform, songInfo) {
  console.log("AddSongToQueue");

  var currentSong = [platform, songInfo];

  // If no songs currently in queue, add song to queue and skip to song
  if (
    !global.isContentPlaying &
    (global.sessionQueue.length === 0) &
    (global.currentlyPlaying === "")
  ) {
    if (currentSong !== "None") {
      // Check the platform of the song
      if (currentSong[0] === "Spotify") {
        var songURI = currentSong[1]["uri"];

        playURI(songURI, global.spotifyAccessToken);

        global.isContentPlaying = true;

        // Set song as currently playing
        global.currentlyPlaying = currentSong;
      }
    }
  } else {
    // Push song to queue
    global.sessionQueue.push(currentSong);

    console.log("currentSong", currentSong);

    console.log("Added Song to Queue");
  }
}

export function addPlaylistToQueue(platform, playlistInfo) {
  console.log(platform);
  console.log(playlistInfo);

  const playlistID = playlistInfo.id;
  const userID = global.spotifyUserID;

  var trackCounter = 0;

  spotifyWebApi.getPlaylistTracks(userID, playlistID).then(
    (response) => {
      console.log(response.items);
      for (const key in response.items) {
        console.log(response.items[key]);
        var realSongInfo = response.items[key].track;
        var currentSong = [platform, realSongInfo];

        // If no song playing and queue empty, play first song in playlist and add rest to queue
        if (
          !global.isContentPlaying &
          (global.sessionQueue.length === 0) &
          (global.currentlyPlaying !== "") &
          (trackCounter === 0)
        ) {
          console.log("Playing first song..");
          console.log(realSongInfo);
          var songURI = realSongInfo["uri"];

          playURI(songURI, global.spotifyAccessToken);

          global.isContentPlaying = true;

          // Set song as currently playing
          global.currentlyPlaying = currentSong;

          trackCounter += 1;

          continue;
        }

        // Push song to queue
        global.sessionQueue.push(currentSong);

        console.log("currentSong", currentSong);

        console.log("Added Song to Queue");
      }
    },
    (reason) => {
      console.log("GOT TO ERROR (getPlaylistTracks)");
      // this.createNotification("error");
      console.error(reason); // Error!
    }
  );
}

// Removes first item from queue and returns it
export function popQueue() {
  var upNext = global.sessionQueue.shift();

  return upNext;
}
