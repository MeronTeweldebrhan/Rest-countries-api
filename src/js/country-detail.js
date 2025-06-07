const countryDetail= document.querySelector(".country-detail");
const backBtn = document.querySelector(".back-button");

const countryName = new URLSearchParams(window.location.search).get("name");
console.log("Country name from URL:", countryName);

backBtn.addEventListener("click", () => {
    window.history.back();
});

async function fetchCountryDetail() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const selectedCountry = data.find(
      c => c.name.common.toLowerCase() === countryName.toLowerCase()
    );

    if (!selectedCountry) {
      countryDetail.innerHTML = `<p>Country not found.</p>`;
      return;
    }

    displayCountryDetail(selectedCountry,data);
  } catch (error) {
    console.log(error);
  }
}
function displayCountryDetail(country,allCountries) {
  try {
    const card = document.createElement("div");
    card.className = "country-details";
    card.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" class="country-flag" />
      <div class="country-info">
        <h2>${country.name.common}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Native Name:</strong> ${country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A"}</p>
        <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : "N/A"}</p>
        <p><strong>Top Level Domain:</strong> ${country.tld ? country.tld[0] : "N/A"}</p>
        <p><strong>Common Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
         <p><strong>currencies: ${country.currencies ? Object.values(country.currencies)[0].name : "N/A"}</p>
        <p><strong>Border Countries:</strong> <span id="border-countries"></span></p>
      </div>
    `;
    countryDetail.innerHTML = "";
    countryDetail.appendChild(card);
  } catch (error) {
    console.log(error);
  }
}

fetchCountryDetail(countryName);