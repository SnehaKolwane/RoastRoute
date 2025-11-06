import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';
import shopsData from '../data/mock-coffee-shops.json';
import ShopListItem from '../components/ShopListItem';

const DEFAULT_REGION = {
  latitude: 34.052235,
  longitude: -118.243683,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
};

export default function MapAndListScreen({ navigation }) {
  const [locationRegion, setLocationRegion] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationRegion(DEFAULT_REGION);
          setLoadingLocation(false);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocationRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        });
      } catch (e) {
        console.warn('Location error', e);
        setLocationRegion(DEFAULT_REGION);
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, []);

  function onPressMarker(shop) {
    navigation.navigate('ShopDetail', { shopId: shop.id });
  }

  function onPressListItem(shop) {
    navigation.navigate('ShopDetail', { shopId: shop.id });
    // optional: animate map to the marker
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: shop.latitude,
          longitude: shop.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        },
        350
      );
    }
  }

  if (loadingLocation || !locationRegion) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Getting location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={locationRegion}
        showsUserLocation
        showsMyLocationButton
      >
        {shopsData.map((shop) => (
          <Marker key={shop.id} coordinate={{ latitude: shop.latitude, longitude: shop.longitude }} title={shop.name}>
            <Callout tooltip onPress={() => onPressMarker(shop)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{shop.name}</Text>
                <Text style={styles.calloutSubtitle}>{shop.specialty}</Text>
                <Text style={{ marginTop: 6, color: '#007AFF' }}>View details</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.listContainer}>
        <FlatList
          data={shopsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ShopListItem shop={item} onPress={() => onPressListItem(item)} />}
          ListHeaderComponent={() => <Text style={styles.listHeader}>Coffee Shops</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1.2, minHeight: Dimensions.get('window').height * 0.45 },
  listContainer: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  callout: { backgroundColor: 'white', padding: 8, borderRadius: 6, width: 160 },
  calloutTitle: { fontWeight: '700' },
  calloutSubtitle: { color: '#333', marginTop: 4 },
  listHeader: { fontSize: 18, fontWeight: '700', padding: 12, backgroundColor: '#fff' }
});
