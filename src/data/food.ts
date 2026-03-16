type FoodItem = {
  id: string;
  label: string;
  basePrice: number;
  priceByRoom: Record<string, number>;
};

const foodItems: FoodItem[] = [
  {
    id: "lagoon-breakfast",
    label: "Colazione in bungalow",
    basePrice: 35,
    priceByRoom: {
      "lagoon-suite": 40,
      "overwater-bungalow": 50,
      "garden-villa": 30
    }
  },
  {
    id: "sunset-dinner",
    label: "Cena romantica sull'acqua",
    basePrice: 120,
    priceByRoom: {
      "lagoon-suite": 140,
      "overwater-bungalow": 170,
      "garden-villa": 110
    }
  },
  {
    id: "chef-table",
    label: "Chef table deluxe",
    basePrice: 180,
    priceByRoom: {
      "lagoon-suite": 200,
      "overwater-bungalow": 230,
      "garden-villa": 160
    }
  },
  {
    id: "lagoon-picnic",
    label: "Picnic su motu",
    basePrice: 75,
    priceByRoom: {
      "lagoon-suite": 85,
      "overwater-bungalow": 95,
      "garden-villa": 70
    }
  }
];

window.FOODS = foodItems;

export {};
