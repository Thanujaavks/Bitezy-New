import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ToastAndroid, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { FOOD_ITEMS, CATEGORIES } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, cart } = useCart();

  const category = CATEGORIES.find(c => c.id === categoryId);
  const items = FOOD_ITEMS.filter(item => item.categoryId === categoryId);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`${item.name} added to cart!`, ToastAndroid.SHORT);
    } else {
      Alert.alert('Success', `${item.name} added to cart!`);
    }
  };

  const getQuantityInCart = (itemId: string) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: category ? category.name : 'Category',
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} style={styles.headerCart}>
              <Ionicons name="cart-outline" size={24} color="white" />
              {cart.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )
        }} 
      />

      {category && (
        <View style={styles.bannerContainer}>
          <Image source={{ uri: category.image }} style={styles.banner} />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>{category.name}</Text>
          </View>
        </View>
      )}

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="fast-food-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No items found in this category.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const quantity = getQuantityInCart(item.id);
            return (
              <View style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
                  
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                    
                    {quantity > 0 ? (
                      <View style={styles.addedContainer}>
                        <Text style={styles.addedText}>{quantity} in Cart</Text>
                      </View>
                    ) : (
                      <TouchableOpacity 
                        style={styles.addBtn} 
                        onPress={() => handleAddToCart(item)}
                      >
                        <Text style={styles.addBtnText}>Add to Cart</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerCart: {
    marginRight: 16,
    padding: 4,
  },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bannerContainer: {
    height: 160,
    width: '100%',
    marginBottom: 16,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 120,
    height: '100%',
    minHeight: 120,
  },
  itemDetails: {
    flex: 1,
    padding: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  addBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addedContainer: {
    backgroundColor: '#FCE4EC', // A light pink that complements the primary #76153C
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  addedText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
});

