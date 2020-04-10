import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export const Main = () => {
    const [currentRegion, setCurrentRegion] = useState(null)

    useEffect(() => {
        // Carregar posição inicial do Mapa
        async function loadInitialPosition() {
            // Permissão para acessar localização
            const { granted } = await Location.requestPermissionsAsync()

            if (granted) {
                const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({
                    enableHighAccuracy: true
                })

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition()
    }, [])

    if (!currentRegion) {
        return null
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                initialRegion={currentRegion}
            >
                <Marker coordinate={{
                    latitude: -20.354880, 
                    longitude: -50.184209
                }} />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});