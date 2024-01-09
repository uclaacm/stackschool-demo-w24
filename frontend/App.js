import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import NewPost from './components/NewPost';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isNewPostModalVisible, setIsNewPostModalVisible] = useState(false);

  function handlePost(newSong) {
    // TO DO
    console.log('New Post:', newSong);
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: { backgroundColor: '#fff' },
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: (tabInfo) => { 
              return ( 
                <Ionicons 
                  name="md-home"
                  size={24} 
                  color={tabInfo.focused ? '#333' : "#8e8e93"} 
                /> 
              ); 
            },
          }}
        />
        <Tab.Screen
          name="NewPost"
          component={ButtonScreen}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              setIsNewPostModalVisible(true);
            },
          })}
          options={{
            tabBarIcon: (tabInfo) => { 
              return ( 
                <Ionicons 
                  name="add-outline"
                  size={36} 
                  color={tabInfo.focused ? '#333' : "#8e8e93"} 
                /> 
              ); 
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: (tabInfo) => { 
              return ( 
                <Ionicons 
                  name="md-person-circle-outline"
                  size={30} 
                  color={tabInfo.focused ? '#333' : "#8e8e93"} 
                /> 
              ); 
            },
          }}
        />
      </Tab.Navigator>
      <NewPost
        visible={isNewPostModalVisible}
        onClose={() => setIsNewPostModalVisible(false)}
        onPost={handlePost}
      />
    </NavigationContainer>
  );
}

// https://stackoverflow.com/questions/63895779/how-to-add-button-to-a-bottomtabnavigator-on-react-native
const ButtonScreen = () => null;