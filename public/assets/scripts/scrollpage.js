var _a, _b, _c;
const rooms = (_a = window.ROOMS) !== null && _a !== void 0 ? _a : [];
const foods = (_b = window.FOODS) !== null && _b !== void 0 ? _b : [];
const activities = (_c = window.ACTIVITIES) !== null && _c !== void 0 ? _c : [];
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("#scroll-nav");
const themeToggle = document.querySelector("[data-theme-toggle]");
const THEME_KEY = "bora-theme";
const applyTheme = (mode) => {
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
if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        const isHidden = nav.classList.toggle("hidden");
        navToggle.setAttribute("aria-expanded", String(!isHidden));
    });
}
const roomButtons = Array.from(document.querySelectorAll("[data-room-id]"));
const selectedRoomLabel = document.querySelector("[data-selected-room]");
const foodPriceEls = Array.from(document.querySelectorAll("[data-food-id]"));
const activityPriceEls = Array.from(document.querySelectorAll("[data-activity-id]"));
const formatPrice = (value) => {
    return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(value);
};
const setSelectedRoom = (roomId) => {
    var _a;
    roomButtons.forEach((button) => {
        const isSelected = button.dataset.roomId === roomId;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });
    const room = rooms.find((item) => item.id === roomId);
    if (selectedRoomLabel) {
        selectedRoomLabel.textContent = (_a = room === null || room === void 0 ? void 0 : room.name) !== null && _a !== void 0 ? _a : "Suite Laguna";
    }
    updatePrices(roomId);
};
const updatePrices = (roomId) => {
    foodPriceEls.forEach((element) => {
        var _a, _b, _c;
        const itemId = element.dataset.foodId;
        if (!itemId) {
            return;
        }
        const item = foods.find((food) => food.id === itemId);
        const price = (_c = (_b = (_a = item === null || item === void 0 ? void 0 : item.priceByRoom) === null || _a === void 0 ? void 0 : _a[roomId]) !== null && _b !== void 0 ? _b : item === null || item === void 0 ? void 0 : item.basePrice) !== null && _c !== void 0 ? _c : 0;
        element.textContent = formatPrice(price);
    });
    activityPriceEls.forEach((element) => {
        var _a, _b, _c;
        const itemId = element.dataset.activityId;
        if (!itemId) {
            return;
        }
        const item = activities.find((activity) => activity.id === itemId);
        const price = (_c = (_b = (_a = item === null || item === void 0 ? void 0 : item.priceByRoom) === null || _a === void 0 ? void 0 : _a[roomId]) !== null && _b !== void 0 ? _b : item === null || item === void 0 ? void 0 : item.basePrice) !== null && _c !== void 0 ? _c : 0;
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
