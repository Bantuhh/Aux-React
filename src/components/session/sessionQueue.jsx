import React, { Component } from "react";

import { SessionContext } from "../../session-context";

import "../../styles/SessionQueue.css";

import QueueItem from "./queueItem";

class SessionQueue extends Component {
  state = {
    queue: global.sessionQueue,
  };
  render() {
    return (
      <SessionContext.Consumer>
        {({ sessionQueue }) => (
          <div className="queueDiv">
            {global.sessionQueue.length === 0 ? (
              <div className="noQueueItemsDiv">
                <p className="noQueueItemsText">
                  Add some songs to the queue, eh?
                </p>
              </div>
            ) : (
              global.sessionQueue.map((item) => <QueueItem songInfo={item} />)
            )}
          </div>
        )}
      </SessionContext.Consumer>
    );
  }
}

export default SessionQueue;
