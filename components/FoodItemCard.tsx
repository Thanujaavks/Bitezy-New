import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/theme';

interface FoodItemCardProps {
    item: {
        id: string;
        name: string;
        image: string;
        description: string;
        price: number;
    };
    quantity: number;
    onAddToCart: (item: any) => void;
}

const FoodItemCard = ({ item, quantity, onAddToCart }: FoodItemCardProps) => {
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
                            onPress={() => onAddToCart(item)}
                        >
                            <Text style={styles.addBtnText}>Add to Cart</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        backgroundColor: '#FCE4EC',
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
});

export default FoodItemCard;
