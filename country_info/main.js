//function to load all the countries as a List element
async function fetchAsync() {
  let response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,cca3"
  );
  let data = await response.json();
  data.forEach((country) => {
    let li = document.createElement("li");
    li.className = "gridItem";
    let div = document.createElement("div");
    div.className = "flagContainer";
    div.addEventListener("click", () => fetchAsyncOnClick(country.cca3));
    let img = document.createElement("img");
    img.src = country.flags.svg;
    div.appendChild(img);
    let h3 = document.createElement("h3");
    h3.textContent = country.name.common;
    div.appendChild(h3);
    li.appendChild(div);
    document.querySelector(".gridContainer").appendChild(li);
  });
}
fetchAsync(); //run the function of page load

async function fetchAsyncOnClick(countryCode) {
  let response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca3,currencies,capital,region,subregion,languages,area,maps,population,flags,coatOfArms"
  );
  let data = await response.json();
  let selectedCountry = data.find((country) => country.cca3 === countryCode);
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

//need to work on click disapearing, multiple name ID, map, currencies(maybe use foreach), info not available condition. commenting on codes. animation, hover, sorting, region tabs, closing or back button on countryContainer.
