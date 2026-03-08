import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, Alert, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Colors, Spacing, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { clearCart, orders } = useCart();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [savedAddresses, setSavedAddresses] = useState<typeof newAddress[]>([]);

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
    if (title !== 'Delivery Address') {
      setShowAddressForm(false);
    }
  };

  const handleSaveAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      Alert.alert('Error', 'Please fill in all address fields.');
      return;
    }
    
    setSavedAddresses([...savedAddresses, newAddress]);
    Alert.alert('Success', 'Address saved successfully.');
    setShowAddressForm(false);
    setNewAddress({ street: '', city: '', state: '', zipCode: '' });
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            if (clearCart) clearCart();
            if (logout) logout();
            router.replace('/login' as any);
          },
        },
      ]
    );
  };

  const menuItems = [
    { id: 1, title: 'My Orders', icon: 'receipt-outline' },
    { id: 2, title: 'My Details', icon: 'person-outline' },
    { id: 3, title: 'Delivery Address', icon: 'location-outline' },
    { id: 4, title: 'Payment Methods', icon: 'card-outline' },
    { id: 5, title: 'Notifications', icon: 'notifications-outline' },
    { id: 6, title: 'Help & Support', icon: 'help-circle-outline' },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={Colors.light.gradient}
        style={styles.header}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          {menuItems.map((item) => (
            <View key={item.id}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => toggleSection(item.title)}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIconContainer}>
                    <Ionicons name={item.icon as any} size={22} color={Colors.primary as string} />
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>
                <Ionicons 
                  name={expandedSection === item.title ? "chevron-down" : "chevron-forward"} 
                  size={20} 
                  color="#ccc" 
                />
              </TouchableOpacity>
              
              {expandedSection === item.title && item.title === 'My Orders' && (
                <View style={styles.ordersContainer}>
                  {orders && orders.length > 0 ? (
                    orders.map((order: any) => (
                      <View key={order.id} style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                          <Text style={styles.orderId}>Order #{order.id.toUpperCase()}</Text>
                          <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</Text>
                        </View>
                        
                        <View style={styles.orderItems}>
                          {order.items.map((orderItem: any) => (
                            <View key={orderItem.id} style={styles.orderItemRow}>
                              <Text style={styles.orderItemQuantity}>{orderItem.quantity}x</Text>
                              <Text style={styles.orderItemName}>{orderItem.name}</Text>
                              <Text style={styles.orderItemPrice}>${(orderItem.price * orderItem.quantity).toFixed(2)}</Text>
                            </View>
                          ))}
                        </View>
                        
                        <View style={styles.orderFooter}>
                          <Text style={styles.orderTotalLabel}>Total:</Text>
                          <Text style={styles.orderTotalAmount}>${order.totalAmount?.toFixed(2) || '0.00'}</Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noOrdersText}>You haven't placed any orders yet.</Text>
                  )}
                </View>
              )}

              {expandedSection === item.title && item.title === 'Delivery Address' && (
                <View style={styles.addressContainer}>
                  {savedAddresses.map((address, index) => (
                    <View key={index} style={styles.savedAddressCard}>
                      <View style={styles.addressHeader}>
                        <Ionicons name="home-outline" size={20} color={Colors.primary as string} />
                        <Text style={styles.addressTitle}>Address {index + 1}</Text>
                      </View>
                      <Text style={styles.addressText}>{address.street}</Text>
                      <Text style={styles.addressText}>{address.city}, {address.state} {address.zipCode}</Text>
                    </View>
                  ))}

                  {!showAddressForm ? (
                    <TouchableOpacity style={styles.addAddressCard} onPress={() => setShowAddressForm(true)}>
                      <Ionicons name="add" size={24} color={Colors.primary as string} />
                      <Text style={styles.addAddressText}>Add New Address</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.addressForm}>
                      <Text style={styles.formTitle}>New Address</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Street Address"
                        value={newAddress.street}
                        onChangeText={(text) => setNewAddress({ ...newAddress, street: text })}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={newAddress.city}
                        onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
                      />
                      <View style={styles.row}>
                        <TextInput
                          style={[styles.input, styles.halfInput]}
                          placeholder="State"
                          value={newAddress.state}
                          onChangeText={(text) => setNewAddress({ ...newAddress, state: text })}
                        />
                        <TextInput
                          style={[styles.input, styles.halfInput]}
                          placeholder="Zip Code"
                          keyboardType="numeric"
                          value={newAddress.zipCode}
                          onChangeText={(text) => setNewAddress({ ...newAddress, zipCode: text })}
                        />
                      </View>
                      <View style={styles.formButtons}>
                        <TouchableOpacity 
                          style={styles.cancelBtn} 
                          onPress={() => setShowAddressForm(false)}
                        >
                          <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.saveBtn} 
                          onPress={handleSaveAddress}
                        >
                          <Text style={styles.saveBtnText}>Save Address</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Bitezy Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.m,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  content: {
    padding: Spacing.l,
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: Spacing.m,
    ...Platform.select({
        ios: Shadows.light,
        android: {
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        default: {},
    }),
    marginBottom: Spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFF2F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.m,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.m,
    backgroundColor: '#FFF5F5',
    borderRadius: 15,
    marginBottom: Spacing.xl,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginLeft: Spacing.s,
  },
  versionText: {
    textAlign: 'center',
    color: '#ccc',
    fontSize: 12,
    marginBottom: 30,
  },
  ordersContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginTop: 5,
  },
  noOrdersText: {
    textAlign: 'center',
    color: '#888',
    padding: 10,
    fontStyle: 'italic',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    ...Platform.select<any>({
      ios: Shadows.light,
      android: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      default: {},
    }),
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  orderId: {
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    color: '#666',
    fontSize: 12,
  },
  orderItems: {
    marginBottom: 8,
  },
  orderItemRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  orderItemQuantity: {
    width: 30,
    color: Colors.primary as string,
    fontWeight: '600',
  },
  orderItemName: {
    flex: 1,
    color: '#444',
  },
  orderItemPrice: {
    color: '#444',
    fontWeight: '500',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
    alignItems: 'center',
  },
  orderTotalLabel: {
    color: '#666',
    marginRight: 8,
  },
  orderTotalAmount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  addressContainer: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginTop: 5,
  },
  addAddressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F6',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary as string,
    marginTop: 5,
    marginBottom: 5,
  },
  addAddressText: {
    marginLeft: 8,
    color: Colors.primary as string,
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressForm: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    ...Platform.select<any>({
      ios: Shadows.light,
      android: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      default: {},
    }),
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  cancelBtnText: {
    color: '#666',
    fontWeight: 'bold',
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: Colors.primary as string,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  savedAddressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    ...Platform.select<any>({
      ios: Shadows.light,
      android: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      default: {},
    }),
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

