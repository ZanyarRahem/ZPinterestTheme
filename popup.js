// FILE: popup.js

document.addEventListener('DOMContentLoaded', () => {
  const themeSelector = document.getElementById('theme-selector');

  // Define the available themes, now including the new gradients
  const themes = {
    'default': 'Pinterest Default',
    'default-dark': 'Default Dark',
    'maroon-night': 'Maroon Night',
    'midnight-blue': 'Midnight Blue',
    'mint-light': 'Mint Light',
    'sunset-flow': 'Sunset Flow',      // New Gradient Theme
    'ocean-deep': 'Ocean Deep'        // New Gradient Theme
  };

  // Get the currently saved theme from storage
  chrome.storage.sync.get('selectedTheme', (data) => {
    const currentTheme = data.selectedTheme || 'default';

    // Dynamically create the radio buttons for each theme
    for (const [key, name] of Object.entries(themes)) {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'theme-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.id = key;
      radio.name = 'theme';
      radio.value = key;
      radio.checked = (key === currentTheme);

      const label = document.createElement('label');
      label.htmlFor = key;
      label.textContent = name;

      optionDiv.appendChild(radio);
      optionDiv.appendChild(label);
      
      // Add a click listener to the container div for better UX
      optionDiv.addEventListener('click', () => {
        radio.checked = true;
        chrome.storage.sync.set({ selectedTheme: radio.value });
      });

      themeSelector.appendChild(optionDiv);
    }
  });
});
