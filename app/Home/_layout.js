import {Tabs} from 'expo-router';
import {FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import {View} from "react-native";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'green' ,tabBarInactiveTintColor:'blue'}}>
            <Tabs.Screen name='index' options={{
                headerTitle: 'Home',
                title: 'Home',
                tabBarIcon: ({color}) => <FontAwesome size={36} name="home" color={color}/>,
            }}/>
            <Tabs.Screen name='Cart' options={{
                headerTitle: 'Cart',
                title: 'Cart',
                tabBarIcon: ({color}) => <Feather name="shopping-cart" size={30} color={color} />
            }}/>
            <Tabs.Screen name='Profile' options={{
                headerTitle: 'Profile',
                title: 'Profile',
                tabBarIcon: ({color}) => <Ionicons name="person-circle" size={36} color={color}/>,

            }}/>
        </Tabs>
    );
};