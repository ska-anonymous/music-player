import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Slider } from 'react-native';
// import track player to use in this screen for playing audio
import TrackPlayer, { Capability, useProgress } from 'react-native-track-player';

export default PlayerScreen = ({ route }) => {

    // tracks comes from the previous screen(tracks screen)
    const { tracks } = route.params;
    const [currentTrackIndex, setCurrentTrackIndex] = useState(route.params.index);
    const [isPlaying, setIsplaying] = useState(false);

    // useProgress is TrackPlayer hook for returning progress object
    const progress = useProgress();

    const songs = [];

    // fill songs array to be added to TrackPlayer
    const prepareSongsArray = () => {
        tracks.forEach((track) => {
            let songObj = {
                title: track.track.name,
                artist: track.track.artists[0].name,
                artwork: track.track.album.images[0].url,
                url: track.track.preview_url,
            }
            songs.push(songObj);
        });
    }
    // initiating TrackPlayer
    const setupPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            // await TrackPlayer.updateOptions({
            //     // Media controls capabilities
            //     capabilities: [
            //         Capability.Play,
            //         Capability.Pause,
            //         Capability.SkipToNext,
            //         Capability.SkipToPrevious,
            //         Capability.Stop,
            //     ],

            //     // Capabilities that will show up when the notification is in the compact form on Android
            //     compactCapabilities: [Capability.Play, Capability.Pause],
            // });
            await TrackPlayer.add(songs);
            await TrackPlayer.setVolume(1);
        } catch (err) {
            console.log('error in track player setup ' + err);
        }
    }

    // The player is ready to be used

    useEffect(() => {
        prepareSongsArray();
        setupPlayer();
    }, [])

    const handlePlayPause = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
            setIsplaying(false);
        } else {
            await TrackPlayer.play();
            setIsplaying(true);
        }
    }

    const handleNext = () => {
        if (currentTrackIndex + 1 < tracks.length) {
            setCurrentTrackIndex(currentTrackIndex + 1);
            TrackPlayer.skipToNext();
        }
    }

    const handlePrevious = () => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
            TrackPlayer.skipToPrevious();
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.coverImage} source={{ uri: tracks[currentTrackIndex].track.album.images[0].url }} />
            <Text styles={styles.trackName}>{tracks[currentTrackIndex].track.name}</Text>
            <Slider
                minimumValue={0}
                maximumValue={progress.duration}
                value={progress.position}
                style={styles.seekBar}
                onValueChange={(value) => { TrackPlayer.seekTo(value) }}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handlePrevious}>
                    <Image source={require('../images/previous.png')} style={styles.controlButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handlePlayPause() }}>
                    {
                        isPlaying ? <Image source={require('../images/pause.png')} style={styles.controlButton} /> : <Image source={require('../images/play.png')} style={styles.controlButton} />
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext}>
                    <Image source={require('../images/next.png')} style={styles.controlButton} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        alignItems: 'center'
    },
    trackName: {
        fontWeight: 'bold',
    },
    coverImage: {
        width: '100%',
        height: 350,
        borderRadius: 10,
        marginBottom: 30,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginVertical: 50,
    },
    controlButton: {
        width: 30,
        height: 30,
    },
    seekBar: {
        width: '100%',
        marginTop: 30,
    },
})