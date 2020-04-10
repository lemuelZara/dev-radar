import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'

export const Main = () => {
    const [currentRegion, setCurrentRegion] = useState(null)

    const navigation = useNavigation()

    const navigateToProfile = () => {
        navigation.navigate('Profile', { github_username: 'lemuelZara'})
    }

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
        <MapView style={styles.mapStyle} initialRegion={currentRegion}>
            <Marker coordinate={{ latitude: -20.354880, longitude: -50.184209 }}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/55895642?s=460&u=23d04221f1435a5fcd494b20ebdeca20ce24b46a&v=4' }} />

                <Callout onPress={() => {
                    navigateToProfile()
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Lemuel Coelho Zara</Text>
                        <Text style={styles.devBio}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi hic nam voluptates vitae, reiciendis ducimus voluptatum? Qui numquam accusamus odio atque, illum incidunt. Ratione fugiat facilis rem magni culpa a!</Text>
                        <Text style={styles.devTechs}>Node.js, Flutter</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },

    callout: {
        width: 260,
        padding: 10
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },

    devBio: {
        color: '#666',
        marginTop: 5,
        textAlign: 'justify'
    },

    devTechs: {
        marginTop: 5,
        textAlign: 'center'
    }
});