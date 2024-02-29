const link = document.querySelectorAll(".link");
const iframe = document.querySelectorAll(".preview");
let count = 0;
for (single of link) {
  iframe[count].src = single.href;
  count++;
}
