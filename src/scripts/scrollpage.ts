type Room = {
  id: string;
  name: string;
  basePrice: number;
  priceMultiplier: number;
  imagePlaceholder: string;
  shortDesc: string;
};

type FoodItem = {
  id: string;
  label: string;
  basePrice: number;
  priceByRoom: Record<string, number>;
};

type ActivityItem = {
  id: string;
  label: string;
  basePrice: number;
  priceByRoom: Record<string, number>;
};

const rooms = window.ROOMS ?? [];
const foods = window.FOODS ?? [];
const activities = window.ACTIVITIES ?? [];

const navToggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
const nav = document.querySelector<HTMLElement>("#scroll-nav");
const themeToggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const languageToggle = document.querySelector<HTMLButtonElement>("[data-lang-toggle]");

const THEME_KEY = "bora-theme";
const LANGUAGE_KEY = "bora-language";

type LanguageMode = "en" | "it";

const IT_TO_EN: Record<string, string> = {
  "Hotel Bora Bora - Scroll Page": "Hotel Bora Bora - Experience Page",
  "Una scroll page che vende atmosfera, non solo informazioni.":
    "A scroll page that sells atmosphere, not just information.",
  "Qui il soggiorno diventa navigabile: scegli la camera, osserva come cambiano prezzi e servizi, attraversa il viaggio come se fosse una narrazione continua.":
    "Here the stay becomes navigable: pick your room, watch prices and services adapt, and move through the trip like a continuous story.",
  "Camere dinamiche": "Dynamic rooms",
  "Dining su misura": "Tailored dining",
  "Attivita premium": "Premium activities",
  "Journey edit": "Journey edit",
  "Suite, dining e attivita leggono come un unico sistema.":
    "Suites, dining, and activities read as one connected system.",
  "Il layout ora separa chiaramente i blocchi ma li tiene dentro una stessa atmosfera visiva.":
    "The layout now separates sections clearly while keeping one visual atmosphere.",
  "7 giorni curati": "7 curated days",
  Camere: "Rooms",
  "Scegli la camera ideale": "Choose your ideal room",
  "La camera selezionata aggiorna i prezzi di ristorazione e attivita.":
    "The selected room updates dining and activity prices.",
  "Camera selezionata": "Selected room",
  "Suite Laguna": "Lagoon Suite",
  "Accesso diretto alla laguna e terrazza privata.":
    "Direct lagoon access and private terrace.",
  "da 1.200 EUR / notte": "from EUR 1,200 / night",
  "Ruota per dettagli": "Flip for details",
  "Dettagli Suite Laguna": "Lagoon Suite details",
  "Terrazza privata sull'acqua": "Private overwater terrace",
  "Colazione in bungalow": "Bungalow breakfast",
  "Servizio concierge dedicato": "Dedicated concierge service",
  "Bungalow Overwater": "Overwater Bungalow",
  "Lusso assoluto con scala privata in laguna.":
    "Absolute luxury with private lagoon steps.",
  "da 1.800 EUR / notte": "from EUR 1,800 / night",
  "Dettagli Bungalow": "Bungalow details",
  "Terrazza panoramica": "Panoramic terrace",
  "Accesso diretto al mare": "Direct sea access",
  "Check-in premium": "Premium check-in",
  "Villa Giardino": "Garden Villa",
  "Privacy e verde, a pochi passi dalla spiaggia.":
    "Privacy and greenery, a short walk from the beach.",
  "da 900 EUR / notte": "from EUR 900 / night",
  "Dettagli Villa": "Villa details",
  "Giardino privato": "Private garden",
  "Area lounge ombreggiata": "Shaded lounge area",
  "Accesso rapido ai servizi": "Quick access to services",
  Ristorazione: "Dining",
  "Sapori polinesiani e cene sull'acqua": "Polynesian flavors and overwater dinners",
  "Colazioni in bungalow, picnic su motu e cene romantiche al tramonto.":
    "Bungalow breakfasts, motu picnics, and romantic sunset dinners.",
  "Prezzi indicativi basati sulla camera selezionata":
    "Estimated prices based on selected room",
  "Servizio privato con vista laguna.": "Private service with lagoon view.",
  "Cena romantica sull'acqua": "Romantic overwater dinner",
  "Menu degustazione con champagne.": "Tasting menu with champagne.",
  "Chef table deluxe": "Deluxe chef table",
  "Esperienza culinaria esclusiva.": "Exclusive culinary experience.",
  "Picnic su motu": "Motu picnic",
  "Pranzo privato su isolotto tropicale.": "Private lunch on a tropical islet.",
  Attivita: "Activities",
  "Avventura e relax in laguna": "Adventure and lagoon relaxation",
  "Snorkeling con razze, tour dell'isola, immersioni e spa di lusso.":
    "Snorkeling with rays, island tours, diving, and luxury spa moments.",
  "Escursione in laguna": "Lagoon excursion",
  "Snorkeling con razze e piccoli squali.": "Snorkeling with rays and small sharks.",
  "Tour isola principale": "Main island tour",
  "4x4, mercato locale e punti panoramici.": "4x4 rides, local market, and viewpoints.",
  "Immersioni e mare": "Diving and open sea",
  "Nuoto con pesci tropicali e tartarughe.": "Swim with tropical fish and turtles.",
  "Spa polinesiana": "Polynesian spa",
  "Massaggio tradizionale e relax.": "Traditional massage and relaxation.",
  Servizi: "Services",
  "Servizi esclusivi e comfort": "Exclusive services and comfort",
  "Ogni momento e seguito dal nostro team: trasferimenti, concierge e supporto 24/7.":
    "Every moment is supported by our team: transfers, concierge, and 24/7 assistance.",
  "Spa e massaggi polinesiani": "Spa and Polynesian massages",
  "Trasferimento in barca privata": "Private boat transfer",
  "Concierge per escursioni": "Excursion concierge",
  "Assistenza continua in resort": "Continuous resort assistance",
  "Itinerario 7 giorni": "7-day itinerary",
  "Giorno 1: volo dall'Italia, arrivo e check-in in bungalow":
    "Day 1: flight from Italy, arrival and bungalow check-in",
  "Giorno 2: relax in laguna, kayak e snorkeling":
    "Day 2: lagoon relaxation, kayak and snorkeling",
  "Giorno 3: escursione laguna con picnic su motu":
    "Day 3: lagoon excursion with motu picnic",
  "Giorno 4: tour dell'isola principale e Mount Otemanu":
    "Day 4: main island tour and Mount Otemanu",
  "Giorno 5: immersioni, jet ski e crociera al tramonto":
    "Day 5: diving, jet ski, and sunset cruise",
  "Giorno 6: volo panoramico in elicottero e spa":
    "Day 6: panoramic helicopter flight and spa",
  "Giorno 7: ultimo bagno, shopping e rientro":
    "Day 7: final swim, shopping, and return",
  "Budget indicativo (7 giorni)": "Estimated budget (7 days)",
  "Voli: 1500-2500 EUR": "Flights: EUR 1,500-2,500",
  "Hotel luxury: 6000-10000 EUR": "Luxury hotel: EUR 6,000-10,000",
  "Attivita: 300-800 EUR": "Activities: EUR 300-800",
  "Cibo: 400-700 EUR": "Food: EUR 400-700",
  "Periodo ideale": "Best period",
  "Maggio-ottobre, clima secco e soleggiato con temperature intorno ai 28 C.":
    "May-October, dry and sunny weather with temperatures around 28 C.",
  "Mare e snorkeling": "Sea and snorkeling",
  "Laguna turchese": "Turquoise lagoon",
  "Stagione secca": "Dry season",
  Contatti: "Contact",
  "Parliamo del tuo viaggio": "Let's plan your trip",
  "Inviaci le tue preferenze e prepareremo un piano personalizzato.":
    "Send your preferences and we will prepare a personalized plan.",
  "Nome e cognome": "Full name",
  Email: "Email",
  Messaggio: "Message",
  "Invia richiesta": "Send request",
  Dettagli: "Details",
  "Assistenza dedicata per viaggi a Bora Bora":
    "Dedicated support for Bora Bora travel",
  "Risposta entro 24 ore lavorative": "Response within 24 business hours",
  "Consulenza su voli e trasferimenti": "Consulting on flights and transfers",
  "Hotel Bora Bora": "Hotel Bora Bora",
  "Pagina experience con card piu scenografiche e gerarchia piu netta.":
    "Experience page with more scenic cards and clearer hierarchy.",
  "Inserisci il nome": "Enter your name",
  "nome@email.com": "name@email.com",
  "Preferenze, date, richieste speciali": "Preferences, dates, special requests",
};

const EN_TO_IT: Record<string, string> = Object.fromEntries(
  Object.entries(IT_TO_EN).map(([it, en]) => [en, it])
);

let currentLanguage: LanguageMode = "it";

const getThemeLabel = (mode: "light" | "dark", language: LanguageMode) => {
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

const replaceMappedText = (map: Record<string, string>) => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  textNodes.forEach((node) => {
    const original = node.nodeValue ?? "";
    const trimmed = original.trim();
    if (!trimmed) {
      return;
    }

    const translated = map[trimmed];
    if (!translated) {
      return;
    }

    const leading = original.match(/^\s*/)?.[0] ?? "";
    const trailing = original.match(/\s*$/)?.[0] ?? "";
    node.nodeValue = `${leading}${translated}${trailing}`;
  });
};

const replaceMappedAttributes = (map: Record<string, string>) => {
  if (map[document.title]) {
    document.title = map[document.title];
  }

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>("[placeholder], [aria-label]")
  );

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

const applyLanguage = (language: LanguageMode) => {
  const map = language === "en" ? IT_TO_EN : EN_TO_IT;
  replaceMappedText(map);
  replaceMappedAttributes(map);
  currentLanguage = language;
  document.documentElement.lang = language;
  updateLanguageToggleLabel();

  const mode = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  applyTheme(mode);
};

const applyTheme = (mode: "light" | "dark") => {
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
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
} else {
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
} else {
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

const roomButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-room-id]")
);
const selectedRoomLabel = document.querySelector<HTMLElement>("[data-selected-room]");
const foodPriceEls = Array.from(
  document.querySelectorAll<HTMLElement>("[data-food-id]")
);
const activityPriceEls = Array.from(
  document.querySelectorAll<HTMLElement>("[data-activity-id]")
);

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
};

const setSelectedRoom = (roomId: string) => {
  roomButtons.forEach((button) => {
    const isSelected = button.dataset.roomId === roomId;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  const room = rooms.find((item) => item.id === roomId);
  if (selectedRoomLabel) {
    selectedRoomLabel.textContent = room?.name ?? "Suite Laguna";
  }

  updatePrices(roomId);
};

const updatePrices = (roomId: string) => {
  foodPriceEls.forEach((element) => {
    const itemId = element.dataset.foodId;
    if (!itemId) {
      return;
    }
    const item = foods.find((food) => food.id === itemId);
    const price = item?.priceByRoom?.[roomId] ?? item?.basePrice ?? 0;
    element.textContent = formatPrice(price);
  });

  activityPriceEls.forEach((element) => {
    const itemId = element.dataset.activityId;
    if (!itemId) {
      return;
    }
    const item = activities.find((activity) => activity.id === itemId);
    const price = item?.priceByRoom?.[roomId] ?? item?.basePrice ?? 0;
    element.textContent = formatPrice(price);
  });
};

const attachRoomHandlers = () => {
  roomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const roomId = button.dataset.roomId;
      if (!roomId) {
        return;
      }
      setSelectedRoom(roomId);
      roomButtons.forEach((other) => {
        if (other !== button) {
          other.classList.remove("is-flipped");
        }
      });
      button.classList.toggle("is-flipped");
    });
  });
};

const init = () => {
  attachRoomHandlers();
  if (rooms.length > 0) {
    setSelectedRoom(rooms[0].id);
  }
};

init();

export {};
