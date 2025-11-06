import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function ShopListItem({ shop, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <Text style={styles.name}>{shop.name}</Text>
        <Text style={styles.address}>{shop.address}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.rating}>{shop.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  left: { flex: 1 },
  right: { width: 40, alignItems: 'flex-end' },
  name: { fontSize: 16, fontWeight: '600' },
  address: { fontSize: 13, color: '#666', marginTop: 4 },
  rating: { fontWeight: '700' }
});
