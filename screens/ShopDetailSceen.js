import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import shopsData from '../data/mock-coffee-shops.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@roastroute_favorites';

export default function ShopDetailScreen({ route, navigation }) {
  const { shopId } = route.params;
  const [shop, setShop] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = shopsData.find((x) => x.id === shopId);
    setShop(s || null);
    checkFavorite();
    setLoading(false);
  }, [shopId]);

  async function checkFavorite() {
    try {
      const raw = await AsyncStorage.getItem(FAVORITES_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      setIsFavorite(arr.includes(shopId));
    } catch (e) {
      console.warn('Failed to read favorites', e);
    }
  }

  async function addToFavorites() {
    try {
      const raw = await AsyncStorage.getItem(FAVORITES_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (arr.includes(shopId)) {
        setIsFavorite(true);
        Alert.alert('Already in Favorites');
        return;
      }
      arr.push(shopId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(arr));
      setIsFavorite(true);
      Alert.alert('Added', `${shop.name} added to favorites`);
    } catch (e) {
      console.warn('Failed to save favorite', e);
      Alert.alert('Error', 'Could not save favorite');
    }
  }

  if (!shop) {
    return (
      <View style={styles.center}>
        <Text>Shop not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{shop.name}</Text>
      <Text style={styles.address}>{shop.address}</Text>
      <Text style={styles.info}>Rating: {shop.rating}</Text>
      <Text style={styles.info}>Specialty: {shop.specialty}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title={isFavorite ? 'Already in Favorites' : 'Add to Favorites'} onPress={addToFavorites} disabled={isFavorite} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 22, fontWeight: '800' },
  address: { marginTop: 8, color: '#555' },
  info: { marginTop: 12, fontSize: 16 }
});
