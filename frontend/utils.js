// Run npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

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
