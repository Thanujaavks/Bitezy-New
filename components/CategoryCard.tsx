import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Shadows, Spacing} from '@/constants/theme';

const {width} = Dimensions.get('window');
const COLUMN_WIDTH = (width - Spacing.l * 2 - Spacing.m) / 2;

interface CategoryCardProps {
    item: {
        id: string;
        name: string;
        image: string;
    };
    onPress: () => void;
    style?: ViewStyle;
}

const CategoryCard = ({ item, onPress, style }: CategoryCardProps) => {
    return (
        <TouchableOpacity
            style={[styles.categoryCard, style]}
            onPress={onPress}
        >
            <Image source={{uri: item.image}} style={styles.categoryImage}/>
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.categoryOverlay}
            >
                <Text style={styles.categoryName}>{item.name}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
});

export default CategoryCard;
