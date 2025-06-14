const countryDetail= document.getElementById("country-details");
const backBtn = document.getElementById("back-btn");
const themeToggle=document.getElementById("dark-mode-btn")

const countryName = new URLSearchParams(window.location.search).get("name");
console.log("Country name from URL:", countryName);

backBtn.addEventListener("click", () => {
    window.history.back();
});

async function fetchCountryDetail() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=flags,name,population,region,subregion,capital,borders,currencies,languages,cca3");
console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();
    console.log(data);
if (!countryName) {
  countryDetail.innerHTML = `<p>No country specified.</p>`;
  return;
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
        <div class="info-columns">
          <div class="info-column">
            <p><strong>Native Name:</strong> ${country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A"}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Sub Region:</strong> ${country.subregion || "N/A"}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
          </div>
          <div class="info-column">
            <p><strong>Top Level Domain:</strong> ${country.tld ? country.tld[0] : "Data limit — info missing"}</p>
            <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : "N/A"}</p>
            <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
          </div>
        </div>
        <div class="border-section">
          <p><strong>Border Countries:</strong> <span id="border-countries"></span></p>
        </div>
      </div>
    `;
    countryDetail.innerHTML = "";
    countryDetail.appendChild(card);

const bordersContainer = card.querySelector("#border-countries");

if (country.borders) {
      country.borders.forEach(borderCode => {
        const borderCountry = allCountries.find(c => c.cca3 === borderCode);

        console.log("Border code:", borderCode, "-> Country:", borderCountry?.name?.common || "Not found"); // debug

      if (!borderCountry) return;
        const btn = document.createElement("button");
        btn.textContent = borderCountry.name.common;
        btn.className = "border-btn";
        btn.addEventListener("click", () => {
          window.location.href = `country-detail.html?name=${borderCountry.name.common}`;

        });
        bordersContainer.appendChild(btn);
      });
    } else {
      bordersContainer.textContent = "None";
    }

  } catch (error) {
    console.log(error);
  }
}

fetchCountryDetail(countryName);
// Load saved theme from localStorage
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "🌞 Light Mode";
  }else{
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙 Dark Mode";
  }
}

// Toggle theme and update localStorage
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  console.log(isDark);
  themeToggle.textContent = isDark ? "🌞 Light Mode" : "🌙 Dark Mode";
  console.log(themeToggle.textContent);
});

loadTheme();
