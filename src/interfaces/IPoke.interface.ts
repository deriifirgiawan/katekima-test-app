export interface IPoke {
  name: string;
  url: string;
}

export interface Berry {
  firmness: Firmness;
  flavors: FlavorPotency[];
  growth_time: number;
  id: number;
  item: NamedAPIResource;
  max_harvest: number;
  name: string;
  natural_gift_power: number;
  natural_gift_type: NamedAPIResource;
  size: number;
  smoothness: number;
  soil_dryness: number;
}

export interface Firmness {
  name: string;
  url: string;
}

export interface FlavorPotency {
  flavor: NamedAPIResource;
  potency: number;
}

export interface NamedAPIResource {
  name: FlavorType;
  url: string;
}

export type FlavorType =  "spicy" | "dry" | "sweet" | "bitter" | "sour";
