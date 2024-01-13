import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Post from '../components/Post';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ProfileScreen({ navigation }) {
  const dummyUser = {
    userName: 'JohnDoe',
    firstName: 'John',
    lastName: 'Doe',
    posts: [
      { id: '1', title: 'Song 1', artist: 'Artist 1', time: new Date('2024-01-08T10:00:00'), username: 'JohnDoe', first_name: 'John', last_name: 'Doe', likes: '42' },
      { id: '2', title: 'Song 2', artist: 'Artist 2', time: new Date('2024-01-08T09:30:00'), username: 'JohnDoe', first_name: 'John', last_name: 'Doe', likes: '69' },
    ],
  };

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
        {/* TODO: Change this to three dot icon */}
        <Ionicons
          name="arrow-forward"
          size={24}
          color="#000"
          onPress={() => {
            setIsNewPostModalVisible(true);
          }}
        />
      </View>
      <View style={styles.centered}>
        <Image
            style={styles.image}
            source={require('../assets/profile.png')}/> 
        <Text style={styles.name}> {dummyUser.firstName} {dummyUser.lastName} </Text>
        <Text style={styles.username}>@{dummyUser.userName}</Text>
      </View>

      <Text style={styles.sectionHeader}>Songs</Text>
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
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
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
});
