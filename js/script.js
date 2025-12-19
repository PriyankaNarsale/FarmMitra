/* -------------------------------------------------------------
   🌿 Splash Screen Animation
------------------------------------------------------------- */
window.addEventListener("load", () => {
  const splash = document.querySelector(".splash-screen");
  if (!splash) return;

  setTimeout(() => {
    splash.style.opacity = "0";
    setTimeout(() => splash.remove(), 600);
  }, 2500);
});

/* -------------------------------------------------------------
   🎤 Voice Assistant (Mic Input)
------------------------------------------------------------- */
const voiceBtn = document.getElementById("voiceBtn");
const queryInput = document.getElementById("query");

if (voiceBtn && queryInput) {
  const Recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (Recognition) {
    const mic = new Recognition();
    mic.lang = "en-IN";

    voiceBtn.addEventListener("click", () => {
      mic.start();
      voiceBtn.style.transform = "scale(1.2)";
    });

    mic.onresult = (event) => {
      queryInput.value = event.results[0][0].transcript;
      voiceBtn.style.transform = "scale(1)";
    };

    mic.onend = () => {
      voiceBtn.style.transform = "scale(1)";
    };
  }
}

/* -------------------------------------------------------------
   🌦 Weather API Setup
------------------------------------------------------------- */
const API_KEY = "d959480f77a8f8d65e8ba98c0f3fef44";

/* Multi-language dictionary for weather UI */
const translations = {
  en: {
    "weather-title": "Weather Prediction",
    "get-weather-btn": "Get Weather",
    "temperature": "Temperature:",
    "humidity": "Humidity:",
    "rainfall": "Rainfall:",
    "condition": "Condition:",
    "placeholder": "Enter your city...",
    "alert-empty": "Please enter a city name.",
    "alert-error": "Unable to fetch weather data. Please check the city name."
  },
  hi: {
    "weather-title": "मौसम पूर्वानुमान",
    "get-weather-btn": "मौसम देखें",
    "temperature": "तापमान:",
    "humidity": "नमी:",
    "rainfall": "वर्षा:",
    "condition": "मौसम स्थिति:",
    "placeholder": "अपना शहर दर्ज करें...",
    "alert-empty": "कृपया शहर का नाम दर्ज करें।",
    "alert-error": "मौसम डेटा प्राप्त नहीं कर सके। कृपया शहर का नाम जांचें।"
  },
  mr: {
    "weather-title": "हवामान अंदाज",
    "get-weather-btn": "हवामान पाहा",
    "temperature": "तापमान:",
    "humidity": "आर्द्रता:",
    "rainfall": "पावसाचे प्रमाण:",
    "condition": "हवामान स्थिती:",
    "placeholder": "आपले शहर प्रविष्ट करा...",
    "alert-empty": "कृपया शहराचे नाव प्रविष्ट करा.",
    "alert-error": "हवामान डेटा मिळवता आला नाही. कृपया शहराचे नाव तपासा."
  }
};

let currentLang = "en";

/* Update all dynamic UI text */
function updateLanguage() {
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    el.textContent = translations[currentLang][key];
  });

  const input = document.getElementById("cityInput");
  if (input) input.placeholder = translations[currentLang]["placeholder"];
}

/* Language selector */
document.getElementById("languageSelect")?.addEventListener("change", e => {
  currentLang = e.target.value;
  updateLanguage();
});

/* Set initial language */
updateLanguage();

/* Fetch weather data from API */
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      alert(translations[currentLang]["alert-error"]);
      return;
    }

    const data = await response.json();

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("tempValue").textContent = data.main.temp;
    document.getElementById("humidityValue").textContent = data.main.humidity;

    const rain = data.rain?.["1h"] || data.rain?.["3h"] || 0;
    document.getElementById("rainValue").textContent = rain;

    document.getElementById("conditionValue").textContent =
      data.weather[0].description;

  } catch (error) {
    alert(translations[currentLang]["alert-error"]);
  }
}

/* Weather button */
document.getElementById("getWeatherBtn")?.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert(translations[currentLang]["alert-empty"]);
    return;
  }
  getWeather(city);
});

/* -------------------------------------------------------------
   🌐 Google Translate Controller
------------------------------------------------------------- */
function setGoogleLanguage(lang) {
  const combo = document.querySelector(".goog-te-combo");
  if (combo) {
    combo.value = lang;
    combo.dispatchEvent(new Event("change"));
    return true;
  }
  return false;
}

function changeLanguage(lang) {
  if (setGoogleLanguage(lang)) return;

  let tries = 0;
  const timer = setInterval(() => {
    if (setGoogleLanguage(lang) || tries++ > 10) clearInterval(timer);
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("languageSelect");
  select?.addEventListener("change", (e) => changeLanguage(e.target.value));
});

/* -------------------------------------------------------------
   💰 Government Schemes Dynamic Loader
------------------------------------------------------------- */
const govSchemes = [
  {
    name: "PM Kisan Samman Nidhi",
    desc: "₹6000 annual support for small farmers.",
    url: "https://pmkisan.gov.in/"
  },
  {
    name: "PM Fasal Bima Yojana",
    desc: "Crop insurance and financial aid.",
    url: "https://pmfby.gov.in/"
  },
  {
    name: "Soil Health Card Scheme",
    desc: "Know your soil nutrients & get fertilizer recommendations.",
    url: "https://soilhealth.dac.gov.in/aboutus"
  }
];

function loadGovSchemes() {
  const list = document.getElementById("govList");
  if (!list) return;

  list.innerHTML = "";

  govSchemes.forEach((scheme) => {
    const card = document.createElement("div");
    card.className = "gov-card";

    card.innerHTML = `
      <h3>${scheme.name}</h3>
      <p>${scheme.desc}</p>
      <a href="${scheme.url}" target="_blank" class="gov-btn">Visit Site</a>
    `;

    list.appendChild(card);
  });
}

loadGovSchemes();

/* -------------------------------------------------------------
   🎨 Card Hover Animation
------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card, .gov-card").forEach(card => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "translateY(-8px)";
    });
    card.addEventListener("mouseout", () => {
      card.style.transform = "translateY(0)";
    });
  });
});
