const storageKey = 'theme-preference';
const lightLabel = '{{ meta.themeSwitch.light }}';
const darkLabel = '{{ meta.themeSwitch.dark }}';
const themeColors = {
  dark: '{{ designTokens.colors.items[0].value }}', // Base Dark
  light: '{{ designTokens.colors.items[1].value }}' // Base Light
};

const theme = {
  value: getColorPreference()
};

window.onload = () => {
  const lightThemeToggle = document.querySelector('#light-theme-toggle');
  const darkThemeToggle = document.querySelector('#dark-theme-toggle');
  const switcher = document.querySelector('[data-theme-switcher]');

  if (!switcher) {
    return;
  }

  lightThemeToggle.addEventListener('click', () => onClick('light'));
  darkThemeToggle.addEventListener('click', () => onClick('dark'));

  lightThemeToggle.setAttribute('aria-pressed', theme.value === 'light');
  darkThemeToggle.setAttribute('aria-pressed', theme.value === 'dark');

  if (theme.value === 'dark') {
    toggleDisplay(lightThemeToggle);
  } else {
    toggleDisplay(darkThemeToggle);
  }

  reflectPreference();
  updateMetaThemeColor();

  document.querySelector('body').classList.remove('is-hidden');
};

// sync with system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: isDark}) => {
  theme.value = isDark ? 'dark' : 'light';
  setPreference();
  updateMetaThemeColor();
});

const toggleDisplay = target => {
  if (!target) return;
  if (target.classList.contains('is-hidden')) {
    target.classList.remove('is-hidden');
  } else {
    target.classList.add('is-hidden');
  }
};

function onClick(themeValue) {
  theme.value = themeValue;
  const lightToggle = document.querySelector('#light-theme-toggle');
  lightToggle.setAttribute('aria-pressed', themeValue === 'light');

  const darkToggle = document.querySelector('#dark-theme-toggle');
  darkToggle.setAttribute('aria-pressed', themeValue === 'dark');

  toggleDisplay(darkToggle);
  toggleDisplay(lightToggle);

  if (window.CUSDIS) {
    window.CUSDIS.setTheme(themeValue);
  }

  setPreference();
  updateMetaThemeColor();
}

function getColorPreference() {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

function setPreference() {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
  updateMetaThemeColor();
}

function reflectPreference() {
  document.firstElementChild.setAttribute('data-theme', theme.value);
  // document.querySelector('#light-theme-toggle')?.setAttribute('aria-label', lightLabel);
  // document.querySelector('#dark-theme-toggle')?.setAttribute('aria-label', darkLabel);
}

function updateMetaThemeColor() {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const newColor = theme.value === 'dark' ? themeColors.dark : themeColors.light;
  metaThemeColor.setAttribute('content', newColor);
}

// set early so no page flashes / CSS is made aware
reflectPreference();
