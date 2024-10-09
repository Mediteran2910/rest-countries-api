const switchModes = document.getElementById('switch-mode');
const modeImg = document.getElementById('mode-vector');
const searchImg = document.getElementById('search-vector');
const regionImg = document.getElementById('region-vector'); 
const backArrowImg = document.getElementById('back-arrow-img'); 

// Function to update theme(changing images depending of the theme)
function updateTheme(isDarkMode) {
    if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        modeImg.src = "images/sunIcon.svg";
        switchModes.textContent = 'Light mode';
        if (searchImg) {
            searchImg.src = "images/search-light.svg";
        }
        if (regionImg) {
            regionImg.src = "images/down-arrow-white.png";
        }
        if (backArrowImg) {
            backArrowImg.src = "images/final-arrow-white.svg";
        }
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark-mode');
        modeImg.src = "images/iconMoon.svg";
        switchModes.textContent = 'Dark mode';
        if (searchImg) {
            searchImg.src = "images/search-dark.svg";
        }
        if (regionImg) {
            regionImg.src = "images/down-arrow-black.png";
        }
        if (backArrowImg) {
            backArrowImg.src = "images/final-arrow-black.svg";
        }
        localStorage.setItem('theme', 'light');
    }
}

// Check the saved theme on page load and upfating the theme based on that
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        updateTheme(true);
    } else {
        updateTheme(false);
    }
});

// Swithing the themes 
switchModes.addEventListener('click', () => {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    updateTheme(!isDarkMode);
});
