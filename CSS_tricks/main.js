const backToTopButton = document.querySelector("#back_to_top_button");

const getToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

backToTopButton.addEventListener("click", getToTop);
