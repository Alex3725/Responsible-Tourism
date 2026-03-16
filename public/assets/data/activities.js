const activityItems = [
    {
        id: "lagoon-cruise",
        label: "Escursione in laguna",
        basePrice: 90,
        priceByRoom: {
            "lagoon-suite": 100,
            "overwater-bungalow": 120,
            "garden-villa": 80
        }
    },
    {
        id: "island-tour",
        label: "Tour isola principale",
        basePrice: 140,
        priceByRoom: {
            "lagoon-suite": 150,
            "overwater-bungalow": 180,
            "garden-villa": 120
        }
    },
    {
        id: "diving-experience",
        label: "Immersioni e mare",
        basePrice: 220,
        priceByRoom: {
            "lagoon-suite": 240,
            "overwater-bungalow": 270,
            "garden-villa": 200
        }
    },
    {
        id: "spa-ritual",
        label: "Spa polinesiana",
        basePrice: 160,
        priceByRoom: {
            "lagoon-suite": 175,
            "overwater-bungalow": 210,
            "garden-villa": 140
        }
    }
];
window.ACTIVITIES = activityItems;
export {};
