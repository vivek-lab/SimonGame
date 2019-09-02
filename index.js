var colorList = ["green", "red", "yellow", "blue"];
var sequenceList = [];
var sequencePointer = 0;
var isKeyPressed = false;
var level = 1;


// console.log(colorNumber);


$(document).keypress(function() {
  if (!isKeyPressed) {
    isKeyPressed = true;
    nextButtonToBePressed();
  }
});


$(".btn").on("click", function() {
  if (isKeyPressed) {
    gameRun(this);
  } else {
    gameOver();
  }
});


function nextButtonToBePressed() {

  var colorNumber = Math.floor(Math.random() * 4);
  var color = colorList[colorNumber];
  sequenceList.push(color);
  //buttonPressedEffects("to-be-pressed", color);
  $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
  new Audio("sounds/" + color + ".mp3").play();
  $("#level-title").text("Level "+ level);
  level++;
}

function gameRun(button) {
  if (sequencePointer < sequenceList.length) {
    if (button.id == sequenceList[sequencePointer]) {
      buttonPressedEffects("pressed", sequenceList[sequencePointer]);
      sequencePointer++;
      if (sequencePointer == sequenceList.length) {
        setTimeout(function() {
          sequencePointer = 0;
          nextButtonToBePressed();
        }, 1000);
      }
    } else {
      gameOver();
    }
  }

}

function buttonPressedEffects(type, color) {
  $("#" + color).addClass(type);
  new Audio("sounds/" + color + ".mp3").play();
  setTimeout(function() {
    $("#" + color).removeClass(type);
  }, 100);
}

function gameOver() {
  sequenceList = [];
  sequencePointer = 0;
  isKeyPressed = false;
  level = 1;
  $("#level-title").text("Game Over, Press Any Key to Restart");
  new Audio("sounds/wrong.mp3").play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
}
