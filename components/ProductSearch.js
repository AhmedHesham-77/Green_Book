import { Pressable, StyleSheet, View, Image, Text } from "react-native";
import {router} from "expo-router";

export default function ProductSearch({id,ImageUrl,productName}) {
    return (
        <View>
            <Pressable style={[styles.container]} onPress={()=>router.push(`product/${id}`)}>
                <Image style={styles.image} source={{uri: ImageUrl}}/>
                <Text style={[styles.title]}>{productName}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 'black',
        width:'100%',
        flexDirection:'row',
        borderBottomColor:'black',
        borderBottomWidth: 1,
        margin:5
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: "stretch",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        fontSize: 18,
        marginTop: 5,
        // paddingHorizontal: 5,
        width:'100%',
        color: "#333",
        textAlign: "left",
    },
})