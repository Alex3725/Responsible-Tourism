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

const THEME_KEY = "bora-theme";

const applyTheme = (mode: "light" | "dark") => {
  document.documentElement.classList.toggle("dark", mode === "dark");
  document.documentElement.style.colorScheme = mode;
  if (themeToggle) {
    themeToggle.textContent = mode === "dark" ? "Tema chiaro" : "Tema scuro";
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
