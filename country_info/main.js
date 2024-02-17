const sortAlphabet = (data) =>
  data.sort((a, b) => {
    if (a.name.common > b.name.common) return 1;
    else if (a.name.common < b.name.common) return -1;
    else return 0;
  });

function createRegionSection(region) {
  const section = document.createElement("section");
  section.className = "regionSection";
  section.id = region;
  const h2 = document.createElement("h2");
  h2.textContent = region;
  section.appendChild(h2);
  const ul = document.createElement("ul");
  ul.className = "gridContainer";
  ul.id = `regionList${region}`;
  section.appendChild(ul);
  section.style.display = "none";
  document.querySelector("#regionsMain").appendChild(section);
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
  let selectedCountry = data.find((country) => country.cca3 === countryCode);
  // console.log(selectedCountry);
  document.querySelector("#countryName").textContent =
    document.querySelector("#countryNameCoa").textContent =
    document.querySelector("#countryNameFact").textContent =
    document.querySelector("#countryNameMap").textContent =
      selectedCountry.name.common;
  document.querySelector("#officialName").textContent =
    selectedCountry.name.official;
  document.querySelector("#flagAlt").textContent = document.querySelector(
    "#flag"
  ).alt = selectedCountry.flags.alt;
  document.querySelector("#flag").src = selectedCountry.flags.svg;
  document.querySelector("#coa").src = selectedCountry.coatOfArms.svg;
  document.querySelector("#cca3").textContent = selectedCountry.cca3;
  document.querySelector("#area").textContent = selectedCountry.area;
  document.querySelector("#capital").textContent = selectedCountry.capital;
  document.querySelector("#population").textContent =
    selectedCountry.population;
  document.querySelector("#region").textContent = selectedCountry.region;
  document.querySelector("#language").textContent = Object.values(
    selectedCountry.languages
  ).join(", ");
  document.querySelector("#subregion").textContent = selectedCountry.subregion;
  document.querySelector("#currency").textContent = Object.values(
    selectedCountry.currencies
  ).join(" ");
  document.querySelector("#countryContainer").style.display = null;
  document.querySelector("#countryContainer").scrollIntoView();
}

fetchAllCountry(); //load the all countries section on page load
fetchCountriesByRegion(); //load the region section on page load

//need to work on click disapearing, multiple name ID, map, currencies(maybe use foreach), info not available condition. commenting on codes. animation, hover, sorting, region tabs, closing or back button on countryContainer.
