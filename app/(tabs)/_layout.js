import {Tabs} from 'expo-router';
import {FontAwesome, Ionicons, Feather} from '@expo/vector-icons';
import {Image, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUser} from "../../firebase/users";

export default function TabsLayout() {
    const [image, setImage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                const userId = JSON.parse(user).uid;
                const userData = await getUser(userId);
                setImage(userData.profile_image)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Tabs screenOptions={{tabBarActiveTintColor: 'green', tabBarInactiveTintColor: 'black'}}>
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

            <Tabs.Screen name='search' options={{
                headerShown: false,
                headerTitle: 'search',
                title: 'search',
                tabBarIcon: ({color}) => <FontAwesome name="search" size={24} color={color}/>
            }}/>

            <Tabs.Screen
                name='profile'
                options={{
                    headerShown: false,
                    headerTitle: 'Profile',
                    title: '',
                    tabBarIcon: ({color}) => (
                        image ? (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                                <Image
                                    source={{uri: image}}
                                    style={{width: 40, height: 40, borderRadius: 20}}
                                />
                            </View>
                        ) : (
                            <FontAwesome size={36} name="user" color={color}/> // Placeholder icon
                        )
                    ),
                }}
            />


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
            <Tabs.Screen name='product/editProduct/[id]' options={{
                headerShown: false,
                headerTitle: 'Profile',
                title: '',
                href: null,
                tabBarIcon: ({color}) => <Ionicons name="person-circle" size={36} color={color}/>,
            }}/>
        </Tabs>
    );
};