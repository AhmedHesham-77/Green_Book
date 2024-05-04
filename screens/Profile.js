import {View, Text, StyleSheet, Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { logout } from '../firebase/auth';
import { router } from 'expo-router';
export default function Profile() {


    const handleLogout = async () => {
        await logout();
        router.navigate('/account/login');
    };

    return (
        <View style={styles.container}>
            <Pressable onPress = {handleLogout} style = {{ backgroundColor: 'white' , padding: 10 , borderRadius: 8 }}>
                <AntDesign name = 'logout' size = {24} color = '#5E8B7E' />
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
        justifyContent: "center",

    }

})