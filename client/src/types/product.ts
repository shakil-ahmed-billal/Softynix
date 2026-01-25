/**
 * Product types for frontend
 */

export interface Product {
  id: string | number;
  title: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  discount?: number;
  categoryId: string | number;
  featured?: boolean;
  isNew?: boolean;
  priceValue: number;
  image?: string;
  reviews?: any;
}

export interface CartItem extends Product {
  quantity: number;
}

