"use strict";
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("#site-nav");
const themeToggle = document.querySelector("[data-theme-toggle]");
const languageToggle = document.querySelector("[data-lang-toggle]");
const THEME_KEY = "bora-theme";
const LANGUAGE_KEY = "bora-language";
const IT_TO_EN = {
    "Hotel Bora Bora - Pagina principale": "Hotel Bora Bora - Home",
    "Sogno a Bora Bora": "Dream of Bora Bora",
    "Edizione privata laguna": "Laguna private edition",
    "Bora Bora come un set cinematografico, non come una brochure.": "Bora Bora like a film set, not a brochure.",
    "Una settimana costruita come un soggiorno signature: arrivo scenografico in barca privata, suite sospese sulla laguna, giornate calibrate tra mare, escursioni e rituali lenti al tramonto.": "A week built like a signature stay: scenic arrival by private boat, suites suspended over the lagoon, days calibrated between sea, excursions, and slow sunset rituals.",
    "Apri l'itinerario completo": "Open the full itinerary",
    "Esplora la settimana": "Explore the week",
    Durata: "Duration",
    "7 giorni": "7 days",
    "Ritmo lento, nessuna giornata sprecata.": "Slow pace, no day wasted.",
    Clima: "Climate",
    "28 C": "28 C",
    "Stagione secca, acqua limpida e sole pieno.": "Dry season, clear water, and full sun.",
    Atmosfera: "Mood",
    "Calma di lusso": "Luxury calm",
    "Soggiorno signature overwater": "Overwater signature stay",
    "Spa, snorkeling, tavoli sull'acqua e privacy.": "Spa, snorkeling, overwater tables, and privacy.",
    "Una suite che inizia gia dal pontile.": "A suite that starts right at the pier.",
    "Terrazza privata, colazione servita in bungalow e accesso diretto alla laguna per aprire la giornata senza interruzioni.": "Private terrace, breakfast served in the bungalow, and direct lagoon access to start the day without interruptions.",
    "da 1.200 EUR / notte": "from EUR 1,200 / night",
    "Nota di viaggio": "Travel note",
    "24-30 ore di viaggio, poi il tempo rallenta.": "24-30 hours of travel, then time slows down.",
    "Il progetto e costruito per far percepire l'arrivo come un cambio netto di atmosfera.": "The project is designed to make the arrival feel like a clear shift in atmosphere.",
    "Regia del viaggio": "Travel direction",
    "Trasferimenti lunghi ma fluidi, arrivo scenico e check-in senza attriti.": "Long but smooth transfers, scenic arrival, and frictionless check-in.",
    "Acqua come protagonista": "Water as the main character",
    "Kayak, snorkeling, giardini di corallo e luce turchese che domina tutto il layout.": "Kayak, snorkeling, coral gardens, and turquoise light that dominates the entire layout.",
    "Lusso che respira": "Luxury that breathes",
    "Non solo premium: spazi ariosi, vetro, gradienti caldi e un tono piu editoriale.": "Not just premium: airy spaces, glass, warm gradients, and a more editorial tone.",
    "Settimana signature": "Signature week",
    "Una settimana con ritmo da rivista di viaggio.": "A week with the rhythm of a travel magazine.",
    "Ogni blocco alterna immersione sensoriale e praticita: laguna al mattino, isola principale nel mezzo, rituali lenti e cene scenografiche a chiudere.": "Each block alternates sensory immersion and practicality: lagoon in the morning, main island in the middle, slow rituals and scenic dinners to close.",
    Resort: "Resort",
    "Icone overwater": "Overwater icons",
    Scene: "Scenes",
    "Laguna + motu": "Lagoon + motu",
    "Giorno 1": "Day 1",
    "Partenza, arrivo e primo bagno di luce": "Departure, arrival, and the first bath of light",
    "Volo dall'Italia, transfer in barca privata e ingresso in resort come apertura di scena.": "Flight from Italy, private boat transfer, and resort entry as an opening scene.",
    "Giorni 2-3": "Days 2-3",
    "Laguna piena, coral garden e picnic su motu": "Full lagoon, coral garden, and a motu picnic",
    "Kayak, snorkeling e un'intera giornata d'acqua turchese senza rumore visivo.": "Kayak, snorkeling, and a full day of turquoise water without visual noise.",
    "Giorni 4-5": "Days 4-5",
    "Isola principale, 4x4 e mare aperto": "Main island, 4x4, and open sea",
    "Punti panoramici, Mount Otemanu, immersioni e crociera al tramonto con champagne.": "Viewpoints, Mount Otemanu, diving, and a sunset cruise with champagne.",
    "Giorni 6-7": "Days 6-7",
    "Helicopter view, spa e rientro calibrato": "Helicopter view, spa, and a calibrated return",
    "Il finale resta alto: volo panoramico, massaggio polinesiano, ultimo bagno e ritorno.": "The finale stays high: panoramic flight, Polynesian massage, last swim, and return.",
    "Desk di pianificazione": "Planning desk",
    "Apri la pagina completa e trasforma il concept in un soggiorno navigabile.": "Open the full page and turn the concept into a navigable stay.",
    "La scroll page collega camere, ristorazione e attivita in un unico percorso, con prezzi che cambiano in base alla suite selezionata.": "The scroll page connects rooms, dining, and activities in a single path, with prices that change based on the selected suite.",
    "Vai alla experience page": "Go to the experience page",
    "Camere interattive, prezzi dinamici e tono visivo coerente.": "Interactive rooms, dynamic prices, and a coherent visual tone.",
    "Una landing con tono piu editoriale, atmosferico e leggibile.": "A landing page with a more editorial, atmospheric, and readable tone.",
    "Esperienza completa": "Full experience",
    Settimana: "Week",
    "Laguna di Bora Bora con resort sull'acqua": "Bora Bora lagoon with overwater resort",
};
const EN_TO_IT = Object.fromEntries(Object.entries(IT_TO_EN).map(([it, en]) => [en, it]));
let currentLanguage = "it";
const getThemeLabel = (mode, language) => {
    if (language === "en") {
        return mode === "dark" ? "Light theme" : "Dark theme";
    }
    return mode === "dark" ? "Tema chiaro" : "Tema scuro";
};
const updateLanguageToggleLabel = () => {
    if (!languageToggle) {
        return;
    }
    languageToggle.textContent = currentLanguage === "en" ? "Italiano" : "English";
    languageToggle.setAttribute("aria-pressed", String(currentLanguage === "it"));
};
const normalizeText = (value) => value.replace(/\s+/g, " ").trim();
const buildNormalizedMap = (map) => Object.fromEntries(Object.entries(map).map(([key, value]) => [normalizeText(key), value]));
const replaceMappedText = (map) => {
    const normalizedMap = buildNormalizedMap(map);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }
    textNodes.forEach((node) => {
        const original = node.nodeValue ?? "";
        const normalized = normalizeText(original);
        if (!normalized) {
            return;
        }
        const translated = normalizedMap[normalized];
        if (!translated) {
            return;
        }
        const leading = original.match(/^\s*/)?.[0] ?? "";
        const trailing = original.match(/\s*$/)?.[0] ?? "";
        node.nodeValue = `${leading}${translated}${trailing}`;
    });
};
const replaceMappedAttributes = (map) => {
    if (map[document.title]) {
        document.title = map[document.title];
    }
    const elements = Array.from(document.querySelectorAll("[placeholder], [aria-label]"));
    elements.forEach((element) => {
        const placeholder = element.getAttribute("placeholder");
        if (placeholder && map[placeholder]) {
            element.setAttribute("placeholder", map[placeholder]);
        }
        const ariaLabel = element.getAttribute("aria-label");
        if (ariaLabel && map[ariaLabel]) {
            element.setAttribute("aria-label", map[ariaLabel]);
        }
    });
};
const applyLanguage = (language) => {
    const map = language === "en" ? IT_TO_EN : EN_TO_IT;
    replaceMappedText(map);
    replaceMappedAttributes(map);
    currentLanguage = language;
    document.documentElement.lang = language;
    updateLanguageToggleLabel();
    const mode = document.documentElement.classList.contains("dark") ? "dark" : "light";
    applyTheme(mode);
};
const applyTheme = (mode) => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.style.colorScheme = mode;
    if (themeToggle) {
        themeToggle.textContent = getThemeLabel(mode, currentLanguage);
        themeToggle.setAttribute("aria-pressed", String(mode === "dark"));
    }
};
const storedTheme = localStorage.getItem(THEME_KEY);
if (storedTheme === "light" || storedTheme === "dark") {
    applyTheme(storedTheme);
}
else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
}
else {
    applyTheme("light");
}
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.classList.contains("dark");
        const next = isDark ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
    });
}
const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
if (storedLanguage === "en" || storedLanguage === "it") {
    applyLanguage(storedLanguage);
}
else {
    applyLanguage("en");
}
if (languageToggle) {
    languageToggle.addEventListener("click", () => {
        const nextLanguage = currentLanguage === "en" ? "it" : "en";
        localStorage.setItem(LANGUAGE_KEY, nextLanguage);
        applyLanguage(nextLanguage);
    });
}
if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        const isHidden = nav.classList.toggle("hidden");
        navToggle.setAttribute("aria-expanded", String(!isHidden));
    });
}
