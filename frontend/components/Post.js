import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Post ({ post }) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require('../assets/profile.png')}/>   
          <View>
            <View style={styles.row}>
              <Text style={styles.whiteText}>{post.first_name} {post.last_name}</Text>
              <Text style={styles.greyText}>@{post.username}</Text>
              <Text style={styles.greyText}>{post.time.toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric', 
                year: '2-digit', 
                hour: 'numeric',
                minute: 'numeric', 
                hour12: true, 
              }).replace(/\//g, '.').replace(',', '')}</Text>
            </View>
            <View style={styles.songRow}>
              <Ionicons name="musical-note" size={12} color="white" style={styles.musicIcon} />
              <Text style={styles.whiteText}>{post.title} - {post.artist}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.embed}> [Potential Spotify Embed] </Text>
        <View style={styles.likes}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={16} color="grey" />
          </TouchableOpacity>
          <Text style={styles.likesText}>{post.likes} likes</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'black',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  songRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  whiteText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white'
  },
  greyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'grey',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  embed: {
    // -- delete when actual embed and not text --
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    // ---
    marginTop: 10,
    marginBottom: 10,
  },
  likes: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  likesText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white'
  },
});
