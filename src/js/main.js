console.log("connected");
const themeToggle=document.getElementById("dark-mode-btn")
const countryList = document.getElementById("country-list");
const searchInput =document.getElementById("search-input");
const regionFilter =document.getElementById("region-filter");

let allCountries = []; 
//fetch countries
async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,");
       console.log(response);

        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        allCountries = data;
        displayCountries(allCountries);
        searchInput.disabled = false;
    return data;
    } catch (error) {
        console.log(error);
    }
    
}
//display countries
function displayCountries(countries) {
  try{
  countryList.innerHTML = "";
  countries.forEach(country => {
    const card = document.createElement("div");
    card.className = "country-card";
    card.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" />
       <h3>${country.name.common}</h3>
       <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
       <p><strong>Region:</strong> ${country.region}</p>
       <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
    `;
    card.addEventListener("click", () => {
      window.location.href = `country-detail.html?name=${country.name.common}`;
      console.log(card);
    });
    countryList.appendChild(card);
  });
} catch (error) {
    console.log(error);

}
}
searchInput.addEventListener("input", () => {
  filterCountries();
});
regionFilter.addEventListener("change", () => {
  filterCountries();
});
function filterCountries() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedRegion = regionFilter.value;

  const filtered = allCountries.filter(country => {
    const matchesSearch = (country.name?.common || "").toLowerCase().includes(searchTerm);
    const matchesRegion = selectedRegion === "all" || selectedRegion === "" ? true: country.region.toLowerCase() === selectedRegion.toLowerCase();
    
    return matchesSearch && matchesRegion;
  });

  displayCountries(filtered);
}
// Load saved theme from localStorage
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    themeToggle.textContent = "🌞 Light Mode";
  }else{
    themeToggle.textContent = "🌚 Dark Mode";
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
fetchCountries();