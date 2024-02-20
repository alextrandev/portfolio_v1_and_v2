const sortAlphabet = (data) =>
  data.sort((a, b) => {
    if (a.name.common > b.name.common) return 1;
    else if (a.name.common < b.name.common) return -1;
    else return 0;
  });
const find = (name) => document.querySelector(name);
const findAll = (name) => document.querySelectorAll(name);

//create a section for each region for easy sorting
function createRegionSection(region) {
  const section = document.createElement("section");
  section.className = "regionSection";
  section.id = region;
  const ul = document.createElement("ul");
  ul.className = "gridContainer";
  ul.id = `regionList${region}`;
  section.appendChild(ul);
  section.style.display = "none";
  find("#regionsMain").appendChild(section);
}

//create a card for country selection with flag and name
function createCountryCard(country, region) {
  let li = document.createElement("li");
  li.className = "gridItem";
  let div = document.createElement("div");
  div.className = "flagContainer";
  div.addEventListener("click", () => fetchCountryOnClick(country.cca3));
  let img = document.createElement("img");
  img.src = country.flags.svg;
  div.appendChild(img);
  let h3 = document.createElement("h3");
  h3.textContent = country.name.common;
  div.appendChild(h3);
  li.appendChild(div);
  find(`#regionList${region}`).appendChild(li);
}

//add a sorting button for each region
function createRegionSelectButton(region) {
  const regionH2 = document.createElement("h2");
  regionH2.className = "region_select_button";
  regionH2.id = `${region}Section`;
  regionH2.textContent = region;
  regionH2.addEventListener("click", () => changeRegion(regionH2.textContent));
  find(".region_select").appendChild(regionH2);
}

//show the selected region section and hide others
function changeRegion(region) {
  const regionSection = findAll(".regionSection");
  regionSection.forEach((section) => (section.style.display = "none"));
  find(`#${region}`).style.display = "block";
  const allRegionButton = findAll(".region_select_button");
  allRegionButton.forEach((button) => button.style.removeProperty("filter"));
  find(`#${region}Section`).style.filter = "drop-shadow(0px 0px 2px #3E92CC)";
}

//will run at page load and load all country cards
async function fetchAllCountries() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,cca3"
  );
  const data = await response.json();
  const sortedData = sortAlphabet(data);
  let region = "All";
  createRegionSelectButton(region);
  createRegionSection(region);
  find("#All").style.display = "block";
  for (country of sortedData) {
    createCountryCard(country, region);
  }
}

//run after the previous function and sort country cards based on region
async function fetchCountriesByRegion() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,cca3,region"
  );
  const data = await response.json();
  const regions = new Set(data.map((country) => country.region));
  for (region of regions) {
    createRegionSection(region);
    const filteredData = sortAlphabet(
      data.filter((country) => country.region == region)
    );
    filteredData.forEach((country) => {
      createCountryCard(country, region);
    });
    createRegionSelectButton(region);
  }
}

//run when a country is selected. load all infos to their placeholder.
async function fetchCountryOnClick(countryCode) {
  let response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca3,currencies,capital,region,subregion,languages,area,maps,population,flags,coatOfArms"
  );
  let data = await response.json();
  let country = data.find((country) => country.cca3 === countryCode);
  findAll(".countryName").forEach((i) => (i.textContent = country.name.common));
  find("#officialName").textContent = country.name.official;
  find("#flagAlt").textContent = find("#flag").alt = country.flags.alt;
  find("#flag").src = country.flags.svg;
  find("#coa").src = country.coatOfArms.svg;
  find("#cca3").textContent = country.cca3;
  find("#area").textContent = country.area;
  find("#capital").textContent = country.capital;
  find("#population").textContent = country.population;
  find("#region").textContent = country.region;
  find("#language").textContent = Object.values(country.languages).join(", ");
  find("#subregion").textContent = country.subregion;
  let currencyString = "";
  for (code of Object.keys(country.currencies)) {
    currencyString += `${country.currencies[code].name} (${code} | ${country.currencies[code].symbol}) `;
  }
  find("#currency").textContent = currencyString;
  find("#countryContainer").style.display = null;
  find("#countryContainer").scrollIntoView();
}

//a button function to close the info card
const closeContainer = () => (find("#countryContainer").style.display = "none");

fetchAllCountries(); //load the all countries section on page load
fetchCountriesByRegion(); //load the region section on page load

//nee to fix map not display, info not available condition. commenting on codes, add more infos.
