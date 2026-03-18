export class GameStateLogger {
   constructor(eventlog, flushSize) {
      this.EventLog = eventlog; // Array for holding tuples of eventName and eventTime, to send to server
      this.flushSize = flushSize; // Number of events to log before sending to server
   }


   /**
    * Called by user of the library. Logs events locally. 
    **/
   logKeyDownEvent(ID, event, time, points) {
      const Event = {
            ID: ID,
            eventName: event,
            eventTime: time,
            points: points,
      };

      this.EventLog.push(Event); 
      console.log(`Logged ${Event.eventName} action. Logged at ${Event.eventTime} and has ${Event.points} points`); // Only for testing
      
      // Array is flushed and data sent, every time the array hits over 10 elements.
      // Interval can be changed later
      if (this.EventLog.length > this.flushSize) {
         this.postData();
      }
   }


   /**
    * Used to log clicks on buttons, and clicks and their placement.
    * Location when logging a button click is the button name.
    * When logging a specific place click, recommended syntax for
    * location is: {x: xcoord, y: ycoord}.
    * Can also be used to log swipe events by logging the direction
    * as the event(Name) and the location as the location of the initiated
    * swipe (if nescessary).
    **/
   logClickEvent(ID, event, location, time, points) {
      const Event = {
            ID: ID,
            eventName: event,
            location: location,
            eventTime: time,
            points: points,
      };

      this.EventLog.push(Event); 
      console.log(`Logged ${JSON.stringify(Event.eventName)} action, clicked at ${Event.location}. Logged at ${Event.eventTime} and has ${Event.points} points`); // Only for testing
      
      // Array is flushed and data sent, every time the array hits over 10 elements.
      // Interval can be changed later
      if (this.EventLog.length > this.flushSize) {
         this.postData();
      }
   }


   /**
    * Log new level.
    **/
   logNewLevel(ID, newlevel, time, points) {
      const Event = {
            ID: ID,
            level: newlevel,
            eventTime: time,
            points: points,
      };

      this.EventLog.push(Event); 
      console.log(`Level changed to ${Event.level}. Logged at ${Event.eventTime} time and has ${Event.points} points`); // Only for testing
      
      // Array is flushed and data sent, every time the array hits over 10 elements.
      // Interval can be changed later
      if (this.EventLog.length > this.flushSize) {
         this.postData();
      }
   }


   /**
    * Log game over. Eventname can be e.g. "Game Over"
    **/
   logGameResult(ID, event, time, points, highscore) {
      const Event = {
            ID: ID,
            eventName: event,
            eventTime: time,
            points: points,
            highscore: highscore,
      };

      this.EventLog.push(Event); 
      console.log(`Logged ${Event.eventName} event. Logged at time: ${Event.eventTime} 
        and has ${Event.points} points, with ${Event.highscore} highscore`); // Only for testing
      
      // Array is flushed and data sent, every time the array hits over 10 elements.
      // Interval can be changed later
      if (this.EventLog.length > this.flushSize) {
         this.postData();
      }
   }



   /**
    * Log game end, e.g. call event for "Game ended by user".
    **/
   logGameEnd(ID, event, time, points, highscore) {
      const Event = {
            ID: ID,
            eventName: event,
            eventTime: time,
            points: points,
            highscore: highscore,
      };

      this.EventLog.push(Event); 
      console.log(`Logged ${Event.eventName}. Logged at ${Event.eventTime} and has ${Event.points} points, with ${Event.highscore} highscore`); // Only for testing
      
      // Array is flushed as player has ended the game.
      this.postData();
   }


   /**
    * Send logged events to the server via. POST request. 
    **/
   postData () {
      fetch('http://localhost:3000/log-data',
               {  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  mode: 'cors',
                  cache: 'default',
                  body: JSON.stringify(this.EventLog)})
                  .then(response => console.log(response))
                  .catch(error => console.error('Error:', error));
         
      this.EventLog = [];
   }
}