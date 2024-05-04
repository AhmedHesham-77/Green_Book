import {Stack, Tabs} from 'expo-router';
import {FontAwesome, Ionicons, Feather} from '@expo/vector-icons';
import {View} from "react-native";

export default function TabsLayout() {
    return (


        <Tabs screenOptions={{tabBarActiveTintColor: 'green', tabBarInactiveTintColor: 'blue'}}>
            <Tabs.Screen name='index' options={{
                headerShown: false,
                headerTitle: 'GetStarted',
                title: '',
                tabBarIcon: ({color}) => <FontAwesome size={36} name="home" color={color}/>,
            }}/>
            <Tabs.Screen name='cart' options={{
                headerShown: false,
                headerTitle: 'MyCart',
                title: '',
                tabBarIcon: ({color}) => <Feather name="shopping-cart" size={30} color={color}/>
            }}/>
            <Tabs.Screen name='profile' options={{
                headerShown: false,
                headerTitle: 'Profile',
                title: '',
                tabBarIcon: ({color}) => <Ionicons name="person-circle" size={36} color={color}/>,

            }}/>
            <Tabs.Screen name='product/index' options={{
                headerShown: false,
                headerTitle: 'Profile',
                title: '',
                href: null,
                tabBarIcon: ({color}) => <Ionicons name="person-circle" size={36} color={color}/>,
            }}/>
            <Tabs.Screen name='product/[id]' options={{
                headerShown: false,
                headerTitle: 'Profile',
                title: '',
                href: null,
                tabBarIcon: ({color}) => <Ionicons name="person-circle" size={36} color={color}/>,
            }}/>
        </Tabs>
    );
};