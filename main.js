const contactButton1 = document.querySelector("#contact_1");
const contactButton2 = document.querySelector("#contact_2");

const contactLinkToggle = (id) => {
  const contactLinks = id.nextElementSibling;
  const link1 = contactLinks.querySelector("div a");
  contactLinks.classList.toggle("hidden");
  link1.classList.toggle("hidden");
  setTimeout(() => link1.nextElementSibling.classList.toggle("hidden"), 200);
  setTimeout(() => link1.nextElementSibling.nextElementSibling.classList.toggle("hidden"), 300);
};

contactButton1.addEventListener("click", () => contactLinkToggle(contactButton1));
contactButton2.addEventListener("click", () => contactLinkToggle(contactButton2));
