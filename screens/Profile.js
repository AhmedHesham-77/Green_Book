import React, {useState, useRef, useMemo, useCallback} from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    Alert,
    TouchableOpacity,
} from "react-native";
import {
    MaterialIcons,
    Fontisto,
    Feather,
    FontAwesome5,
    FontAwesome,
} from "@expo/vector-icons";
import {logout} from "../firebase/auth";
import {router, useFocusEffect} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {updateUser, updateUserImage} from "../firebase/users";
import Loading from "../components/Loading";
import {getUser} from "../firebase/users";
import * as ImagePicker from "expo-image-picker";
import {uploadImage} from "../firebase/config";
import  {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Button from "../components/Button";

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState("https://www9.0zz0.com/2024/05/10/19/728774942.png");
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState("");
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ["40%", "50%"], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index) => {
        console.log("handleSheetChanges", index);
    }, []);

    const handleCloseSheet = bottomSheetModalRef.current?.close;

    const updateImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const filename = uri.split("/").pop();
            const folderName = "Profiles";
            const uploadResponse = await uploadImage(folderName, uri, filename);
            await updateUserImage(id, uploadResponse.downloadUrl);
            setImage(uploadResponse.downloadUrl);
        }
    };


    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const user = await AsyncStorage.getItem("user");
                    const userId = JSON.parse(user).uid;
                    const userData = await getUser(userId);
                    setUserData(userData);
                    setId(userId);
                    setName(userData.name);
                    setDate(userData.birthOfDate);
                    setPhone(userData.phone);
                    setImage(userData.profile_image);
                    setBalance(userData.balance);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }, [])
    );

    const handleLogout = async () => {
        try {
            await logout();
            router.navigate("/account/login");
        }catch (error){
            console.log(error);
        }
    };

    const handleUpdate = async () => {
        const isValidName = /^[a-zA-Z\s]*$/.test(name);
        if (!name) return setError("please enter name");
        else if (!isValidName) {
            return setError("name can only contain letters ");
        } else if (!phone) return setError("please enter phone number");
        else if (isNaN(phone)) return setError("phone must be number");

        setError("");

        try {
            const user = {name: name, phone: phone};
            await updateUser(userData.id, user);
            Alert.alert(
                "Success",
                "Profile successfully updated",
                [
                    {text: "OK", onPress: handleCloseSheet}
                ],
                {cancelable: false}
            );
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    if (!userData) {
        return <Loading/>;
    } else {
        return (
            <GestureHandlerRootView style={styles.container}>
                <Pressable onPress={handleLogout} style={styles.logoutButton}>
                    <MaterialIcons name="logout" size={35} style={styles.icon}/>
                </Pressable>
                <View style={styles.imageContainer}>
                    <Image source={{uri: image}} style={styles.image}/>
                    <TouchableOpacity onPress={updateImage} style={styles.editButton}>
                        <FontAwesome name="edit" size={27} color="black"/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}> {name} </Text>
                <View style={styles.input}>
                    <Fontisto name="email" size={30} color="green"/>
                    <TextInput
                        value={userData.email}
                        editable={false}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.input}>
                    <Feather name="phone-call" size={30} color="green"/>
                    <TextInput style={styles.textInput} value={phone} editable={false}/>
                </View>

                <View style={styles.input}>
                    <Fontisto name="date" size={30} color="green"/>
                    <TextInput style={styles.textInput} value={date} editable={false}/>
                </View>

                <View style={styles.balanceContainer}>
                    <FontAwesome5 name="coins" size={30} color="orange"/>
                    <TextInput
                        style={styles.textInputBalance}
                        value={balance.toString()}
                        editable={false}
                    />
                </View>

                <BottomSheetModalProvider>
                    <Button
                        onPress={handlePresentModalPress}
                        title="Edit Profile"
                        textColor= 'white'
                        styles={{ backgroundColor: 'green' , padding: 15 , marginTop: 20 , borderRadius: 15 }}
                    />
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        enablePanDownToClose={true}
                        backgroundStyle={{backgroundColor: "rgba(210,225,210,0.99)"}}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            <Text style={styles.contentContainerText}>Edit profile</Text>
                        </BottomSheetView>
                        <BottomSheetView style={styles.input}>
                            <FontAwesome
                                size={36}
                                style={{marginRight: 10}}
                                name="user"
                                color={"green"}
                            />
                            <BottomSheetTextInput
                                placeholder="Enter new name"
                                onChangeText={setName}
                            />
                        </BottomSheetView>
                        <BottomSheetView style={styles.input}>
                            <Feather
                                name="phone-call"
                                size={30}
                                style={{marginRight: 10}}
                                color="green"
                            />
                        <BottomSheetTextInput
                            placeholder="Enter new phone number"
                            onChangeText={setPhone}
                        />
                        </BottomSheetView>
                        <Pressable style = {{ justifyContent: 'center' , alignItems: 'center' , backgroundColor: 'green' , padding: 15 , marginTop: 10 , borderRadius: 15 , width: '40%' , marginLeft: '30%' }} onPress={handleUpdate}>
                            <Text style={{ color: 'white' }}> Update </Text>
                        </Pressable>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: "center",
        paddingTop: 40
    },
    logoutButton: {
        margin: 5,
        width: "100%",
        height: 50,
        alignItems: "flex-end",
        borderRadius: 25,
    },
    icon: {
        color: "green",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "1.5%",
        marginRight: "3%",
    },
    name: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        flexDirection: "row",
        borderRadius: 20,
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: "80%",
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
    },
    buttonText: {
        color: "black",
        fontSize: 16,
        alignSelf: "center",
    },
    error: {
        color: "red",
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    textInput: {
        color: "#000000",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18,
        marginLeft: 10,
        flex: 1,
    },
    image: {
        borderRadius: 75,
        width: 150,
        height: 150,
        borderColor: "#ccc",
        borderWidth: 5,
    },
    contentContainer: {
        alignItems: "center",
    },
    contentContainerText: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10,
    }, textInputBalance: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        color: "#000000",
        textAlign: "center",
    },
    balanceContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "55%",
        borderRadius: 20,
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    }, imageContainer: {
        position: 'relative',
        marginTop: 40,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 5,
        borderRadius: 50,
        marginRight: 10,
        marginBottom: 10,
    }


});
