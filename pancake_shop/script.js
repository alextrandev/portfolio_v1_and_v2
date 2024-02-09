let pancakeType = document.querySelector("#type"); //find the type
let toppingExtra = document.querySelectorAll("input"); //find toppings list
let defaultImage = document.querySelector(".imageDefault"); //find the pancake type images
let toppingImage = document.querySelectorAll("img"); //find the toppings images

function changePrice() {
  switch (Number(pancakeType.value)) {
    case 5:
      defaultImage.src = "images/pancakeClassic.webp";
      break;
    case 6:
      defaultImage.src = "images/pancakeChocolate.webp";
      break;
    case 7:
      defaultImage.src = "images/pancakeBlueberry.webp";
      break;
  } // change the preview image for the pancake type

  let totalPrice = Number(pancakeType.value); //set total price = value of cake type

  for (let i = 0; i < toppingExtra.length; i++) {
    if (toppingExtra[i].checked) {
      totalPrice += Number(toppingExtra[i].value); //increase the total price for each checked toppings
      toppingImage[i + 1].style.visibility = "visible";
    } else {
      toppingImage[i + 1].style.visibility = "hidden";
    } //show the toppings when checkbox checked
  }

  let displayTotalPrice = document.querySelectorAll(".totalPrice"); //find the displayed price

  for (let i = 0; i < displayTotalPrice.length; i++) {
    displayTotalPrice[i].textContent = totalPrice.toFixed(2);
  } // change all the displayed price
}

pancakeType.addEventListener("change", changePrice); // event listener for type change
toppingExtra.forEach(function (checkbox) {
  checkbox.addEventListener("change", changePrice);
}); // multiple event listeners for each check box change
