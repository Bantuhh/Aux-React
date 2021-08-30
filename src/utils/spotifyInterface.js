var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function (resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };

// Spotify Actions
function viewOnSpotify(songInfo) {
  let url = songInfo.external_urls.spotify;

  var win = window.open(url, "_blank");
  win.focus();
}
exports.viewOnSpotify = viewOnSpotify;

function pause(token) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2,
        fetch("https://api.spotify.com/v1/me/player/pause", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          method: "PUT",
        }),
      ];
    });
  });
}
exports.pause = pause;

function play(token) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2,
        fetch("https://api.spotify.com/v1/me/player/play", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          method: "PUT",
        }),
      ];
    });
  });
}
exports.play = play;

function playURI(uri, token) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2,
        fetch(
          "https://api.spotify.com/v1/me/player/play?device_id=" +
            global.spotifyDeviceID
            ,
          {
            body: JSON.stringify({ uris: [uri] }),
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            method: "PUT",
          }
        ),
      ];
    });
  });
}
exports.playURI = playURI;

function getDevices(token) {
  return fetch(`https://api.spotify.com/v1/me/player/devices`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((d) => d.json());
}
exports.getDevices = getDevices;

function queueSpotifySong(uri, token) {
  return fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}
exports.queueSpotifySong = queueSpotifySong;

function skipSongSpotify(token) {
  return fetch(`https://api.spotify.com/v1/me/player/next`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}
exports.skipSongSpotify = skipSongSpotify;

function getPlaybackState(token) {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((d) => {
    if (d.status === 204) {
      return;
    }

    return d.json();
  });
}
exports.getPlaybackState = getPlaybackState;

function seek(position, token) {
  return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
          return [2, fetch("https://api.spotify.com/v1/me/player/seek?position_ms=" + position, {
                  headers: {
                      Authorization: "Bearer " + token,
                      'Content-Type': 'application/json',
                  },
                  method: 'PUT',
              })];
      });
  });
}
exports.seek = seek;

// Formats Artist String
function formatArtistString(artistObj) {
  var artistString = "";
  var numArtists = 0;

  for (var key in Object.keys(artistObj)) {
    var artist = artistObj[key];

    if (numArtists > 0) {
      artistString = artistString + ", " + artist.name;
    } else {
      artistString = artist.name;
    }
    numArtists += 1;
  }

  return artistString;
};
exports.formatArtistString = formatArtistString