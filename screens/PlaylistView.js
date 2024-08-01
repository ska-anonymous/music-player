import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

// this screen is for fetcing the tracks of a specific playlist using playlist id passed playlists screen 
export default PlaylistView = ({ navigation, route }) => {
    const playlistId = route.params.id;

    const [isLoading, setIsLoading] = useState(false);
    const [tracks, setTracks] = useState([]);

    const fetchTracks = async () => {
        const url = `https://v1.nocodeapi.com/salmankhana/spotify/pTBAwPatfDoAlskq/playlists?id=${playlistId}`;

        setIsLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setIsLoading(false);
            data ? setTracks(data.tracks.items) : setTracks([]);
        } catch (err) {
            console.log('error fetching tracks ' + err);
        }

    }

    const displayTracks = () => {
        return (
            <View style={styles.tracksContainer}>
                {tracks.map((track, index) => {
                    return (
                        <TouchableOpacity
                            key={'track-card-' + index}
                            style={styles.trackCard}
                            onPress={() => { navigation.navigate('PlayerScreen', { tracks: tracks, index: index }) }}
                        >
                            <Text>{index + 1}.</Text>
                            <Image source={{ uri: track.track.album.images[0].url }} style={{ width: 50, height: 30, borderRadius: 3, }} />
                            <View>
                                <Text style={{ fontWeight: '500' }}>{track.track.name}</Text>
                                <Text>{Math.floor(track.track.duration_ms / 60000)}:{Math.floor((track.track.duration_ms % 60000) / 1000)}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    useEffect(() => {
        fetchTracks();
    }, [])

    return (
        <ScrollView style={styles.container}>
            {isLoading && <Text style={styles.text}>Loading Tracks.....</Text>}
            {displayTracks()}
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
    tracksContainer: {
        paddingBottom: 30,
    },
    trackCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    }


})