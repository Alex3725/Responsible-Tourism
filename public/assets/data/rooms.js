const rooms = [
    {
        id: "lagoon-suite",
        name: "Suite Laguna",
        basePrice: 1200,
        priceMultiplier: 1.0,
        imagePlaceholder: "Suite con vista laguna",
        shortDesc: "Accesso diretto alla laguna e terrazza privata.",
    },
    {
        id: "overwater-bungalow",
        name: "Bungalow Overwater",
        basePrice: 1800,
        priceMultiplier: 1.4,
        imagePlaceholder: "Bungalow sull'acqua",
        shortDesc: "Lusso assoluto con scala privata in laguna.",
    },
    {
        id: "garden-villa",
        name: "Villa Giardino",
        basePrice: 900,
        priceMultiplier: 0.8,
        imagePlaceholder: "Villa con giardino",
        shortDesc: "Privacy e verde, a pochi passi dalla spiaggia.",
    }
];
window.ROOMS = rooms;
export {};
