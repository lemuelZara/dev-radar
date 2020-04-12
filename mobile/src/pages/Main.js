import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import { api } from '../services/api'

export const Main = () => {
    const [devs, setDevs] = useState([])

    // Armazenar a posição atual do Mapa
    const [currentRegion, setCurrentRegion] = useState(null)

    // Armazenar o que o usuário digitou no Input
    const [techs, setTechs] = useState('')

    const navigation = useNavigation()

    const navigateToProfile = github_username => {
        navigation.navigate('Profile', { github_username })
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

    const loadDevs = async () => {
        const { latitude, longitude } = currentRegion

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })

        setDevs(response.data)
    }

    const handleRegionChanged = region => {
        setCurrentRegion(region)
    }

    if (!currentRegion) {
        return null
    }

    return (
        <>
            <MapView
                style={styles.mapStyle}
                initialRegion={currentRegion}
                onRegionChangeComplete={handleRegionChanged}>
                {devs.map(dev => (
                    <Marker
                        key={dev._id}
                        coordinate={{
                            latitude: dev.location.coordinates[1],
                            longitude: dev.location.coordinates[0]
                        }}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: dev.avatar_url }} />

                        <Callout onPress={() => { navigateToProfile(dev.github_username) }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={setTechs}
                    value={techs}/>

                <TouchableOpacity style={styles.loadButton} onPress={loadDevs}>
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