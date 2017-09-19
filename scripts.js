var pathToFile = 'white-noise.mp3';
var delayedCall;

function changeSound() {
  var $audio = $('#soundplayer')[0];
  if (!(pathToFile === '')) {
    $audio.src = pathToFile;
    $audio.play();
  }
  else {
    $audio.pause();
    $audio.removeAttribute('src');
  }
};

function play() {
  //Clear previous end sound queues
  if (delayedCall) {
    clearTimeout(delayedCall);
  }

  //Clear error message
  var timeError = $('#timeerror')[0];
  timeError.innerHTML = "";

  //TODO: Grab start file
  var startSound = '';
  //TODO: Grab end file
  var endSound = '';

  //Calculate play length
  var startTime = new Date();
  var $endTimeElement = $('#endtime')[0];
  var endTimeArray = $endTimeElement.value.split(':');
  var endTime = new Date();
  endTime.setHours(endTimeArray[0]);
  endTime.setMinutes(endTimeArray[1]);
  endTime.setSeconds(endTimeArray[2]);
  var playLength = endTime.getTime() - startTime.getTime();

  if (playLength > 0) {
    //Play sound
    pathToFile = startSound;
    changeSound();
    pathToFile = endSound;

    //Set up end sound
    delayedCall = setTimeout(changeSound, playLength);
  }
  else {
    //Display error message if time is incorrect
    $('#timeerror')[0].innerHTML = "ERROR: End time must be later than current time.";
  }
};
