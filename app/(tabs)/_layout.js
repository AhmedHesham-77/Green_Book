import {Tabs} from "expo-router";
import {FontAwesome, Ionicons, Feather} from "@expo/vector-icons";
import {Image, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUser} from "../../firebase/users";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from 'expo-blur';

export default function TabsLayout() {
    const [image, setImage] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await AsyncStorage.getItem("user");
                const userId = JSON.parse(user).uid;
                const userData = await getUser(userId);
                setImage(userData.profile_image);
                setRole(userData.isAdmin);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "black",
                tabBarStyle: {
                    height: 60,
                    // borderTopRightRadius: 25,
                    // borderTopLeftRadius: 25,
                },
            }}
        >
            < Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    headerTitle: "GetStarted",
                    title: "",
                    tabBarIcon: ({color}) => (
                        <FontAwesome size={34} name="home" color={color}/>
                    ),
                }
                }
            />
            <Tabs.Screen
                name="cart"
                options={{
                    headerShown: false,
                    headerTitle: "MyCart",
                    title: "",
                    tabBarIcon: ({color}) => (
                        <Feather name="shopping-cart" size={30} color={color}/>
                    ),
                }}
            />
            {
                role === true ? (
                    <Tabs.Screen
                        name="product/index"
                        options={{
                            headerShown: false,
                            headerTitle: "Add product",
                            title: "",
                            tabBarIcon: ({color}) => (
                                <AntDesign name="pluscircleo" size={30} color={color} style={{marginTop: 3}} />
                            ),
                        }}
                    />
                ) : (
                    <Tabs.Screen
                        name="product/index"
                        options={{
                            headerShown: false,
                            headerTitle: "Profile",
                            title: "",
                            href: null,
                        }}
                    />
                )
            }

            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    headerTitle: "Profile",
                    title: "",
                    tabBarIcon: ({color}) =>
                        image ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 3,
                                }}
                            >
                                <Image
                                    source={{uri: image}}
                                    style={{width: 36, height: 36, borderRadius: 20}}
                                />
                            </View>
                        ) : (
                            <FontAwesome size={30} name="user" color={color} style={{marginTop: 3}}/> // Placeholder icon
                        ),
                }}
            />

            <Tabs.Screen
                name="product/[id]"
                options={{
                    headerShown: false,
                    headerTitle: "Profile",
                    title: "",
                    href: null,
                    tabBarIcon: ({color}) => (
                        <Ionicons name="person-circle" size={30} color={color} style={{marginTop: 3}}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="product/editProduct/[id]"
                options={{
                    headerShown: false,
                    headerTitle: "Profile",
                    title: "",
                    href: null,
                    tabBarIcon: ({color}) => (
                        <Ionicons name="person-circle" size={30} color={color} style={{marginTop: 3}}/>
                    ),
                }}
            />

            <Tabs.Screen name='search' options={{
                headerShown: false,
                headerTitle: 'search',
                title: "",
                href: null,
                tabBarIcon: ({color}) => <FontAwesome name="search" size={30} color={color} style={{marginTop: 3}}/>
            }}/>
        </Tabs>
    );
}
