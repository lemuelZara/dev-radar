import React from 'react'
import { WebView } from 'react-native-webview'
import { useRoute } from '@react-navigation/native'

export const Profile = () => {
    const route = useRoute()

    const { github_username } = route.params

    return <WebView
        style={{ flex: 1 }}
        source={{ uri: `https://github.com/${github_username}` }} />
}