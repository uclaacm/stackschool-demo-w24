import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Post from '../components/Post';
import NewPost from '../components/NewPost';

const sampleData = [
  { id: '1', title: 'Song 1', artist: 'Artist 1', time: new Date('2024-01-08T10:00:00'), username: 'JohnDoe', first_name: 'John', last_name: 'Doe', likes: '42' },
  { id: '2', title: 'Song 2', artist: 'Artist 2', time: new Date('2024-01-08T09:30:00'), username: 'JohnDoe', first_name: 'John', last_name: 'Doe', likes: '69' },
];

export default function HomeScreen({ navigation }) {
  const [isNewPostModalVisible, setIsNewPostModalVisible] = useState(false);
  const [songs, setSongs] = useState(sampleData);

  function handlePost(newSong) {
    // TO DO
    console.log('New Post:', newSong);
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
      <FlatList
        data={songs.sort((a, b) => b.time - a.time)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post post={item} />
        )}
      />
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
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 75,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
});
