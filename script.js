
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// original tempate for reference
/*
backyard: {
  title: "Location: Backyard",
  character: "Interviewee:Grandma",
  text: "Text: well what I remember happening is that Darcie went inside to play with her pretend kitchen, I heard her neighbor mention he was really hungry, and the dog ran around really quickly",
  choices: [
    {
      text: "Chase after the dog (-10 HP)",
      action: function () {
        updateHealth(-10);
      },
      nextScene: "entrance"
    },
    {
      text: "Ask about the neighbor",
      nextScene: "hallway"
    },
    {
      text: "Pick up the brass key",
      action: function () {
        pickUpItem("brass key");
      },
      nextScene: "hallway"
    }
  ]
}
*/

// first, we create a variable for the current scene being displayed
let currentScene = "hallway";

// these clues only count the first time you find them.
let checkedCase = false;
let talkedToLee = false;
let readSpeech = false;
let miaConfessed = false;
let helpedMia = false;

// then, we create an object that stores the data for each scene,
const scenes = {
  hallway: {
    title: "Hallway",
    character: "The trophy case",
    text: "The school day is over. You are about to go home when Mr. Lee stops you beside the trophy case. There is an empty space on the shelf.\n\nMr. Lee: \"Do you know where the trophy is? It was here during the lunch break.\"\nYou: \"No. Is it for the assembly?\"\nMr. Lee: \"Yes, tomorrow morning. Maybe you can help me find it. I will be in my classroom.\"\n\nHe walks away. An assembly poster says that Mia is receiving an award. Your footsteps echo through the quiet hallway.",
    choices: [
      {
        text: "Check the trophy case",
        action: function () {
          messageDisplay.textContent = "The glass is intact and the other awards are still there. The trophy was taken from the case.";
          if (!checkedCase) {
            updateClues(1);
            checkedCase = true;
          }
        }
      },
      {
        text: "Go to the classroom",
        action: function () {
          messageDisplay.textContent = "";
        },
        nextScene: "classroom"
      },
      {
        text: "Go to the gym",
        action: function () {
          messageDisplay.textContent = "";
        },
        nextScene: "gym"
      },
      {
        text: "Return the trophy",
        action: function () {
          if (inventory.includes("trophy")) {
            inventory = [];
            inventoryDisplay.textContent = "Empty";
            messageDisplay.textContent = "";
            if (helpedMia) {
              scenes.successful.text = "You put the trophy back into the empty place. Mr. Lee thanks you and takes back the gym closet key.\n\nMia has told him the truth. He will help her practice a short speech before the assembly. She looks relieved.\n\nThe trophy is ready for tomorrow. You can finally go home.";
            }
            updateScene("successful");
          } else {
            messageDisplay.textContent = "You haven't found the trophy yet.";
          }
        }
      },
      {
        text: "Give up and leave school",
        action: function () {
          messageDisplay.textContent = "";
        },
        nextScene: "unsuccessful"
      }
    ]
  },

  classroom: {
    title: "Classroom",
    character: "Mr. Lee",
    text: "Mr. Lee is sorting assembly programs at his desk. Papers and decorations cover the room. He looks up as you enter.",
    choices: [
      {
        text: "Talk to Mr. Lee",
        action: function () {
          if (miaConfessed) {
            messageDisplay.textContent = "Mia comes with you to Mr. Lee's desk.\n\nMia: \"I hid the trophy. I was scared of giving the speech. I'm sorry.\"\nMr. Lee: \"Thank you for telling me. Hiding it wasn't the answer, but you can ask me for help.\"\nYou: \"Can we practice the speech together?\"\nMr. Lee: \"Of course. We can keep it short.\"\n\nMia nods. She looks less worried now.";
            helpedMia = true;
          } else if (inventory.includes("trophy")) {
            messageDisplay.textContent = "You: \"I found the trophy in the gym closet.\"\nMr. Lee: \"Thank you! Please put it back in the case. Mia was helping in the closet earlier. Maybe she knows how it got there.\"";
          } else {
            messageDisplay.textContent = "Mr. Lee: \"Have you found anything?\"\nYou: \"Not the trophy. Did anyone stay nearby?\"\nMr. Lee: \"Mia helped me with the decorations. She borrowed the gym closet key, then returned it.\"\nYou: \"Did she seem alright?\"\nMr. Lee: \"She kept asking about the speech. She is probably nervous. You might find her in the library.\"";
            if (!talkedToLee) {
              updateClues(1);
              talkedToLee = true;
            }
          }
        }
      },
      {
        text: "Ask for the gym closet key",
        action: function () {
          if (inventory.includes("gym closet key")) {
            messageDisplay.textContent = "Mr. Lee: \"I have already given it to you. The closet is in the back of the gym.\"";
          } else {
            pickUpItem("gym closet key");
            messageDisplay.textContent = "You: \"Can I check the gym closet?\"\nMr. Lee: \"Sure, here. Return it later.\"\n\nGym closet key added to inventory.";
          }
        }
      },
      {
        text: "Go to the library",
        action: function () {
          messageDisplay.textContent = "";
        },
        nextScene: "library"
      },
      {
        text: "Go back to the hallway",
        action: function () {
          messageDisplay.textContent = "";
        },
        nextScene: "hallway"
      }
    ]
  },

  library: {
    title: "Library",
    character: "Mia",
    text: "Mia is sitting by the window. Her notebook is open, but she isn't writing. A wrinkled sheet of paper lies beside her. The clock ticks above the empty bookshelves.",
    choices: [
      {
        text: "Read the wrinkled paper",
        action: function () {
          messageDisplay.textContent = "The paper says:\n\n\"Thank you for this award...\"\n\nUnderneath, someone has written:\n\"What if I forget everything? What if everyone laughs?\"\n\nMost of the speech is crossed out. Mia seems nervous, but that doesn't prove she took anything.";
          if (!readSpeech) {
            updateClues(1);
            readSpeech = true;
          }
        }
      },
      {
        text: "Talk to Mia",
        action: function () {
          if (helpedMia) {
            messageDisplay.textContent = "Mia: \"Thanks for coming with me. Mr. Lee said we can practice before the assembly.\"\nYou: \"You'll be alright. Let's get the trophy back where it belongs.\"";
          } else if (inventory.includes("trophy")) {
            messageDisplay.textContent = "You: \"I found the trophy in the closet.\"\nMia: \"Under the banner?\"\nYou: \"Yes. How did you know?\"\nMia: \"I put it there. I thought that if it was gone, maybe I wouldn't have to give the speech.\"\nYou: \"We have to return it. You should talk to Mr. Lee about it.\"\nMia: \"Will you come with me?\"\nYou: \"Sure.\"\n\nGo back to the classroom and talk to Mr. Lee together.";
            miaConfessed = true;
          } else {
            messageDisplay.textContent = "You: \"Have you seen the trophy?\"\nMia: \"Why do you ask me?\"\nYou: \"You were helping with the decorations, right?\"\nMia: \"Yes. I put some stuff in the gym closet.\"\n\nMia looks back at her notebook.\n\nYou: \"Is this your speech?\"\nMia: \"I'm trying to write it. I didn't know I'd have to speak in front of the whole school.\"\n\nYou decide to keep looking for clues.";
          }
        }
      },
      {
        text: "Go back to the classroom",
        action: function () {
          messageDisplay.textContent = "";
        },
        nextScene: "classroom"
      }
    ]
  },

  gym: {
    title: "Gym",
    character: "The closet door",
    text: "The gym is empty, but the lights are still on. Basketballs sit in a cart, and decorations lie on the floor. At the back of the gym is a closed supply closet.\n\nA light hums overhead. You hear a faint rattle, then realize it is the air vent.",
    choices: [
      {
        text: "Open the gym closet",
        action: function () {
          messageDisplay.textContent = "";
          openGymCloset();
        }
      },
      {
        text: "Check the decorations",
        action: function () {
          messageDisplay.textContent = "There are ribbons and empty cardboard boxes on the floor. The large assembly banner is missing. Maybe it has been put away in the closet.";
        }
      },
      {
        text: "Go back to the hallway",
        action: function () {
          messageDisplay.textContent = "";
        },
        nextScene: "hallway"
      }
    ]
  },

  closet: {
    title: "Gym Closet",
    character: "A folded banner",
    text: "The key turns, and the door opens with a creak. Inside are boxes, spare basketballs, and a large folded assembly banner. Something under the banner catches the light.",
    choices: [
      {
        text: "Look under the banner",
        action: function () {
          if (inventory.includes("trophy")) {
            messageDisplay.textContent = "You already picked up the trophy. There is nothing else under the banner.";
          } else {
            pickUpItem("trophy");
            messageDisplay.textContent = "You lift the banner. The missing trophy is underneath!\n\nTrophy added to inventory.\n\nYou can return it to the case now, or ask Mia what happened.";
            scenes.closet.text = "The gym closet is quiet. The banner is folded back, and the spot where the trophy was hidden is empty.";
          }
        }
      },
      {
        text: "Go back to the gym",
        action: function () {
          messageDisplay.textContent = "";
        },
        nextScene: "gym"
      }
    ]
  },

  successful: {
    title: "Successful Ending",
    character: "The trophy is back",
    text: "You put the trophy back into the empty place. Mr. Lee thanks you and takes back the gym closet key.\n\nThe award is ready for tomorrow's assembly. You leave the quiet school knowing you helped.",
    choices: [
      {
        text: "Play again",
        action: function () {
          window.location.reload();
        }
      }
    ]
  },

  unsuccessful: {
    title: "Unsuccessful Ending",
    character: "Time to go home",
    text: "You decide to leave school without returning the trophy. The front door closes behind you.\n\nThe space in the trophy case is still empty. Tomorrow's assembly will begin without the award.",
    choices: [
      {
        text: "Try again",
        action: function () {
          window.location.reload();
        }
      }
    ]
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// CLUES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Count clues instead of health; the function works the same way.
let clueCount = 0;

// Display the current clue count
const clueDisplay = document.getElementById("clue-count");

// Create a function to update clues
function updateClues(amount) {
  clueCount += amount;
  clueDisplay.textContent = clueCount;
}

// This refreshes the clue display
updateClues(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Set the starting inventory display from JavaScript.
inventoryDisplay.textContent = "Empty";

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// The original door check, using this story's key and closet scene.
function openGymCloset() {
  if (inventory.includes("gym closet key")) {
    updateScene("closet");
  } else {
    messageDisplay.textContent = "The gym closet is locked. Ask Mr. Lee for the key.";
  }
}

