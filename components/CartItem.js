import { Pressable , StyleSheet , View , Text , Image } from 'react-native';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { ALERT_TYPE , Dialog , AlertNotificationRoot } from 'react-native-alert-notification';
import { Ionicons } from '@expo/vector-icons';

export default function CartItem ({ product , onDelete }) {
	return (
		<Pressable onPress = {() => router.navigate(`product/${product.id}`)} style = {styles.parent} >
			<AlertNotificationRoot>
				<View style = {styles.price}>
					<Ionicons name = 'logo-usd' size = {20} color = 'green' />
					<Text style = {{ color: 'black' , fontSize: 16 }}> {product.price} </Text>
				</View>
				<Image source = {{ uri: product.ImageUrl }} style = {styles.image} />
				<Text style = {styles.title}>
					{product.productName.length > 30 ? product.productName.substring(0 , 30) : product.productName}
					<Text style = {{ color: 'limegreen' }}>
						{product.productName.length > 30 ? ' ... ' : ''}
					</Text>
				</Text>
				<View style = {{ flexDirection: 'row' , justifyContent: 'space-between' , alignItems: 'center' , marginTop: 10 , width: '100%' }}>
					<View style = {{ flexDirection: 'row' , justifyContent: 'center' , marginLeft: 10 }}>
						<Text style = {{ fontSize: 25 , fontWeight: 'bold' , color: 'black' , marginRight: -5 }}> {product.counter} </Text>
						<MaterialIcons name = 'numbers' size = {30} color = 'green' style = {{ marginTop: 2 }} />
					</View>
						<AntDesign name = 'delete' size = {30} color = 'red' style = {{ marginRight: 25 }} onPress = {() => {
							onDelete();
							Dialog.show({
								type: ALERT_TYPE.SUCCESS,
								title: 'GREAT!',
								textBody: 'This product is deleted from your cart.',
								button: 'OK',
							});
						}} />
				</View>
			</AlertNotificationRoot>
		</Pressable>
	);
}

const styles = StyleSheet.create({
    parent: {
        width: 200,
        margin: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowRadius: 3,
        shadowOpacity: 0.2,
        elevation: 5,
        borderWidth: 0.5,
        borderColor: 'limegreen',
        borderRadius: 15,
    },
    image: {
        width: 200,
        height: 175,
        resizeMode: 'cover',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15
    },
    title: {
        width: '100%',
		fontSize: 15,
		marginTop: 5,
		fontWeight: 'bold',
        paddingHorizontal: 5,
        color: "#333",
        textAlign: "left",
    },
    price: {
        position: 'absolute',
        right: 4,
        top: 7.5,
        zIndex: 2,
        backgroundColor: '#f1f1f1',
        width: '38%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 12.5
    },
});