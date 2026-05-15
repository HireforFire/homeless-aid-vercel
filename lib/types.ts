export type ResourceCategory =
  | "Shelter"
  | "Food"
  | "Hygiene"
  | "Public Resources"
  | "Clothing & Supplies";

export type Resource = {
  id: string;
  name: string;
  category: ResourceCategory;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  hours: string;
  lat: number;
  lng: number;
  tags: string[];
  lastUpdated: string;
};

export type Region = {
  slug: string;
  name: string;
  state: string;
  description?: string;
  lat: number;
  lng: number;
  zoom: number;
  resourceCount: number;
};

export const categories: ResourceCategory[] = [
  "Shelter",
  "Food",
  "Hygiene",
  "Public Resources",
  "Clothing & Supplies",
];
