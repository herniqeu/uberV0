export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  options?: {
    title: string;
    description: string;
    store: string;
    delivery: string;
    savings: string;
    icon: string;
    availability?: string;
    products?: {
      name: string;
      price: string;
      brand: string;
      available?: boolean;
      alternatives?: {
        name: string;
        price: string;
      }[];
    }[];
    smartFeatures?: string[];
  }[];
}

export interface GroceryResponse {
  stores: Store[];
  products: Product[];
  alternatives: Product[];
  delivery_estimates: DeliveryEstimate[];
  recommendations: string[];
}

export interface Store {
  id: string;
  name: string;
  distance: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  store: string;
  organic: boolean;
  dietary?: string[];
}

export interface DeliveryEstimate {
  store: string;
  time: string;
  fee: number;
}