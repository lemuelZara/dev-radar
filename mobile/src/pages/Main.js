import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

export const Main = () => {
    const [currentRegion, setCurrentRegion] = useState(null)

    const navigation = useNavigation()

    const navigateToProfile = () => {
        navigation.navigate('Profile', { github_username: 'lemuelZara' })
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
        <>
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
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.loadButton} onPress={() => { }}>
                    <MaterialIcons name="my-location" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    mapStyle: {
        flex: 1,
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
    },

    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#666',
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 16,

        // Style from iOS
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },

        // Style from Android
        elevation: 1.5
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#7159c1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 15

    }
});