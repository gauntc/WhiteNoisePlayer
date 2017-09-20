var pathToFile = '';
var $startSoundElement = $('#focus span[class="selected"]');
var $endSoundElement = $('#relax span[class="selected"]');
var $endTimeElement = $('#endtime')[0];
var $audio = $('#soundplayer')[0];
var timeError = $('#timeerror')[0];
var delayedCall;

function changeSound() {
  if (!(pathToFile === '')) {
    $audio.src = pathToFile;
    $audio.play();
  }
  else {
    resetSound();
  }
};

function playSound() {
  //Clear previous end sound queues
  if (delayedCall) {
    clearTimeout(delayedCall);
  }

  //Clear error message
  timeError.innerHTML = "";

  //Get sound file paths
  var startSound = './focus-tunes/' + $startSoundElement.text();
  var endSound = './relax-tunes/' + $endSoundElement.text();

  //Calculate play length
  var startTime = new Date();
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
    enablePlayOptions(false);
    pathToFile = endSound;

    //Set up end sound
    delayedCall = setTimeout(function() {
        changeSound();
        enablePlayOptions(true);
      }, playLength);
  }
  else {
    //Display error message if time is incorrect
    $('#timeerror')[0].innerHTML = "ERROR: End time must be later than current time.";
  }
};

function resetSound() {
  $audio.pause();
  $audio.removeAttribute('src');
  enablePlayOptions(true);
};

function enablePlayOptions(enable) {
  clearTimeout(delayedCall);
  $('#focus').children()[0].disabled = !enable;
  $('#relax').children()[0].disabled  = !enable;
  $('button[name="playbutton"]')[0].disabled  = !enable;
  $endTimeElement.disabled = !enable;
}


// function populateDropDownList(list, directory) {
//   var sourceFolder = new Folder(directory);
//   var files = sourceFolder.getFiles(function(f) { return f instanceof File; });
//   for (var i = 0; i < files.length; i++) {
//     var listItem = createElement('li');
//     listItem.innerHTML = files[i].name;
//     list.appendChild(listItem);
//   }
// };
//
// populateDropDownList($('#focus')[0], './focus-tunes');
// populateDropDownList($('#relax')[0], './relax-tunes');

$('#focus a').click(function() {
  $('#focus span[class="selected"]').text($(this).text());
  $(this).parent()[0].className = "selected";
});

$('#relax a').click(function() {
  $('#relax span[class="selected"]').text($(this).text());
  $(this).parent()[0].className = "selected";
});
