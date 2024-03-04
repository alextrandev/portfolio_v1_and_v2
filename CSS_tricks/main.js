const backToTopButton = document.querySelector("#back_to_top_button");
const header = document.querySelector("header");
const menuBurgerButton = document.querySelector(".mobile");
const navList = document.querySelector("nav ul");
const navLink = document.querySelectorAll("nav ul li a");
const overlay = document.querySelector(".overlay");

window.onscroll = function () {
  document.body.scrollTop > 200 || document.documentElement.scrollTop > 200 ? (backToTopButton.style.display = "block") : (backToTopButton.style.display = "none");
  // if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) header.style.backgroundColor = "#b2d5fb";
  // if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) header.style.backgroundColor = "#aeffae";
  // if (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0) header.style.backgroundColor = "white";
};

backToTopButton.addEventListener("click", () => {
  document.body.scrollTop = 0; // for safari
  document.documentElement.scrollTop = 0; // chrome, FF and others
  header.classList.toggle("bg");
});

menuBurgerButton.addEventListener("click", () => navList.classList.toggle("responsive"));

navLink.forEach((link) => link.addEventListener("click", () => navList.classList.remove("responsive")));

document.querySelector(".modal_button").addEventListener("click", () => overlay.classList.add("visible"));

document.querySelector(".modal button").addEventListener("click", () => overlay.classList.remove("visible"));
