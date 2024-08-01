import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ScrollView, View, StyleSheet, Image } from 'react-native';

export default PlaylistsScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);     // state variable for showing loading text or icon etc.
    const [playlists, setPlaylists] = useState([]); //playlists array

    const fetchPlaylists = async () => {
        setIsLoading(true);

        try {
            const url = `https://v1.nocodeapi.com/salmankhana/spotify/pTBAwPatfDoAlskq/browse/featured`;
            const response = await fetch(url);
            const data = await response.json();
            setIsLoading(false);
            data ? setPlaylists(data.playlists.items) : setPlaylists([]);

        } catch (err) {
            console.log('error fetching playlsits ' + err);
        }

    }

    const displayPlaylists = () => {
        return (
            <View style={styles.playlistsContainer}>
                {
                    playlists.map((playlist, index) => {
                        return (
                            <TouchableOpacity
                                key={'playlist-card-' + index}
                                style={styles.playlistCard}
                                onPress={() => { navigation.navigate('PlaylistView', { id: playlist.id }) }}
                            >
                                <Image source={{ uri: playlist.images[0].url }} style={{ width: '100%', height: 100, borderRadius: 5, }} />
                                <Text style={{ fontWeight: 'bold', }}>{playlist.name}</Text>
                                <Text>{playlist.tracks.total}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    useEffect(() => {
        fetchPlaylists();
    }, [])

    return (
        <ScrollView style={styles.container}>
            {isLoading && <Text style={styles.text}>Loading Playlists.....</Text>}
            {displayPlaylists()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
    playlistsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    playlistCard: {
        borderWidth: 1,
        width: '40%',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: 'white',
    }
})