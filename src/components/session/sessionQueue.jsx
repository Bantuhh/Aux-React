import React, { Component } from "react";

import { SessionContext } from "../../session-context";

import "../../styles/SessionQueue.css";

import QueueItem from "./queueItem";

import EditingQueueItem from "./editingQueueItem";


class SessionQueue extends Component {
  state = {
    queue: global.sessionQueue,
  };

  // Remove song from global queue and update
  removeSong = (songInfo) => {
    console.log("Removing song from queue:", songInfo);

    // Splice will remove first occurence of element. If duplicates, then remove the last occurence, hence reverse()
    var queueCopy = global.sessionQueue;
    queueCopy.reverse()

    var index = queueCopy.indexOf(songInfo);
    if (index > -1) {
      queueCopy.splice(index, 1);
    }

    global.sessionQueue = queueCopy.reverse()

    this.context.updateSessionQueue(global.sessionQueue);
  }

  onDrop = (e) => {
    console.log('onDrop');
    
    console.log('Dropped index', global.draggedQueueItemIndex);
    console.log("Dropped onto index", global.draggedOntoQueueItemIndex)

    var tmp = global.sessionQueue[global.draggedQueueItemIndex];
    global.sessionQueue[global.draggedQueueItemIndex] = global.sessionQueue[global.draggedOntoQueueItemIndex];
    global.sessionQueue[global.draggedOntoQueueItemIndex] = tmp;

    this.context.updateSessionQueue(global.sessionQueue);
  }

  render() {
    return (
      <SessionContext.Consumer>
        {({ sessionQueue }) => (
          <div className="queueDiv" onDrop={this.onDrop}>
            
            {global.sessionQueue.length === 0 ? (
              <div className="noQueueItemsDiv">
                <p className="noQueueItemsText">
                  Add some songs to the queue, eh?
                </p>
  
 

              </div>
            ) : this.props.isEditingQueue ? (
              global.sessionQueue.map((item) => <EditingQueueItem songInfo={item} removeSong={() => this.removeSong(item)}/>)) : (
              global.sessionQueue.map((item) => <QueueItem songInfo={item} showContentOptions={() => this.props.showContentOptions(item)} />)
            )}
          </div>
        )}
      </SessionContext.Consumer>
    );
  }
}
SessionQueue.contextType = SessionContext;

export default SessionQueue;
