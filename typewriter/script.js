/* 
Create functionality where an input field's value is continuously displayed and updated in a dedicated area on the page as the user types, using the onchange event.*/

/* 

Instructions:

HTML:
- Make a basic HTML
- Include an <input type="text"> element where the user can enter text.
- Add a <div> element with an ID (e.g., id="displayText"), which will be used to display the input field's value.
- Remember to connect HTML and JS files

JavaScript:

Write JavaScript code that adds an event listener to the input field, specifically listening for the change event. 

The event listener's function should:
- Retrieve the current value from the input field.
- Update the textContent of the displayText <div> to match the input field's value.
- To have the display update more dynamically (as the user types), consider using the input event instead of or in addition to the change event.  */

const sound1 = new Audio("sound/sound1.mp3");
const sound2 = new Audio("sound/sound2.mp3");
const sound3 = new Audio("sound/sound3.mp3");
const sound4 = new Audio("sound/sound4.mp3");
let input = document.querySelector("#input");

const randomNumber = (n) => {
  return Math.floor(Math.random() * n + 1);
};

function playSound() {
  switch (randomNumber(3)) {
    case 1:
      return sound1.play();
      break;
    case 2:
      return sound2.play();
      break;
    case 3:
      return sound3.play();
      break;
    case 4:
      return sound4.play();
      break;
  }
}

function updateText() {
  let textField = document.querySelector("#displayText");
  textField.innerHTML = input.value + '<p class="textCurser">▯</p>';
  playSound();
}

input.addEventListener("input", updateText);
