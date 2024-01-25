// Run npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } from '@env';

const USER_KEY = 'user';

export const storeUser = async (user) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error storing user:', error);
    }
};

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

export const clearUser = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Error clearing user:', error);
    }
};

const ACCESS_TOKEN = 'access';
const EXPIRATION_DATE = 'expire';

export async function getAccessToken() {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    const expirationDate = await AsyncStorage.getItem(EXPIRATION_DATE);
    const currentTime = Date.now();

    if (accessToken && expirationDate && currentTime < Date.parse(expirationDate)) return accessToken;

    AsyncStorage.removeItem(ACCESS_TOKEN);
    AsyncStorage.removeItem(EXPIRATION_DATE);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}`,
    });
    
    const data = await response.json();
    console.log(data);

    try {
        await AsyncStorage.setItem(ACCESS_TOKEN, data.access_token);
    } catch (error) {
        console.error('Error storing access token:', error);
    }

    const newExpirationDate = new Date(currentTime + data.expires_in * 1000).toString();
    try {
        await AsyncStorage.setItem(EXPIRATION_DATE, newExpirationDate);
    } catch (error) {
        console.error('Error storing expiration date:', error);
    }

    return data.access_token
};
