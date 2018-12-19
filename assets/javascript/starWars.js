//Initialize
isCharacterChosen = false;
isDefenderChosen = false;
isEnemies = false;

var charAttackPoints = 0;

var objCharacterChosen;
var objDefenderChosen;

var characterOne = {
  name: "Obi-Wan",
  id: "obi",
  imgSrc: "assets/images/Obi-Wan.jpg",
  hp: 120,
  attackPower: 8,
  counterAttackPower: 8,
};


var characterTwo = {
  name: "Luke SkyWalker",
  id: "luke",
  imgSrc: "assets/images/LukeSkyWalker.jpg",
  hp: 100,
  attackPower: 5,
  counterAttackPower: 5,
};

var characterThree = {
  name: "Yoda",
  id: "yoda",
  imgSrc: "assets/images/Yoda.jpg",
  hp: 150,
  attackPower: 20,
  counterAttackPower: 20,
};

var characterFour = {
  name: "Darth Vader",
  id: "darth",
  imgSrc: "assets/images/DarthVader.jpg",
  hp: 180,
  attackPower: 25,
  counterAttackPower: 25,
};



var arrCharacters = [characterOne, characterTwo, characterThree, characterFour];

//Functions

// Creates a flex row item, with an image
function getCharacterElement(charObj, type) {
  var character = charObj;

  var $imgDiv = $("<div>");
  if (type == "D") {
    $imgDiv.addClass("flex-item my-def-div");
  } else if (type == "E") {
    $imgDiv.addClass("flex-item my-enemy-div");
    isEnemies = true;
  } else {
    $imgDiv.addClass("flex-item my-char-div");
  }

  var $headerDiv = $("<div>");
  $headerDiv.addClass("flex-item");
  $headerDiv.text(charObj.name);

  var $footerDiv = $("<div>");
  $footerDiv.addClass("flex-item");
  $footerDiv.attr("id", 'hp');
  $footerDiv.text(charObj.hp);

  var $imgCharacter = $("<img>");
  $imgCharacter.addClass("img img-thumnail my-image");
  $imgCharacter.attr("src", charObj.imgSrc);
  $imgCharacter.attr("id", charObj.id);
  //$imgCharacter.attr("hp",charObj.hp);
  //$imgCharacter.attr("attackPower",charObj.attackPower);
  //$imgCharacter.attr("counterAttackPower",charObj.counterAttackPower);

  $imgDiv.append($headerDiv);
  $imgDiv.append($imgCharacter);
  $imgDiv.append($footerDiv);

  return $imgDiv;
}

//Creates the list of all characters
function setAllCharacters() {
  $("#character").empty();
  for (var i = 0; i < arrCharacters.length; i++) {
    $("#character").append(getCharacterElement(arrCharacters[i], "C"));
  }
}

// Sets your character and the enemies list
function setYourCharacter(characterId) {
  $("#character").empty();

  for (var i = 0; i < arrCharacters.length; i++) {
    if (arrCharacters[i].id === characterId) {
      $("#character").append(getCharacterElement(arrCharacters[i], "C"));
      objCharacterChosen = arrCharacters[i];
      isCharacterChosen = true;
    } else {
      $("#enemies").append(getCharacterElement(arrCharacters[i], "E"));
    }
  }
}

//Sets the defender and resets enemies list
function setYourDefender(characterId) {
  $("#defender").empty();
  $("#enemies").empty();
  isEnemies = false;
  for (var i = 0; i < arrCharacters.length; i++) {
    if (arrCharacters[i].id === characterId) {
      $("#defender").append(getCharacterElement(arrCharacters[i], "D"));
      objDefenderChosen = arrCharacters[i];
      isDefenderChosen = true;
    } else if (arrCharacters[i].id != objCharacterChosen.id) {
      if (arrCharacters[i].hp > 0) {
        $("#enemies").append(getCharacterElement(arrCharacters[i], "E"));
        isEnemies = true;
      }
    }
  }
}

// Displays the attack button
function setAttackMode() {
  $("#attack").empty();

  var $attackBtn = $("<button>");
  $attackBtn.text("Attack");
  $attackBtn.attr("id", "attack-btn");
  $attackBtn.addClass("my-button");

  $("#attack").append($attackBtn);
}

// Displays the reset button and removes attack mode
function setResetButton() {
  //Remove attack button as the attack ended
  $("#attack").empty();

  var $resetBtn = $("<button>");
  $resetBtn.text("Restart Game");
  $resetBtn.attr("id", "reset-btn");
  $resetBtn.addClass("my-button");

  $("#message").append($resetBtn);
}

// Resets the game
function gameReset() {
  window.location.reload(true);
}

function zeroHealthPoints(charHp, defHp) {

  if (defHp <= 0) {
    // if defender chosen has no hp left,send win message
    $("#message").text("You Win! ");
    $("#defender").empty();
    isDefenderChosen = false;
    // if no enemies left,remove attack mode restart game
    if (!isEnemies) {
      setResetButton();
    }
  } else {
    $("#message").text("You Lose! ");
    setResetButton();
  }

}
//End of Functions

// On Page load
$(document).ready(function () {

  //set all characters
  setAllCharacters();

  // On click of image in Character List, choose your character
  $("#character").on("click", ".my-image", function () {
    var imageId = $(this).attr("id");
    if (!isCharacterChosen) {
      setYourCharacter(imageId);
    }
  });

  // On click of image in Enemies List , choose your defender, set attack mode
  $("#enemies").on("click", ".my-image", function () {
    var imageId = $(this).attr("id");

    if (isCharacterChosen && !isDefenderChosen) {
      setYourDefender(imageId);
      setAttackMode();
    }
  });

  /// On Attack mode
  $("#attack").on("click", "#attack-btn", function () {
    $("#message").empty();

    // Check if defender chosen
    if (!isDefenderChosen) {
      $("#message").text("No Defender has been chosen to be attacked.");
      return false;
    }

    //console.log(" Character chosen : hp " + objCharacterChosen.name + " - "+ objCharacterChosen.hp );
    //console.log(" Defender chosen : hp " + objDefenderChosen.name + " - "+ objDefenderChosen.hp );


    // Until both the character and defender have hp's continue attack
    if (objCharacterChosen.hp > 0 && objDefenderChosen.hp > 0) {

      // Increment attack power of chosen character
      charAttackPoints = charAttackPoints + objCharacterChosen.attackPower;

      // send attack status messages
      $("#message").append(" You have attacked " + objDefenderChosen.name + " by " + charAttackPoints + " damage. " + objDefenderChosen.name + " attacked you by " + objDefenderChosen.counterAttackPower + " damage.");

      //decrement hp's
      objCharacterChosen.hp = objCharacterChosen.hp - objDefenderChosen.counterAttackPower;
      objDefenderChosen.hp = objDefenderChosen.hp - charAttackPoints;

      if (objCharacterChosen.hp > 0 && objDefenderChosen.hp > 0) {
        //set the hp's
        $("#character").find("#hp").text(objCharacterChosen.hp);
        $("#defender").find("#hp").text(objDefenderChosen.hp);
      } else {
        zeroHealthPoints(objCharacterChosen.hp, objDefenderChosen.hp);
      }
    } else {
      zeroHealthPoints(objCharacterChosen.hp, objDefenderChosen.hp);
    }
  });
  /// End of new Code


  //Reset Game
  $("#message").on("click", "#reset-btn", function () {
    gameReset();
  });

});