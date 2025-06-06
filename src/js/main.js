console.log("connected");
const themeToggle=document.getElementById("dark-mode-btn")



let allCountries = []; 
//fetch countries
async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }
        allCountries = data;
        console.log(allCountries);
    return data;
    } catch (error) {
        console.log(error);
    }
    
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