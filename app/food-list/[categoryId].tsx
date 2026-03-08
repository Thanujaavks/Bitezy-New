import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { CATEGORIES, FOOD_ITEMS } from '@/data/mockData';
import { Colors, Spacing, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '@/context/CartContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function FoodListScreen() {
  const { categoryId } = useLocalSearchParams();
  const { addToCart } = useCart();
  const router = useRouter();

  const category = CATEGORIES.find(c => c.id === categoryId);
  const items = FOOD_ITEMS.filter(i => i.categoryId === categoryId);

  const renderFoodItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.infoHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => addToCart(item)}
          >
            <LinearGradient
                colors={Colors.light.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
            >
                <Ionicons name="add" size={24} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: category?.name || 'Food List' }} />
      <FlatList
        data={items}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="fast-food-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>No items found in this category.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: Spacing.m,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: Spacing.m,
    flexDirection: 'row',
    ...Shadows.light,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: 120,
  },
  info: {
    flex: 1,
    padding: Spacing.m,
    justifyContent: 'space-between',
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
    marginLeft: 2,
  },
  description: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginTop: Spacing.m,
  },
});
