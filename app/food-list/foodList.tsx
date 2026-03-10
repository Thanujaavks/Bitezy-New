import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {Stack, useLocalSearchParams, useRouter} from 'expo-router';
import {CATEGORIES, FOOD_ITEMS} from '@/data/mockData';
import {useCart} from '@/context/CartContext';
import {Ionicons} from '@expo/vector-icons';
import {Colors} from '@/constants/theme';
import FoodItemCard from '@/components/FoodItemCard';

function CategoryScreen() {
    const {categoryId} = useLocalSearchParams();
    const router = useRouter();
    const {addToCart, cart} = useCart();

    const category = CATEGORIES.find(c => c.id === categoryId);
    const items = FOOD_ITEMS.filter(item => item.categoryId === categoryId);

    const handleAddToCart = (item: any) => {
        addToCart(item);
        Toast.show({
            type: 'success',
            text1: 'Added to cart!',
            text2: `${item.name} has been added.`
        });
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
                            <Ionicons name="cart-outline" size={24} color="white"/>
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
                    <Image source={{uri: category.image}} style={styles.banner}/>
                    <View style={styles.bannerOverlay}>
                        <Text style={styles.bannerTitle}>{category.name}</Text>
                    </View>
                </View>
            )}

            {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="fast-food-outline" size={80} color="#ccc"/>
                    <Text style={styles.emptyText}>No items found in this category.</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({item}) => (
                        <FoodItemCard 
                            item={item} 
                            quantity={getQuantityInCart(item.id)} 
                            onAddToCart={handleAddToCart}
                        />
                    )}
                />
            )}
        </View>
    );
}

export default CategoryScreen;

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

