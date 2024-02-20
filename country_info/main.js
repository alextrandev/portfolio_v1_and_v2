const sortAlphabet = (data) =>
  data.sort((a, b) => {
    if (a.name.common > b.name.common) return 1;
    else if (a.name.common < b.name.common) return -1;
    else return 0;
  });

const id = (name) => document.querySelector(`#${name}`);

function createRegionSection(region) {
  const section = document.createElement("section");
  section.className = "regionSection";
  section.id = region;
  const ul = document.createElement("ul");
  ul.className = "gridContainer";
  ul.id = `regionList${region}`;
  section.appendChild(ul);
  section.style.display = "none";
  id("regionsMain").appendChild(section);
}

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
  document.querySelector(`#regionList${region}`).appendChild(li);
}

function createRegionSelectButton(region) {
  const regionH2 = document.createElement("h2");
  regionH2.className = "region_select_button";
  regionH2.id = `${region}Section`;
  regionH2.textContent = region;
  const regionSelect = document.querySelector(".region_select");
  regionH2.addEventListener("click", () => changeRegion(regionH2.textContent));
  regionSelect.appendChild(regionH2);
}

function changeRegion(region) {
  const regionSection = document.querySelectorAll(".regionSection");
  regionSection.forEach((section) => (section.style.display = "none"));
  const thisRegion = document.querySelector(`#${region}`);
  thisRegion.style.display = "block";
  const allRegionButton = document.querySelectorAll(".region_select_button");
  allRegionButton.forEach((button) => button.style.removeProperty("filter"));
  const thisRegionButton = document.querySelector(`#${region}Section`);
  thisRegionButton.style.filter = "drop-shadow(0px 0px 2px #3E92CC)";
}

async function fetchAllCountry() {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,cca3"
  );
  const data = await response.json();
  const sortedData = sortAlphabet(data);
  let region = "All";
  createRegionSelectButton(region);
  createRegionSection(region);
  document.querySelector("#All").style.display = "block";
  for (country of sortedData) {
    createCountryCard(country, region);
  }
}

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

async function fetchCountryOnClick(countryCode) {
  let response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca3,currencies,capital,region,subregion,languages,area,maps,population,flags,coatOfArms"
  );
  let data = await response.json();
  let country = data.find((country) => country.cca3 === countryCode);
  // console.log(country);
  document.querySelector("#countryName").textContent =
    document.querySelector("#countryNameCoa").textContent =
    document.querySelector("#countryNameFact").textContent =
    document.querySelector("#countryNameMap").textContent =
      country.name.common;
  document.querySelector("#officialName").textContent = country.name.official;
  document.querySelector("#flagAlt").textContent = document.querySelector(
    "#flag"
  ).alt = country.flags.alt;
  // document.querySelector("#flag").src = country.flags.svg;
  id("flag").src = country.flags.svg;
  document.querySelector("#coa").src = country.coatOfArms.svg;
  document.querySelector("#cca3").textContent = country.cca3;
  document.querySelector("#area").textContent = country.area;
  document.querySelector("#capital").textContent = country.capital;
  document.querySelector("#population").textContent = country.population;
  document.querySelector("#region").textContent = country.region;
  document.querySelector("#language").textContent = Object.values(
    country.languages
  ).join(", ");
  document.querySelector("#subregion").textContent = country.subregion;
  let currencyString = "";
  const currencyObj = country.currencies;
  for (code of Object.keys(currencyObj)) {
    currencyString += `${currencyObj[code].name} (${code} | ${currencyObj[code].symbol}) `;
  }
  document.querySelector("#currency").textContent = currencyString;
  document.querySelector("#countryContainer").style.display = null;
  document.querySelector("#countryContainer").scrollIntoView();
}

const closeCountryContainer = () =>
  (document.querySelector("#countryContainer").style.display = "none");

fetchAllCountry(); //load the all countries section on page load
fetchCountriesByRegion(); //load the region section on page load

//map, info not available condition. commenting on codes. animation, hover, closing or back button on countryContainer.
