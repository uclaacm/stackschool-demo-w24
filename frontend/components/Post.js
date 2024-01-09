import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have Ionicons installed

export default function Post ({ post }) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <Ionicons name="musical-notes" size={24} color="black" style={styles.musicIcon} />
        <Text style={styles.userName}>{post.userName}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.artist}>{post.artist}</Text>
        <Text style={styles.time}>{post.time.toLocaleString()}</Text>
        <TouchableOpacity style={styles.likeButton}>
        <Ionicons name="heart-outline" size={24} color="red" />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  musicIcon: {
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artist: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  likeButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
