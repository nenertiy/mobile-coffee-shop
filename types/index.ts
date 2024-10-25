export interface Product {
  description?: string;
  name: string;
  category: string | undefined;
  price: number;
  img: string;
  id?: number | undefined;
  productCategory?: {
    id: number;
    name: string;
  };
}

export interface Category {
  name: string;
  img: string;
  id: number;
}
