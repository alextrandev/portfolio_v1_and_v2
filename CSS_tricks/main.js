const backToTopButton = document.querySelector("#back_to_top_button");
const header = document.querySelector("header");

backToTopButton.addEventListener("click", () => {
  document.body.scrollTop = 0; // for safari
  document.documentElement.scrollTop = 0; // chrome, FF and others
  header.classList.toggle("bg");
});

window.onscroll = function () {
  document.body.scrollTop > 200 || document.documentElement.scrollTop > 200 ? (backToTopButton.style.display = "block") : (backToTopButton.style.display = "none");
  // if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) header.style.backgroundColor = "#b2d5fb";
  // if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) header.style.backgroundColor = "#aeffae";
  // if (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0) header.style.backgroundColor = "white";

  // switch (document.body.scrollTop || document.documentElement.scrollTop) {
  //   case 0:
  //     header.style.backgroundColor = "white";
  //     break;
  //   case >1:
  //     header.style.backgroundColor = "#b2d5fb";
  //     break;
  //   case 200:
  //     header.style.backgroundColor = "aeffae";
  //     break;
  // }
};
