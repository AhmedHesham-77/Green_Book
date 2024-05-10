import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import OptionsList from './OptionsList';
import { useEffect , useState} from 'react';
import { StyleSheet , Text , Pressable , Image , View , Platform} from 'react-native';
import { router } from 'expo-router';
import { addToCart , editFromCart , getFromCart } from '../firebase/cart';
import { getUser } from '../firebase/users';
import { Ionicons } from '@expo/vector-icons';
import { ALERT_TYPE , Dialog , AlertNotificationRoot } from 'react-native-alert-notification';

const ProductCard = ({ product , onDelete }) => {

    const [uid , setUid] = useState('');
    const [role , setRole] = useState(true);

    const handleAddToCart = async () => {
        const item = await getFromCart(uid , product.id);
        if (item) {
            item.counter++;
            await editFromCart(uid , item);
            return;
        }
        await addToCart(uid , product);
    }

    useEffect(() => {
        const getUid = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                const userUid = JSON.parse(user).uid;
                const userData = await getUser(userUid);
                setRole(userData.isAdmin);
                setUid(userUid);
            } catch (error) {
                console.log(error);
            }
        };
        getUid();
    }, []);

    return (
        <Pressable onPress = {() => router.navigate(`product/${product.id}`)} style = {styles.parent} >
			<AlertNotificationRoot>
				<View style = {styles.rate}>
					<Text style = {{ color: 'black' , fontSize: 16 }}>
						{product.NumberReviews ? Math.ceil((product.TotalReviews / product.NumberReviews) * 10) / 10 : 0}
					</Text>
					<Ionicons name = 'star' size = {20} color = '#FFD700' />
				</View>
				{(role === true ? <OptionsList onDelete = {onDelete} product = {product} /> : null)}
				<View style = {{ width: 150 , alignItems: 'center' }}>
					<Image source = {{ uri: product.ImageUrl }} style = {styles.image}/>
				</View>
				<Text style = {styles.title}>
					{product.productName.length > 30 ? product.productName.substring(0 , 30) : product.productName}
					<Text style = {{ color: 'limegreen' }}>
						{product.productName.length > 30 ? ' ... ' : ''}
					</Text>
				</Text>
				<View style = {{ width: '100%' , flexDirection: 'row' , justifyContent: 'space-around' , marginTop: 7.5 }}>
					<Pressable onPress = {() => {
						handleAddToCart();
						Dialog.show({
							type: ALERT_TYPE.SUCCESS,
							title: 'GREAT!',
							textBody: 'This product is added to your cart.',
							button: 'OK',
						});
					}}>
						<Feather name = 'shopping-cart' size = {29} color = 'black' />
					</Pressable>
					<View style = {{ flexDirection: 'row' , justifyContent: 'center' , alignItems: 'center' , width: '40%' }}>
						<Ionicons name = 'logo-usd' size = {20} color = 'green' style = {{ marginRight: -5 }} />
						<Text style = {{ fontSize: 18 , fontWeight: 'bold' , color: 'green' }}> {product.price} </Text>
					</View>
				</View>
			</AlertNotificationRoot>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    parent: {
        width: 150,
        margin: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: "#000",
        shadowRadius: 3,
        shadowOpacity: 0.2,
        elevation: 5,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 15,
    },
    image: {
        width: 150,
        height: 175,
        resizeMode: 'cover',
        borderRadius: 15,
    },
    rate: {
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
    title: {
        width: 150,
		fontSize: 15,
		marginTop: 5,
		fontWeight: 'bold',
        paddingHorizontal: 5,
        color: "#333",
        textAlign: "left",
    },
});

export default ProductCard;
