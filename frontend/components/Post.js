import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SpotifyEmbed from './SpotifyEmbed';

const URL = 'http://localhost:8000';

export default function Post ({ post }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const timestamp = post.date;
  const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric', 
    year: '2-digit', 
    hour: 'numeric',
    minute: 'numeric', 
    hour12: true, 
  }).replace(/\//g, '.').replace(',', '');

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const response = await fetch(`${URL}/songs/user/${post.id}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }    
  }

  if(loading)
  {
    return <Text> Loading </Text>;
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            // TO BE FIXED
            source={require('../assets/profileShiyu.jpeg')}/>   
          <View>
            <View style={styles.row}>
              <Text style={styles.whiteText}>{user.first} {user.last}</Text>
              <Text style={styles.greyText}>@{user.username}</Text>
              <Text style={styles.greyText}>{formattedTimestamp}</Text>
            </View>
            <View style={styles.songRow}>
              <Ionicons name="musical-note" size={12} color="white" style={styles.musicIcon} />
              <Text style={styles.whiteText}>{post.title} - {post.artist}</Text>
            </View>
          </View>
        </View>
        {!loading && (
          <SpotifyEmbed
            title={post.title}
            artist={post.artist}
          />
        )}
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
    backgroundColor: 'black',
    paddingLeft: 20,
    paddingRight: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 2,
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
    paddingBottom: 15,
  },
  whiteText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  greyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  likes: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 30
  },
  likesText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  noSongs: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginTop: 150,
  }
});
