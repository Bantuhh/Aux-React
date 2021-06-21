import React, { Component } from "react";

import { SessionContext } from "../../session-context";

import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'

import "./SessionQueue.css";

import QueueItem from "./queueItem";

import {EditingQueueItem , EditingQueueItemTouchable} from "./editingQueueItem";

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
          <DndProvider backend={TouchBackend}>
            <div id={this.props.deviceType === "Web" ? "queueDivWeb" : "queueDivMobile"} onDrop={this.onDrop}>
              
              {global.sessionQueue.length === 0 ? (
                <div className="noQueueItemsDiv">
                  <p className="noQueueItemsText">
                    Add some songs to the queue, eh?
                  </p>
    
  

                </div>
              ) : this.props.isEditingQueue ? (
                this.props.deviceType === "Web" ? 
                (global.sessionQueue.map((item) => <EditingQueueItem deviceType={this.props.deviceType} songInfo={item} removeSong={() => this.removeSong(item)}/>)): 
                (global.sessionQueue.map((item) => <EditingQueueItemTouchable deviceType={this.props.deviceType} songInfo={item} removeSong={() => this.removeSong(item)} onDrop={this.onDrop}/>))
                ) : (
                global.sessionQueue.map((item) => <QueueItem deviceType={this.props.deviceType} songInfo={item} showContentOptions={() => this.props.showContentOptions(item)} />)
              )}
            </div>
          </DndProvider>
        )}
      </SessionContext.Consumer>
    );
  }
}
SessionQueue.contextType = SessionContext;

export default SessionQueue;
