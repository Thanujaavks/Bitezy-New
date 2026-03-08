export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface FoodItem {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Drinks',
    image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Pasta',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500&auto=format&fit=crop',
  }
];

export const FOOD_ITEMS: FoodItem[] = [
  // Pizza
  {
    id: '101',
    categoryId: '1',
    name: 'Margherita Pizza',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500&auto=format&fit=crop',
    description: 'Classic Margherita with fresh basil, mozzarella, and tomato sauce.',
    rating: 4.8,
  },
  {
    id: '102',
    categoryId: '1',
    name: 'Pepperoni Pizza',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop',
    description: 'Crispy pepperoni slices with premium mozzarella cheese.',
    rating: 4.9,
  },
  // Burgers
  {
    id: '201',
    categoryId: '2',
    name: 'Classic Cheeseburger',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=500&auto=format&fit=crop',
    description: 'Juicy beef patty with cheddar cheese, lettuce, and tomato.',
    rating: 4.7,
  },
  {
    id: '202',
    categoryId: '2',
    name: 'BBQ Bacon Burger',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500&auto=format&fit=crop',
    description: 'Beef patty topped with crispy bacon and smoky BBQ sauce.',
    rating: 4.8,
  },
  // Drinks
  {
    id: '301',
    categoryId: '3',
    name: 'Strawberry Smoothie',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1586745300055-16812ec5851c?q=80&w=500&auto=format&fit=crop',
    description: 'Fresh strawberries blended with yogurt and ice.',
    rating: 4.5,
  },
  {
    id: '302',
    categoryId: '3',
    name: 'Iced Coffee',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1517701604599-bb20b721dd51?q=80&w=500&auto=format&fit=crop',
    description: 'Cold brewed coffee served over ice with a splash of milk.',
    rating: 4.6,
  },
  // Desserts
  {
    id: '401',
    categoryId: '4',
    name: 'Chocolate Lava Cake',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1541919329513-35f7af297129?q=80&w=500&auto=format&fit=crop',
    description: 'Warm chocolate cake with a molten center, served with ice cream.',
    rating: 4.9,
  },
  {
    id: '402',
    categoryId: '4',
    name: 'Cheesecake',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=500&auto=format&fit=crop',
    description: 'Classic New York style cheesecake with berry coulis.',
    rating: 4.8,
  },
];
