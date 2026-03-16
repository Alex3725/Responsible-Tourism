export {};

declare global {
  interface Window {
    ROOMS?: Array<{
      id: string;
      name: string;
      basePrice: number;
      priceMultiplier: number;
      imagePlaceholder: string;
      shortDesc: string;
    }>;
    FOODS?: Array<{
      id: string;
      label: string;
      basePrice: number;
      priceByRoom: Record<string, number>;
    }>;
    ACTIVITIES?: Array<{
      id: string;
      label: string;
      basePrice: number;
      priceByRoom: Record<string, number>;
    }>;
    ITINERARY?: Array<{
      day: number;
      title: string;
      summary: string;
    }>;
    BUDGET?: Array<{
      label: string;
      range: string;
    }>;
  }
}
