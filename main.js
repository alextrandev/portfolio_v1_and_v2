const contactButton1 = document.querySelector("#contact_1");
const contactButton2 = document.querySelector("#contact_2");
const backToTopButton = document.querySelector("#back_to_top");

const contactLinkToggle = (id) => {
  const link1 = id.nextElementSibling.querySelector("div a");
  id.nextElementSibling.classList.toggle("hidden");
  link1.classList.toggle("hidden");
  setTimeout(() => link1.nextElementSibling.classList.toggle("hidden"), 200);
  setTimeout(() => link1.nextElementSibling.nextElementSibling.classList.toggle("hidden"), 300);
};

window.onscroll = () => (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400 ? backToTopButton.classList.remove("hidden") : backToTopButton.classList.add("hidden"));

backToTopButton.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

contactButton1.addEventListener("click", () => contactLinkToggle(contactButton1));
contactButton2.addEventListener("click", () => contactLinkToggle(contactButton2));
