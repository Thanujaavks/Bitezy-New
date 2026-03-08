import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { CATEGORIES, FOOD_ITEMS } from '@/data/mockData';
import { Colors, Spacing, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - Spacing.l * 2 - Spacing.m) / 2;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const filteredCategories = CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => router.push(`/food-list/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.categoryOverlay}
      >
        <Text style={styles.categoryName}>{item.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name || 'Foodie'}!</Text>
            <Text style={styles.subGreeting}>What would you like to eat today?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="notifications-outline" size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for categories..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.promoCardContainer}>
          <LinearGradient
            colors={Colors.light.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.promoCard}
          >
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoTitle}>Special Offer</Text>
              <Text style={styles.promoSubtitle}>Get 30% OFF on your first order!</Text>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
            <Ionicons name="fast-food" size={80} color="rgba(255,255,255,0.3)" style={styles.promoIcon} />
          </LinearGradient>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.categoryList}
          columnWrapperStyle={styles.columnWrapper}
        />

        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Now</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.popularList}>
            {FOOD_ITEMS.slice(0, 4).map((item) => (
                <TouchableOpacity key={item.id} style={styles.popularCard} onPress={() => router.push(`/food-list/${item.categoryId}`)}>
                    <Image source={{ uri: item.image }} style={styles.popularImage} />
                    <View style={styles.popularInfo}>
                        <Text style={styles.popularName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.popularPrice}>${item.price}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.l,
    paddingTop: Spacing.xxl,
    marginBottom: Spacing.m,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  subGreeting: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: Spacing.l,
    marginBottom: Spacing.l,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: Spacing.m,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.s,
    fontSize: 16,
    color: Colors.light.text,
  },
  promoCardContainer: {
    paddingHorizontal: Spacing.l,
    marginBottom: Spacing.l,
  },
  promoCard: {
    borderRadius: 20,
    padding: Spacing.l,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Shadows.medium,
  },
  promoTextContainer: {
    flex: 1,
    zIndex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  promoSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
    marginBottom: Spacing.m,
  },
  promoButton: {
    backgroundColor: '#fff',
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.s,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  promoIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.l,
    marginBottom: Spacing.m,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryList: {
    paddingHorizontal: Spacing.l,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: Spacing.m,
  },
  categoryCard: {
    width: COLUMN_WIDTH,
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadows.light,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'flex-end',
    padding: Spacing.m,
  },
  categoryName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularList: {
    paddingLeft: Spacing.l,
  },
  popularCard: {
      width: 150,
      marginRight: Spacing.m,
      backgroundColor: '#fff',
      borderRadius: 15,
      ...Shadows.light,
      marginBottom: Spacing.s,
  },
  popularImage: {
      width: '100%',
      height: 100,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
  },
  popularInfo: {
      padding: Spacing.s,
  },
  popularName: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.light.text,
  },
  popularPrice: {
      fontSize: 12,
      fontWeight: 'bold',
      color: Colors.primary,
      marginTop: 2,
  }
});
