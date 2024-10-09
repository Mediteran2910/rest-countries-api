const switchModes = document.getElementById('switch-mode');
const modeImg = document.getElementById('mode-vector');
const modeText = document.querySelector('span');
const searchImg = document.getElementById('search-vector');
const regionImg = document.getElementById('region-vector'); 
const backArrowImg = document.getElementById('back-arrow-img'); 

// Function to update theme (changing images depending on the theme)
function updateTheme(isDarkMode) {
    if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        modeText.textContent = 'Light Mode';
        modeImg.src = "images/sunIcon.svg"; // Sun icon for dark mode
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
        modeImg.src = "images/iconMoon.svg"; // Moon icon for light mode
        modeText.textContent = 'Dark Mode'; // Set the button text back to 'Dark Mode'
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

// Check the saved theme on page load and updating the theme based on that
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    // Initialize the theme based on saved preference or default to light mode
    if (savedTheme === 'dark') {
        updateTheme(true); // Dark mode
    } else {
        updateTheme(false); // Light mode
    }
});

// Switching the themes 
switchModes.addEventListener('click', () => {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    updateTheme(!isDarkMode);
});