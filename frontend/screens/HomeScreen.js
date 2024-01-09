import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Post from '../components/Post';

const sampleData = [
  { id: '1', title: 'Song 1', artist: 'Artist 1', time: new Date('2024-01-08T10:00:00'), userName: 'JohnDoe' },
  { id: '2', title: 'Song 2', artist: 'Artist 2', time: new Date('2024-01-08T09:30:00'), userName: 'JohnDoe' },
];

export default function HomeScreen() {
  const [songs, setSongs] = useState(sampleData);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>SoundsRight</Text>
      <FlatList
        data={songs.sort((a, b) => b.time - a.time)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post post={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
});
