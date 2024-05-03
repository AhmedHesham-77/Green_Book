import {Tabs} from 'expo-router';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {View} from "react-native";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name='index' options={{
                headerTitle: 'Home',
                title: 'Home',
                tabBarIcon: () => <FontAwesome size={36} name="home" color='green'/>,
            }}/>
            <Tabs.Screen name='Profile' options={{
                headerTitle: 'Profile',
                title: 'Profile',
                tabBarIcon: () => <Ionicons name="person-circle" size={36} color="green"/>,
            }}/>
        </Tabs>
    );
};