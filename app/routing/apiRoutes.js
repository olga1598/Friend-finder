// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var appFriend = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Request
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
      //console.log(appFriend);
      //console.log(req.body);
    res.json(appFriend);
  });


  // API POST Requests
  // Below code handles when a user submits a form and submits data to the server.
  // When a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey... this data is then sent to the server...
  // then the server saves the data to the friends array)
  // ---------------------------------------------------------------------------
  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body parsing middleware
    var newFriend = req.body;

    appFriend.push(newFriend);
    console.log("The adding: " + newFriend.name + newFriend.photo + newFriend.scores);
    
    var matchID = -1;

    function scoreNewfriend() {
        //The array of all friends arrays scores
        var newScore = [];
        for (var i = 0; i < newFriend.scores.length; i ++) {
            newScore.push(parseInt(newFriend.scores[i]));
        };            
        console.log(newScore);

        //Finding the mininum number in differences of all the scrores 
        //=== best match; comparing all the arrays of scores of each candidate
        var minDiff = 200;
        for (var j = 0; j < (appFriend.length-1); j++) {
          var diff = 0;
          for (var i = 0; i < 10; i++) {    
              diff += Math.abs(newScore[i] - appFriend[j].scores[i]);
          };
          if (diff < minDiff) {
            minDiff = diff;
            matchID = j;
          }
        };
        console.log(minDiff);
        console.log(matchID);
        console.log(appFriend[matchID].name + " " + appFriend[matchID].photo);

    };
    scoreNewfriend();
    var match = appFriend[matchID];
    console.log(match);
    res.json(match);

  });

};
