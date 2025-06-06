console.log("connected");
const themeToggle=document.getElementById("dark-mode-btn")

// Load saved theme from localStorage
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    themeToggle.textContent = "🌞 Light Mode";
  }else{
    themeToggle.textContent = "🌚 Dark Mode";
  }
}
console.log(loadTheme);
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