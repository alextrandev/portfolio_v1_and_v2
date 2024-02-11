let toppingExtra = document.querySelectorAll('input[type = "checkbox"]');
let toppingExtraConfirm = [];
let pancakeTypeConfirm = "";
let customerName = "";
let customerAddress = "";
let customerNote = "";
let totalPrice = 5;

//to change the cake images and calculate price
function changeOrder() {
  let pancakeType = document.querySelector("#pancakeTypeConfirm");
  let defaultImage = document.querySelector(".imageDefault");
  let toppingImage = document.querySelectorAll(".toppingImage");
  switch (document.querySelector("#type").value) {
    case "5":
      defaultImage.src = "images/pancakeClassic.webp";
      totalPrice = 5;
      pancakeTypeConfirm = pancakeType.textContent = "Classic";
      break;
    case "6":
      defaultImage.src = "images/pancakeChocolate.webp";
      totalPrice = 6;
      pancakeTypeConfirm = pancakeType.textContent = "Chocolate";
      break;
    case "7":
      defaultImage.src = "images/pancakeBlueberry.webp";
      totalPrice = 7;
      pancakeTypeConfirm = pancakeType.textContent = "Blueberry";
      break;
  }
  toppingExtraConfirm = []; //reset the toppings array
  //can do foreach or for of here but "for" give index which reused for img
  for (let i = 0; i < toppingExtra.length; i++) {
    if (toppingExtra[i].checked) {
      totalPrice += Number(toppingExtra[i].value);
      toppingImage[i].style.visibility = "visible";
      toppingExtraConfirm.push(toppingExtra[i].id);
    } else {
      toppingImage[i].style.visibility = "hidden";
    }
  }
  document
    .querySelectorAll(".totalPrice")
    .forEach((price) => (price.textContent = totalPrice.toFixed(2)));
}

//move to the confirm tab on button click, display the selections
function confirmCake() {
  document.querySelector(".form-container").style.display = "none";
  document.querySelector(".confirm-container").style.display = "flex";
  let toppingExtraDisplay = toppingExtraConfirm.map((item) => {
    item = (item[0].toUpperCase() + item.slice(1)).split(/(?=[A-Z])/).join(" ");
    return item;
  });
  let toppingExtra = document.querySelector("#toppingExtraConfirm");
  toppingExtra.textContent = toppingExtraDisplay.join(", ");
  toppingExtraConfirm == [] ? (toppingExtra.textContent = "None") : null;
}

//just to move back to cake customize
function backToOrder() {
  document.querySelector(".confirm-container").style.display = "none";
  document.querySelector(".form-container").style.display = "flex";
}

//save the user info and display a thanks card
function confirmOrder() {
  customerName = document.querySelector("#customerName").value;
  customerAddress = document.querySelector("#customerAddress").value;
  customerNote = document.querySelector("#customerNote").value;
  document.querySelector(".confirm-container").style.display = "none";
  document.querySelector(".thank-you-container").style.display = "flex";
}

//add trigger to buttons, checkboxes, inputs
document.querySelector("#confirmButton").addEventListener("click", confirmCake);
document.querySelector("#backToOrder").addEventListener("click", backToOrder);
document.querySelector("#type").addEventListener("change", changeOrder);
toppingExtra.forEach((checkbox) =>
  checkbox.addEventListener("change", changeOrder)
);
document.querySelector("#orderButton").addEventListener("click", confirmOrder);
