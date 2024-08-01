import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, ScrollView, View, Button, TouchableOpacity, Image } from 'react-native';

// the search screen is designed to search for songs, albums, artists
const SearchScreen = ({navigation}) => {
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchedData, setSearchedData] = useState([]);

    const handleSearch = async () => {
        if (searchText.trim().length == 0)
            return;

        const url = `https://v1.nocodeapi.com/salmankhana/spotify/pTBAwPatfDoAlskq/search?q=${encodeURIComponent(searchText)}`;
        setIsLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setIsLoading(false);
            setSearchedData(data.albums.items);
        } catch (err) {
            console.log('cannot fetch search results ' + err);
        }
    }

    const displaySearchedResults = () => {
        return (
            <View style={styles.albumsContainer}>
                {searchedData.map((album, index) => {
                    return (
                        <TouchableOpacity
                            key={'album-card-' + index}
                            style={styles.albumCard}
                            onPress={() => { navigation.navigate('PlaylistView', { id: album.id }) }}
                        >
                            <Image source={{ uri: album.images[0].url }} style={{ width: '100%', height: 100, borderRadius: 5, }} />
                            <Text style={{ fontWeight: 'bold', }}>{album.name}</Text>
                            <Text>{album.total_tracks}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Search for album, songs, artists'
                    value={searchText}
                    onChangeText={text => { setSearchText(text) }}
                    style={styles.searchInput}
                />
                <Button
                    title='Search'
                    onPress={handleSearch}
                />
            </View>
            {isLoading && <Text style={{ fontWeight: 'bold', textAlign: 'center', marginVertical: 10, }}>Searching...</Text>}

            {displaySearchedResults()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'green',
        paddingHorizontal: 5,
        width: '75%',
        borderRadius: 5,
    },
    albumsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    albumCard: {
        borderWidth: 1,
        width: '40%',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: 'white',
    }
})

export default SearchScreen;