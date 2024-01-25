import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Post from '../components/Post';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUser, clearUser, getAccessToken } from '../utils';

const URL = 'http://localhost:8000';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState();
  const [userSongs, setUserSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState();
  
  useEffect(() => {
    fetchUserData();
    fetchAccessToken();
  }, []);

  useEffect(() => {
    fetchUserSongs();
  }, [userId]);

  async function fetchUserData() {
    const user = await getUser();

    if (user) {
      setUser(user);
      setUserId(user.id);
    } else {
      console.error('Error fetching user data');
    }
  }

  async function fetchUserSongs() {
    try {
      if (!userId) {
        return;
      }

      const response = await fetch(`${URL}/users/songs/${userId}`);
      const data = await response.json();
      setUserSongs(data);
    } catch (error) {
      console.error('Error fetching user songs:', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAccessToken() {
    try {
      const token = await getAccessToken();
      setAccessToken(token);
    } catch (error) {
      console.error('Error fetching access token:', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
            onPress={() => {
              setIsNewPostModalVisible(true);
            }}
          />
        </TouchableOpacity>
        <Text style={styles.sectionHeader}>Profile</Text>
        <Ionicons
          name="ellipsis-horizontal-outline"
          size={24}
          color="#fff"
          onPress={() => {
            // TODO: Open menu to either logout or delete account
            clearUser();
            navigation.navigate('Login');
          }}
        />
      </View>
      {user && (
        <View style={styles.centered}>
          <Image
              style={styles.image}
              // TO BE FIXED
              source={require('../assets/profileShiyu.jpeg')}/>
          <Text style={styles.name}>{user.first} {user.last}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
      )}

      <Text style={styles.songHeader}>Songs</Text>
      {loading ? (
        <Text style={styles.noSongs}>Loading...</Text>
      ) : userSongs.length > 0 ? (
        <FlatList
          data={userSongs.sort((a, b) => new Date(b.date) - new Date(a.date))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post post={item} user={user} accessToken={accessToken}/>
          )}
          style={{ marginTop: 15, marginBottom: 50}}
        />
      ) : (
        <Text style={styles.noSongs}>No songs available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 75,
    paddingBottom: 50,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: 175,
    height: 175,
    borderRadius: 100,
    marginBottom: 20,
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
  username: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
  },
  sectionHeader: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  songHeader: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
    paddingLeft: 20,
  },
  noSongs: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginTop: 150,
  }
});
