export interface Product {
  name: string;
  category: string | undefined;
  price: number;
  img: string;
  id?: number;
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
