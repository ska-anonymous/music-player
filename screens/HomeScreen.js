import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

// The home Screen which contains buttons to other screens like playlist, about etc
export default HomeScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={styles.navigationButton}
                onPress={() => navigation.navigate('Playlists')}
            >
                <Text style={styles.text}>Playlists</Text>
                <Text style={styles.text}> &gt; </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.navigationButton}
                onPress={() => navigation.navigate('Search')}
            >
                <Text style={styles.text}>Search for songs, albums, artists</Text>
                <Text style={styles.text}> &gt; </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.navigationButton}
                onPress={() => navigation.navigate('About')}
            >
                <Text style={styles.text}>About the Developer</Text>
                <Text style={styles.text}> &gt; </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    navigationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})