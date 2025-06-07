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