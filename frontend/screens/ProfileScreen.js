import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Post from '../components/Post';

export default function ProfileScreen() {
  const dummyUser = {
    userName: 'JohnDoe',
    posts: [
      { id: '1', title: 'Song 1', artist: 'Artist 1', time: new Date('2024-01-08T10:00:00'), userName: 'JohnDoe' },
      { id: '2', title: 'Song 2', artist: 'Artist 2', time: new Date('2024-01-08T09:30:00'), userName: 'JohnDoe' },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{dummyUser.userName}</Text>
      <Text style={styles.sectionHeader}>Posts:</Text>
      <FlatList
        data={dummyUser.posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post post={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
});
