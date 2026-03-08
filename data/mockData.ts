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
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=500&fit=crop',
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
  },
  {
    id: '7',
    name: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '8',
    name: 'Tacos',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '9',
    name: 'Dosa',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '10',
    name: 'Rice',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '11',
    name: 'Parotta',
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=500&auto=format&fit=crop',
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
  // Salads
  {
    id: '501',
    categoryId: '5',
    name: 'Caesar Salad',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=500&auto=format&fit=crop',
    description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.',
    rating: 4.6,
  },
  {
    id: '502',
    categoryId: '5',
    name: 'Greek Salad',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500&auto=format&fit=crop',
    description: 'Fresh tomatoes, cucumbers, olives, feta cheese, and red onions.',
    rating: 4.7,
  },
  // Pasta
  {
    id: '601',
    categoryId: '6',
    name: 'Spaghetti Carbonara',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500&auto=format&fit=crop',
    description: 'Classic Italian pasta with eggs, cheese, pancetta, and black pepper.',
    rating: 4.8,
  },
  {
    id: '602',
    categoryId: '6',
    name: 'Penne Arrabbiata',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=500&auto=format&fit=crop',
    description: 'Spicy tomato sauce with garlic and red chili peppers over penne pasta.',
    rating: 4.6,
  },
  // Sushi
  {
    id: '701',
    categoryId: '7',
    name: 'Spicy Tuna Roll',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=500&auto=format&fit=crop',
    description: 'Fresh tuna with spicy mayo, cucumber, and topped with sesame seeds.',
    rating: 4.8,
  },
  {
    id: '702',
    categoryId: '7',
    name: 'Dragon Roll',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1579586326527-3a13bd0c7634?q=80&w=500&auto=format&fit=crop',
    description: 'Eel and cucumber inside, sliced avocado on top with eel sauce.',
    rating: 4.9,
  },
  // Tacos
  {
    id: '801',
    categoryId: '8',
    name: 'Al Pastor Tacos',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=500&auto=format&fit=crop',
    description: 'Marinated pork with pineapple, cilantro, and onions on corn tortillas.',
    rating: 4.7,
  },
  {
    id: '802',
    categoryId: '8',
    name: 'Birria Tacos',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?q=80&w=500&auto=format&fit=crop',
    description: 'Slow-cooked beef folded into a tortilla with melted cheese and consommé.',
    rating: 4.9,
  },
  // Dosa
  {
    id: '901',
    categoryId: '9',
    name: 'Masala Dosa',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?q=80&w=500&auto=format&fit=crop',
    description: 'Crispy rice crepe stuffed with spiced potato filling.',
    rating: 4.8,
  },
  {
    id: '902',
    categoryId: '9',
    name: 'Onion Dosa',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1647466723048-0cbf8db4a9f3?q=80&w=500&auto=format&fit=crop',
    description: 'Crispy crepe garnished with finely chopped onions.',
    rating: 4.6,
  },
  // Rice
  {
    id: '1001',
    categoryId: '10',
    name: 'Veg Biryani',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500&auto=format&fit=crop',
    description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices.',
    rating: 4.7,
  },
  {
    id: '1002',
    categoryId: '10',
    name: 'Chicken Fried Rice',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=500&auto=format&fit=crop',
    description: 'Stir-fried rice with tender chicken pieces, eggs, and vegetables.',
    rating: 4.8,
  },
  // Parotta
  {
    id: '1101',
    categoryId: '11',
    name: 'Malabar Parotta',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=500&auto=format&fit=crop',
    description: 'Flaky and layered flatbread popular in South India.',
    rating: 4.9,
  },
  {
    id: '1102',
    categoryId: '11',
    name: 'Kothu Parotta',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=500&auto=format&fit=crop',
    description: 'Minced parotta tossed with spices, eggs, and chicken.',
    rating: 4.8,
  },
];
