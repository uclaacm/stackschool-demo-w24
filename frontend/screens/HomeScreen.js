import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Post from '../components/Post';
import NewPost from '../components/NewPost';

const URL = 'http://localhost:8000';

export default function HomeScreen({ navigation }) {
  const [isNewPostModalVisible, setIsNewPostModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [songs]);

  async function fetchSongs() {
    try {
      const response = await fetch(`${URL}/songs/all`);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  async function handlePost(newSong) {
    setSongs((prevSongs) => [newSong, ...prevSongs]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Ionicons
          name="add"
          size={30}
          color="#fff"
          onPress={() => {
            setIsNewPostModalVisible(true);
          }}
        />
        <Text style={styles.headerText}>SoundsRight.</Text>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}
        >
          <Ionicons
            name="md-person-circle-outline"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : songs !== null && songs.length > 0 ? (
        <FlatList
          data={songs.sort((a, b) => new Date(b.date) - new Date(a.date))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Post post={item} />}
          style={{ marginTop: 15, marginBottom: 50}}
        />      
      ) : (
        <Text style={styles.noSongs}>No songs available.</Text>
      )}
      <NewPost
        visible={isNewPostModalVisible}
        onClose={() => setIsNewPostModalVisible(false)}
        onPost={handlePost}
      /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    paddingTop: 75,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  noSongs: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginTop: 150,
  }
});
