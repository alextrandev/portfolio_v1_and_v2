// Create a Magic 8-Ball program that emulates the classic fortune-telling toy. The user will input a yes-or-no question, and the program will output a random response from the 8-Ball. Implement the program using conditional statements to select and display one of several predefined responses.

const randomNumber = (n) => {
  return Math.floor(Math.random() * n + 1);
};

function returnAnswer() {
  switch (randomNumber(10)) {
    case 1:
      return "Can't predict now, I'm napping.";
      break;
    case 2:
      return "Yes but ask again after taco Tuesday.";
      break;
    case 3:
      return "Reply hazy, ask your horoscope.";
      break;
    case 4:
      return "Definitely maybe, but on a leap year.";
      break;
    case 5:
      return "Outlook fuzzy, like a pixelated cat video.";
      break;
    case 6:
      return "Yes, if you dance like no one's watching.";
      break;
    case 7:
      return "No way, unless penguins become astronauts.";
      break;
    case 8:
      return "Yes but ask a fortune cookie for a second opinion.";
      break;
    case 9:
      return "As likely as finding a needle in a haystack.";
      break;
    case 10:
      return "My sources say 'ask Siri, I'm on vacation.'";
      break;
  }
}
document.getElementById("askButton").innerHTML = "Ask a question";
document.getElementById("repeatQuestion").innerHTML =
  "Meet the Mystic Maven, your oracle for cosmic insights.";
document.getElementById("answer").innerHTML =
  "Unveil the secrets of the universe - a question at a time!";
function askAndReturnAnswer() {
  let question = prompt("Ask me any question...");
  let questionTrimmed = question.replaceAll("?", "");
  if (!question.includes("?") || questionTrimmed.length < 4) {
    document.getElementById("repeatQuestion").innerHTML =
      "That's not a question. Ask again!";
    document.getElementById("answer").innerHTML = "";
    document.getElementById("askButton").innerHTML = "Ask another question";
  } else if (questionTrimmed.length > 120) {
    document.getElementById("repeatQuestion").innerHTML = "Keep it short...";
    document.getElementById("answer").innerHTML = "I don't have all day!";
    document.getElementById("askButton").innerHTML = "Ask another question";
  } else {
    document.getElementById("repeatQuestion").innerHTML =
      "You asked: " + questionTrimmed + "?";
    document.getElementById("answer").innerHTML =
      "The answer is: " + returnAnswer();
    document.getElementById("askButton").innerHTML = "Ask another question";
  }
}
