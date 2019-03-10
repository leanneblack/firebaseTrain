 
 // Initialize Firebase

var config = {
    apiKey: "AIzaSyCxLoK_e9JVpZ2HvwWKHLk5C2ceO6XC9T8",
    authDomain: "train-app-6660e.firebaseapp.com",
    databaseURL: "https://train-app-6660e.firebaseio.com",
    projectId: "train-app-6660e",
    storageBucket: "train-app-6660e.appspot.com",
  };
  
firebase.initializeApp(config);

var database = firebase.database();

// moment js

moment().format();


// 2. Button for adding new train

$("#new-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var name = $("#trainName").val().trim();
  var destination= $("#destination").val().trim();


 

  // when trains arrive
  var arrival = moment($("#arrival").val().trim(), "HH:mm").format("HH:mm");
  


  // Creates local "temporary" object for holding the new train information

  var newTrain = {
    name: name,
    destination: destination,
    frequency: tFrequency,
    arrival:arrival,
  
  
  };

  var tFrequency = 3;
  var firstTime = "6:00";
  
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "HH:mm");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var arrival = moment().add(tMinutesTillTrain, "minutes");


  // Uploads train information to the database
  database.ref().push(newTrain);


 

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#tFrequency").val("");
  $("#arrival").val("");
});

// Make Firebase event for adding the train to the database and create a html row for when train is added
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().tFrequency;
  var arrival = childSnapshot.val().arrival;



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(destination),
    $("<td>").text(tFrequency),
    $("<td>").text(arrival),
   
  
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
})