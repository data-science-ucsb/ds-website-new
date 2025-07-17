export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'merchandise' | 'membership' | 'bundle';
    quantity?: number; // implement in Firebase
    inStock?: boolean; // implement in Firebase
  }
  
  export const products: Product[] = [
    {
      id: 'ds-shirt-2024',
      name: 'Data Science UCSB Shirt',
      description: 'Official Data Science UCSB club t-shirt featuring our logo and design.',
      price: 15.00,
      image: '/images/ds-shirt.jpg',
      category: 'merchandise',
    },
    {
      id: 'ds-membership-2024',
      name: 'Data Science UCSB Membership',
      description: 'Annual membership to Data Science UCSB. Includes access to exclusive events, workshops, and networking opportunities.',
      price: 20.00,
      image: '/images/ds-membership.jpg',
      category: 'membership',
    },
    {
      id: 'ds-bundle-2024',
      name: 'Shirt + Membership Bundle',
      description: 'Get both the official DS UCSB shirt and annual membership at a discounted price.',
      price: 30.00,
      image: '/images/ds-bundle.jpg',
      category: 'bundle'
    }
  ];
  
  export const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };
  
  export const getProductsByCategory = (category: Product['category']): Product[] => {
    return products.filter(product => product.category === category);
  };