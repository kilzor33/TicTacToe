import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Key for identifying events in output JSON file
let key = 0;

app.use(cors());

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

/* Receive post data. */
try {
   app.post('/log-data', (req, res) => {
      // Iterate over every event from the received array 
      req.body.forEach(function(v) {
         // Create string filepath associated with the event.
         var filePath = "./" + v.ID + ".json";
         
         // If file does not exist, create it with the start bracket for containing objects
         if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "{", { flag: 'w' });
         }

         // If event ends a session, write the final data and '}' to the file and close it.
         if (v.gameEnd || v.eventName === "Session ended") {
            try {
               // Formatting: "key" : {eventinformation} }
               let data = "\"" + key + "\":" + JSON.stringify(v) + "}";
               key++;

               fs.writeFileSync(filePath, data, {flag: "a+"});
            } catch (e) {
               console.log(`Could not write to file, with error: ${e}`);
            }
         }
         else {
            try {
               // Formatting: "key" : {eventdata}
               let data = "\"" + key + "\":" + JSON.stringify(v) + ",";
               key++;

               fs.writeFileSync(filePath, data, {flag: "a+"});
            } catch (e) {
               console.log(`Could not write to file, with error: ${e}`);
            }
         }   
      });
      
      res.json({ status : "ok"});
   });
} catch (e) {
   console.log("Post error: " + e);
}