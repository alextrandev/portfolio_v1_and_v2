"use strict";
let cars = [];
const table = document.querySelector("#car_table");
const search = document.querySelector("#search");

function Car(plate, maker, model, owner, price, color) {
  this.plate = plate;
  this.maker = maker;
  this.model = model;
  this.owner = owner;
  this.price = price;
  this.color = color;
}

const addRow = (array, location, index) => {
  const row = location.insertRow(index);
  for (const element of array) {
    const cell = row.insertCell(-1);
    cell.textContent = element;
  }
};

function addNewCar(event) {
  event.preventDefault(); //stop the page from reloading
  try {
    const inputs = document.querySelectorAll(".car_form > input");
    let inputValues = [];
    document.querySelector("#error_msg").textContent = "";

    for (const input of inputs) {
      inputValues.push(input.value);
      if (input.value == "") throw new Error("Please fill all fields!");
    } //IF statement break the function if a field is unfilled.
    cars.push(new Car(...inputValues));
    addRow(inputValues, table, 0);
    // event.target.reset(); //reset input fields
    // document.querySelector(".car_form").reset();
  } catch (error) {
    document.querySelector("#error_msg").textContent = error.message;
  }
}

function searchCar() {
  const searchTable = document.querySelector("#car_table_search");
  const type = document.querySelector("#search_type").value;
  const term = search.value.toString().toLowerCase();
  const result = cars.filter((car) => car[type].toString().toLowerCase().includes(term));

  term == "" //when there is input in searchbar, hide the database table
    ? (searchTable.style.display = "none") && (table.style.display = "")
    : (table.style.display = "none") && (searchTable.style.display = "");

  searchTable.innerHTML = ""; //delete the whole table before display new one
  result.forEach((car) => addRow(Object.values(car), searchTable, -1));
  if (result.length == 0) addRow(["Not found"], searchTable, -1);
}

fetch("assets/cars.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((car) => addRow(Object.values(car), table, -1));
    cars.push(...data);
  }); //display a preloaded list of cars from JSON file

document.querySelector(".car_form").addEventListener("submit", addNewCar);
document.querySelector(".search_bar").addEventListener("input", searchCar);
